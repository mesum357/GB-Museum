import React, { useRef, useState, Suspense, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, useGLTF } from '@react-three/drei';
import { useMuseum } from '@/contexts/MuseumContext';

// Create brownish texture for goat head
function createBrownishTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  // Base brownish gradient
  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, '#A67C52'); // Center - lighter brown
  gradient.addColorStop(0.5, '#8B6F47'); // Mid - medium brown
  gradient.addColorStop(1, '#6B5238'); // Edge - darker brown
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);
  
  // Add texture noise for realistic appearance
  const imageData = ctx.getImageData(0, 0, 512, 512);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 0.15;
    data[i] = Math.max(0, Math.min(255, data[i] + noise * 255)); // R
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise * 255)); // G
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 255)); // B
  }
  ctx.putImageData(imageData, 0, 0);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

interface GoatHeadProps {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  data: {
    title: string;
    description: string;
  };
  onInteract?: (id: string, data: any) => void;
}

// Placeholder component
function GoatHeadPlaceholder() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color="#8b6f47" wireframe />
    </mesh>
  );
}

// GLTF Model Loader for Goat Head
function GoatHeadModel() {
  const { scene } = useGLTF('/models/goathead/model.gltf');
  const brownishTexture = useMemo(() => createBrownishTexture(), []);
  
  const model = useMemo(() => {
    const cloned = scene.clone();
    
    // Adjust scale - goat head should be appropriately sized for wall mounting
    // Model appears large (coordinates ~-22 to +22), so scale down significantly
    // Made even smaller for better wall mounting
    cloned.scale.set(0.025, 0.025, 0.025);
    
    // Center the model (adjust if model origin is not centered)
    // This may need adjustment based on the actual model
    cloned.position.set(0, 0, 0);
    
    // Fix orientation: Face should be straight out of wall, horns up, mouth down
    // Rotate around X axis to make mouth face downward (from left to down)
    // Then rotate around Y axis to ensure face is straight out (not leftwards)
    // First rotate X to fix mouth direction, then adjust Y if needed
    cloned.rotation.set(-Math.PI / 6, Math.PI / 29, 0);
    
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              // Apply brownish color and texture
              mat.map = brownishTexture;
              mat.color.set('#8B6F47'); // Brownish color
              mat.roughness = 0.7;
              mat.metalness = 0.0;
              mat.needsUpdate = true;
            }
          });
        }
      }
    });
    return cloned;
  }, [scene, brownishTexture]);
  
  return <primitive object={model} />;
}

// Error Boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Goat Head Model Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <>{this.props.fallback}</>;
    }
    return <>{this.props.children}</>;
  }
}

export function GoatHead({ id, position, rotation, data, onInteract }: GoatHeadProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { isPointerLocked, isMobile } = useMuseum();

  const handleClick = () => {
    // Only allow interaction when pointer is locked (3D cursor active) or on mobile
    if (!isPointerLocked && !isMobile) {
      return;
    }
    if (onInteract) {
      onInteract(id, data);
    }
  };

  // Throttle animation updates for performance (30fps)
  const lastUpdate = useRef(0);
  useFrame((state, delta) => {
    lastUpdate.current += delta;
    if (lastUpdate.current >= 1 / 30) {
      if (groupRef.current) {
        groupRef.current.scale.setScalar(hovered ? 1.05 : 1);
      }
      lastUpdate.current = 0;
    }
  });

  const placeholder = <GoatHeadPlaceholder />;

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Mounting bracket/plaque */}
      <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.08, 0.03]} />
        <meshStandardMaterial
          color="#5c493e"cd
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Goat Head Model */}
      {/* Position forward from wall to prevent embedding */}
      <group position={[0, 0, 0.2]} rotation={[0, 0, 1.6]}>
        <ErrorBoundary fallback={placeholder}>
          <Suspense fallback={placeholder}>
            <GoatHeadModel />
          </Suspense>
        </ErrorBoundary>
      </group>

      {/* Spotlight for goat head */}
      <pointLight
        position={[0, 0.3, 0.2]}
        intensity={1.0}
        color="#ffffff"
        distance={2}
        decay={2}
      />
      
      {/* Enhanced light when hovered */}
      {hovered && (
        <pointLight
          position={[0, 0.2, 0]}
          intensity={1.2}
          color="#fff8e1"
          distance={2}
          decay={2}
        />
      )}
    </group>
  );
}

