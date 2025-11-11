import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows, PerspectiveCamera, OrbitControls, useGLTF } from '@react-three/drei';
// Post-processing temporarily disabled due to compatibility issues with @react-three/postprocessing v3.0.4
// import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { MuseumRoom } from './MuseumRoom';
import { PlayerController } from './PlayerController';
import { Exhibits } from './Exhibits';
import { Lighting } from './Lighting';
import { UIOverlay } from './UIOverlay';
import { ClickToStart } from './ClickToStart';
import { MuseumProvider, useMuseum } from '@/contexts/MuseumContext';
import { Cursor } from './Cursor';
import { MobileJoystick } from './MobileJoystick';

// Preload all models for instant loading
function ModelPreloader() {
  useEffect(() => {
    // Preload all GLTF models
    useGLTF.preload('/models/markhor/model.gltf');
    useGLTF.preload('/models/leopard/model.gltf');
    useGLTF.preload('/models/goathead/model.gltf');
    useGLTF.preload('/models/bookshelf/model.gltf');
    useGLTF.preload('/models/cupboard/model.gltf');
    useGLTF.preload('/models/gems/model.gltf');
    useGLTF.preload('/models/attire1/model.gltf');
    useGLTF.preload('/models/attire2/model.gltf');
  }, []);
  return null;
}

interface ExhibitData {
  title: string;
  description: string;
  year?: number;
  artist?: string;
  material?: string;
}

interface MuseumSceneProps {
  onExit?: () => void;
}

// Camera preset component
function CameraPresets({ controlsRef }: { controlsRef: React.RefObject<any> }) {
  const { camera } = useThree();

  const setCameraPreset = (preset: 'entrance' | 'pedestal' | 'overhead') => {
    switch (preset) {
      case 'entrance':
        // Wide angle showing corridor → marks entrance path
        camera.position.set(0, 1.6, 6);
        camera.lookAt(0, 1.6, 0);
        break;
      case 'pedestal':
        // Close-up: camera slides to 1.2m from statue focusing on horn detail
        camera.position.set(0, 1.2, 1.2);
        camera.lookAt(0, 0.5, 0);
        break;
      case 'overhead':
        // 60° downward view to reveal LED layout
        camera.position.set(0, 5, 0);
        camera.lookAt(0, 0, 0);
        break;
    }
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  };

  // Expose preset function to window for keyboard shortcuts
  (window as any).setCameraPreset = setCameraPreset;

  return null;
}

// Post-processing component wrapper - disabled due to compatibility issues
// The LED lights will still work and emit light, just without the bloom post-processing effect
// function PostProcessing() {
//   const { size, gl } = useThree();
//   const [ready, setReady] = useState(false);
//   
//   // Wait for renderer to be fully initialized
//   useFrame(() => {
//     if (gl && size.width > 0 && size.height > 0 && !ready) {
//       setReady(true);
//     }
//   });
//   
//   // Only render if we have valid size and renderer is ready
//   if (!ready || !size.width || !size.height) {
//     return null;
//   }
//   
//   return (
//     <EffectComposer>
//       <Bloom
//         intensity={1.2}
//         threshold={0.6}
//         smoothing={0.9}
//         radius={0.8}
//       />
//     </EffectComposer>
//   );
// }

// WebGL Context Loss Handler
function WebGLContextHandler() {
  const { gl } = useThree();

  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost. Attempting to restore...');
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored.');
      // Force a re-render
      gl.forceContextRestore();
    };

    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [gl]);

  return null;
}

export function MuseumScene({ onExit }: MuseumSceneProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const controlsRef = useRef<any>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleExhibitInteract = (id: string, data: ExhibitData) => {
    // No modal functionality - exhibits are non-interactive
  };

  const handleFullscreen = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  // Update exhibit components to pass onInteract
  const ExhibitsWithInteraction = () => {
    return <Exhibits onInteract={handleExhibitInteract} />;
  };

  // Mobile-optimized settings
  const isMobileDevice = isMobile;
  const dpr = isMobileDevice ? [1, 1.5] : [1, Math.min(window.devicePixelRatio || 1, 2)];
  const shadowsEnabled = !isMobileDevice; // Disable shadows on mobile for performance
  const antialias = !isMobileDevice; // Disable antialiasing on mobile

  return (
    <MuseumProvider>
      <div className="fixed inset-0 w-full h-full bg-black" style={{ cursor: isStarted ? 'none' : 'default' }}>
        <Canvas
          shadows={shadowsEnabled}
          gl={{ 
            antialias, 
            toneMappingExposure: 1.2,
            powerPreference: isMobileDevice ? 'default' : 'high-performance',
            logarithmicDepthBuffer: !isMobileDevice,
            stencil: false,
            depth: true,
            preserveDrawingBuffer: false, // Better performance
            failIfMajorPerformanceCaveat: false, // Allow fallback on low-end devices
          }}
          dpr={dpr}
          camera={{ position: [0, 1.6, 4.5], fov: isMobileDevice ? 60 : 50 }}
          performance={{ min: isMobileDevice ? 0.3 : 0.5 }}
          frameloop="always"
          onCreated={({ gl }) => {
            // Handle WebGL context loss
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
              console.warn('WebGL context lost');
            });
            gl.domElement.addEventListener('webglcontextrestored', () => {
              console.log('WebGL context restored');
            });
          }}
        >
          <WebGLContextHandler />
          <ModelPreloader />
          <PerspectiveCamera 
            makeDefault 
            position={[0, 1.6, 4.5]} 
            fov={isMobileDevice ? 60 : 50}
          />
          
          {/* Orbit Controls for camera presets */}
          {!isStarted && (
            <OrbitControls
              ref={controlsRef}
              minDistance={1.2}
              maxDistance={8}
              maxPolarAngle={1.4}
              enableDamping
              dampingFactor={0.05}
            />
          )}
          
          {/* Camera Presets */}
          {!isStarted && <CameraPresets controlsRef={controlsRef} />}
          
          {/* Lighting */}
          <Lighting />
          
          {/* Museum Room */}
          <Suspense fallback={null}>
            <MuseumRoom />
          </Suspense>
          
          {/* Contact Shadows - Disabled on mobile for performance */}
          {!isMobileDevice && (
            <ContactShadows 
              position={[0, 0.01, 0]} 
              opacity={0.3} 
              scale={30} 
              blur={1.5} 
              far={10} 
            />
          )}
          
          {/* Exhibits */}
          <Suspense fallback={null}>
            <ExhibitsWithInteraction />
          </Suspense>
          
          {/* Player Controller */}
          {isStarted && <PlayerController />}
          
          {/* Post-processing - Bloom for LED lights - disabled due to compatibility issues */}
          {/* LED lights will still work and emit light, just without bloom effect */}
          {/* <Suspense fallback={null}>
            <PostProcessing />
          </Suspense> */}
        </Canvas>
      
      {/* Click to Start */}
      {!isStarted && <ClickToStart onStart={handleStart} />}
      
      {/* Cursor - shown when 3D experience is started (desktop only) */}
      {isStarted && !isMobile && <Cursor isActive={true} />}
      
      {/* Mobile Joystick - shown when started on mobile */}
      {isStarted && isMobile && <MobileJoystick isActive={true} />}
      
      {/* UI Overlay */}
      <UIOverlay
        selectedExhibit={null}
        onCloseExhibit={() => {}}
        onExit={onExit || (() => {})}
        onFullscreen={handleFullscreen}
        isFullscreen={isFullscreen}
      />
      </div>
    </MuseumProvider>
  );
}

