import React, { useRef, useState, Suspense, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, useGLTF } from '@react-three/drei';
import { useMuseum } from '@/contexts/MuseumContext';

// ============================================================================
// BOOKSHELF DISPLAY
// ============================================================================

interface BookshelfProps {
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

// Placeholder component
function ModelPlaceholder() {
  return (
    <mesh position={[0, 1.0, 0]}>
      <boxGeometry args={[1.0, 2.0, 0.4]} />
      <meshStandardMaterial color="#8b6f47" wireframe />
    </mesh>
  );
}

// GLTF Model Loader for Bookshelf
function BookshelfModel() {
  const { scene } = useGLTF('/models/bookshelf/model.gltf');
  
  const model = useMemo(() => {
    const cloned = scene.clone();
    
    // Calculate bounding box to center and scale properly
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    // Scale to appropriate size for bookshelf
    const maxDimension = Math.max(size.x, size.y, size.z);
    const targetSize = 2.0; // Target height in meters
    const scale = targetSize / maxDimension;
    cloned.scale.set(scale, scale, scale);
    
    // Recalculate after scaling
    const boxScaled = new THREE.Box3().setFromObject(cloned);
    cloned.position.x = -boxScaled.getCenter(new THREE.Vector3()).x;
    cloned.position.y = -boxScaled.min.y; // Bottom at y=0
    cloned.position.z = -boxScaled.getCenter(new THREE.Vector3()).z;
    
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.roughness = 0.7;
              mat.metalness = 0.0;
              mat.needsUpdate = true;
            }
          });
        }
      }
    });
    return cloned;
  }, [scene]);
  
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
    console.error('Bookshelf Model Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <>{this.props.fallback}</>;
    }
    return <>{this.props.children}</>;
  }
}

export function Bookshelf({ id, position, rotation, data, onInteract }: BookshelfProps) {
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
        groupRef.current.scale.setScalar(hovered ? 1.01 : 1);
      }
      lastUpdate.current = 0;
    }
  });

  const placeholder = <ModelPlaceholder />;

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Bookshelf Model */}
      <ErrorBoundary fallback={placeholder}>
        <Suspense fallback={placeholder}>
          <BookshelfModel />
        </Suspense>
      </ErrorBoundary>

      {/* Label plaque */}
      <mesh position={[0, 2.2, 0.25]}>
        <boxGeometry args={[0.9, 0.1, 0.02]} />
        <meshStandardMaterial color="#2a1f1a" />
      </mesh>
      <Text
        position={[0, 2.2, 0.26]}
        fontSize={0.05}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {data.title}
      </Text>

      {/* Lighting */}
      <pointLight
        position={[0, 2.3, 0.2]}
        intensity={1.0}
        color="#ffffff"
        distance={2.5}
        decay={2}
      />
      
      {hovered && (
        <pointLight
          position={[0, 2.1, 0]}
          intensity={1.2}
          color="#fff8e1"
          distance={2.5}
          decay={2}
        />
      )}
    </group>
  );
}


