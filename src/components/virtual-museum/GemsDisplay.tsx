import React, { useRef, useState, Suspense, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { useMuseum } from '@/contexts/MuseumContext';

// ============================================================================
// GEMS DISPLAY ON TABLE
// ============================================================================

interface GemsDisplayProps {
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
    <mesh position={[0, 0.2, 0]}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color="#ffffff" wireframe />
    </mesh>
  );
}

// OBJ Model Loader for Gems
function GemsModel() {
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);
  
  // Load materials first, then OBJ
  const materials = useLoader(MTLLoader, '/models/gems/model.mtl');
  const obj = useLoader(OBJLoader, '/models/gems/model.obj', (loader) => {
    materials.preload();
    (loader as any).setMaterials(materials);
  });
  
  const colorTexture = useMemo(() => {
    try {
      const tex = textureLoader.load('/models/gems/RGB_ebd221156e274f7ea4ed977fd10c3ba5_rock-smooth-1_COLOR.png');
      tex.flipY = false;
      return tex;
    } catch {
      return null;
    }
  }, [textureLoader]);
  
  const normalTexture = useMemo(() => {
    try {
      const tex = textureLoader.load('/models/gems/N_e0f046ac7d414b0db4853f3612ecf356_rock-smooth-1_NRM.png');
      tex.flipY = false;
      return tex;
    } catch {
      return null;
    }
  }, [textureLoader]);

  const roughnessTexture = useMemo(() => {
    try {
      const tex = textureLoader.load('/models/gems/R_d8279803688c4210a6e151a198278c50_rock-smooth-1_OCC.png');
      tex.flipY = false;
      return tex;
    } catch {
      return null;
    }
  }, [textureLoader]);

  const model = useMemo(() => {
    const cloned = obj.clone();
    
    // Calculate bounding box to center and scale properly
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    // Scale to appropriate size for display on table
    const maxDimension = Math.max(size.x, size.y, size.z);
    const targetSize = 0.3; // Target size in meters
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
        
        // Enhance materials with textures
        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhongMaterial) {
              // Don't apply color texture - use white color instead for original white appearance
              // if (colorTexture) mat.map = colorTexture;
              if (normalTexture) mat.normalMap = normalTexture;
              if (roughnessTexture && mat instanceof THREE.MeshStandardMaterial) {
                mat.roughnessMap = roughnessTexture;
              }
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.roughness = 0.3;
                mat.metalness = 0.1;
                // Set gem color to white (original color)
                mat.color.set('#ffffff');
              }
              mat.needsUpdate = true;
            }
          });
        }
      }
    });
    return cloned;
  }, [obj, colorTexture, normalTexture, roughnessTexture]);
  
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
    console.error('Gems Model Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <>{this.props.fallback}</>;
    }
    return <>{this.props.children}</>;
  }
}

export function GemsDisplay({ id, position, rotation, data, onInteract }: GemsDisplayProps) {
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

  const tableHeight = 0.75; // Table height
  const tableWidth = 1.5;
  const tableDepth = 1.0;
  const tableTopThickness = 0.05;

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
      {/* Table */}
      <group>
        {/* Table top */}
        <mesh position={[0, tableHeight, 0]} castShadow receiveShadow>
          <boxGeometry args={[tableWidth, tableTopThickness, tableDepth]} />
          <meshStandardMaterial
            color="#8b6f47"
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
        
        {/* Table legs */}
        {[
          [-tableWidth/2 + 0.1, tableHeight/2, -tableDepth/2 + 0.1],
          [tableWidth/2 - 0.1, tableHeight/2, -tableDepth/2 + 0.1],
          [-tableWidth/2 + 0.1, tableHeight/2, tableDepth/2 - 0.1],
          [tableWidth/2 - 0.1, tableHeight/2, tableDepth/2 - 0.1],
        ].map((pos, idx) => (
          <mesh key={idx} position={pos as [number, number, number]} castShadow receiveShadow>
            <boxGeometry args={[0.05, tableHeight, 0.05]} />
            <meshStandardMaterial
              color="#5c493e"
              roughness={0.6}
              metalness={0.1}
            />
          </mesh>
        ))}
      </group>

      {/* Gems Model on table */}
      <group position={[0, tableHeight + tableTopThickness, 0]}>
        <ErrorBoundary fallback={placeholder}>
          <Suspense fallback={placeholder}>
            <GemsModel />
          </Suspense>
        </ErrorBoundary>
      </group>

      {/* Label plaque */}
      <mesh position={[0, tableHeight + tableTopThickness + 0.15, tableDepth/2 + 0.05]}>
        <boxGeometry args={[tableWidth * 0.8, 0.1, 0.02]} />
        <meshStandardMaterial color="#2a1f1a" />
      </mesh>
      <Text
        position={[0, tableHeight + tableTopThickness + 0.15, tableDepth/2 + 0.06]}
        fontSize={0.05}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {data.title}
      </Text>

      {/* Lighting */}
      <pointLight
        position={[0, tableHeight + 0.5, 0]}
        intensity={1.0}
        color="#ffffff"
        distance={2}
        decay={2}
      />
      
      {hovered && (
        <pointLight
          position={[0, tableHeight + 0.3, 0]}
          intensity={1.2}
          color="#fff8e1"
          distance={2}
          decay={2}
        />
      )}
    </group>
  );
}

