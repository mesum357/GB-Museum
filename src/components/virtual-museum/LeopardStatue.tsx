import React, { useRef, useState, Suspense, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, useGLTF } from '@react-three/drei';
import { useMuseum } from '@/contexts/MuseumContext';

// ============================================================================
// LEOPARD STATUE MODEL CONFIGURATION
// ============================================================================

type ModelFormat = 'glb' | 'gltf' | 'obj' | 'fbx' | 'none';

const MODEL_FORMAT: ModelFormat = 'gltf';
const MODEL_PATH = '/models/leopard/model';

const ENABLE_MODEL_LOADING = MODEL_FORMAT !== 'none';

// ============================================================================

interface LeopardStatueProps {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  data: {
    title: string;
    description: string;
    year?: number;
    material?: string;
  };
  onInteract?: (id: string, data: any) => void;
}

// Placeholder component for when model is not available
function ModelPlaceholder() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[0.8, 1.2, 1.5]} />
      <meshStandardMaterial color="#8b6f47" wireframe />
    </mesh>
  );
}

// Create brownish texture for leopard statue
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

// GLB/GLTF Model Loader
function LeopardModelGLB() {
  const { scene } = useGLTF(`${MODEL_PATH}.${MODEL_FORMAT}`);
  const brownishTexture = useMemo(() => createBrownishTexture(), []);
  
  const model = useMemo(() => {
    const cloned = scene.clone();
    
    // Calculate bounding box to center the model properly
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    // Adjust scale for leopard statue - make it appropriately sized
    // Model might be very large, so scale it down
    const maxDimension = Math.max(size.x, size.y, size.z);
    const targetSize = 1.5; // Target height in meters
    const scale = targetSize / maxDimension;
    cloned.scale.set(scale, scale, scale);
    
    // Recalculate bounding box after scaling
    const boxScaled = new THREE.Box3().setFromObject(cloned);
    const centerScaled = boxScaled.getCenter(new THREE.Vector3());
    const sizeScaled = boxScaled.getSize(new THREE.Vector3());
    
    // Center the model at origin and adjust Y so bottom is at y=0
    cloned.position.x = -centerScaled.x;
    cloned.position.y = -boxScaled.min.y; // Move model so bottom is at y=0
    cloned.position.z = -centerScaled.z;
    
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
              mat.roughness = 0.7;
              mat.metalness = 0.0;
              // Apply brownish color (warm brown)
              mat.color.set('#8B6F47');
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

// Error Boundary for 3D components
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
    console.error('Leopard Model Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <>{this.props.fallback}</>;
    }
    return <>{this.props.children}</>;
  }
}

// Main model component
function LeopardModel() {
  if (!ENABLE_MODEL_LOADING) {
    return <ModelPlaceholder />;
  }

  const placeholder = <ModelPlaceholder />;

  let ModelComponent: React.FC | null = null;

  switch (MODEL_FORMAT) {
    case 'glb':
    case 'gltf':
      ModelComponent = LeopardModelGLB;
      break;
    default:
      return placeholder;
  }

  if (!ModelComponent) {
    return placeholder;
  }

  return (
    <ErrorBoundary fallback={placeholder}>
      <Suspense fallback={placeholder}>
        <ModelComponent />
      </Suspense>
    </ErrorBoundary>
  );
}

export function LeopardStatue({ id, position, rotation, data, onInteract }: LeopardStatueProps) {
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
        groupRef.current.scale.setScalar(hovered ? 1.02 : 1);
      }
      lastUpdate.current = 0;
    }
  });

  const plinthHeight = 0.35;

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Plinth - Rugged base */}
      <mesh position={[0, plinthHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, plinthHeight, 1.8]} />
        <meshStandardMaterial
          color="#5c493e"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* 3D Model */}
      <group position={[0, plinthHeight, 0]}>
        <LeopardModel />
      </group>

      {/* Label plaque */}
      <mesh position={[0, plinthHeight + 0.02, 1.0]}>
        <boxGeometry args={[0.9, 0.12, 0.02]} />
        <meshStandardMaterial color="#2a1f1a" />
      </mesh>
      <Text
        position={[0, plinthHeight + 0.02, 1.01]}
        fontSize={0.06}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {data.title}
      </Text>

      {/* Enhanced rim lighting for statues - always on */}
      <pointLight
        position={[0, plinthHeight + 1.5, 0.4]}
        intensity={1.2}
        color="#ffffff"
        distance={3}
        decay={2}
      />
      
      {/* Additional accent light from side */}
      <pointLight
        position={[0.6, plinthHeight + 1.0, 0]}
        intensity={0.8}
        color="#fff8e1"
        distance={2.5}
        decay={2}
      />
      
      {/* Enhanced rim light when hovered */}
      {hovered && (
        <pointLight
          position={[0, plinthHeight + 1.2, 0]}
          intensity={1.5}
          color="#ffffff"
          distance={3}
          decay={2}
        />
      )}
    </group>
  );
}

