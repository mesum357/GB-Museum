import React, { useRef, useState, Suspense, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { useMuseum } from '@/contexts/MuseumContext';

// ============================================================================
// CUPBOARD DISPLAY
// ============================================================================

interface CupboardProps {
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
    <mesh position={[0, 0.8, 0]}>
      <boxGeometry args={[0.8, 1.6, 0.6]} />
      <meshStandardMaterial color="#8b6f47" wireframe />
    </mesh>
  );
}

// OBJ Model Loader for Cupboard
function CupboardModel() {
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);
  
  // Load materials first, then OBJ
  const materials = useLoader(MTLLoader, '/models/cupboard/model.mtl');
  const obj = useLoader(OBJLoader, '/models/cupboard/model.obj', (loader) => {
    materials.preload();
    (loader as any).setMaterials(materials);
  });
  
  const baseColorTexture = useMemo(() => {
    try {
      const tex = textureLoader.load('/models/cupboard/RGB_6dc76d2ae6ba4d8194c59ae3540e87e6_OldCupboard_BaseColor.png');
      tex.flipY = false;
      return tex;
    } catch {
      return null;
    }
  }, [textureLoader]);
  
  const normalTexture = useMemo(() => {
    try {
      const tex = textureLoader.load('/models/cupboard/N_45b22847a8434807a720656b8ca75c37_OldCupboard_Normal.png');
      tex.flipY = false;
      return tex;
    } catch {
      return null;
    }
  }, [textureLoader]);

  const roughnessTexture = useMemo(() => {
    try {
      const tex = textureLoader.load('/models/cupboard/R_25b2432d269d41dfbfe0278e0674c289_OldCupboard_Roughness.png');
      tex.flipY = false;
      return tex;
    } catch {
      return null;
    }
  }, [textureLoader]);

  const aoTexture = useMemo(() => {
    try {
      const tex = textureLoader.load('/models/cupboard/R_aca1837208db41db870322f68c08dec7_OldCupboard_AO.png');
      tex.flipY = false;
      return tex;
    } catch {
      return null;
    }
  }, [textureLoader]);

  const metallicTexture = useMemo(() => {
    try {
      const tex = textureLoader.load('/models/cupboard/A_79de5dabe8f641ecae477b62f86396a8_OldCupboard_Metallic.png');
      tex.flipY = false;
      return tex;
    } catch {
      return null;
    }
  }, [textureLoader]);

  // Glass textures
  const glassBaseColorTexture = useMemo(() => {
    try {
      const tex = textureLoader.load('/models/cupboard/RGB_7de50154faba4881bc2c768208812088_OldCupboard_Glass_BaseColor.png');
      tex.flipY = false;
      return tex;
    } catch {
      return null;
    }
  }, [textureLoader]);

  const glassNormalTexture = useMemo(() => {
    try {
      const tex = textureLoader.load('/models/cupboard/N_fbb3b41ba3384abaa78d45551706e6cf_OldCupboard_Glass_Normal.png');
      tex.flipY = false;
      return tex;
    } catch {
      return null;
    }
  }, [textureLoader]);

  const glassRoughnessTexture = useMemo(() => {
    try {
      const tex = textureLoader.load('/models/cupboard/R_1783c61db9b24d7cb02174f92b17bc4f_OldCupboard_Glass_Roughness.png');
      tex.flipY = false;
      return tex;
    } catch {
      return null;
    }
  }, [textureLoader]);

  const glassMetallicTexture = useMemo(() => {
    try {
      const tex = textureLoader.load('/models/cupboard/A_8c83903bc0e74fa2a1f0f3daaea374b2_OldCupboard_Glass_Metallic.png');
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
    
    // Scale to appropriate size for cupboard
    const maxDimension = Math.max(size.x, size.y, size.z);
    const targetSize = 1.8; // Target height in meters
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
        
        // Enhance existing materials with textures
        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhongMaterial) {
              // Check if this is a glass material by name
              const isGlass = mat.name && mat.name.toLowerCase().includes('glass');
              
              if (isGlass) {
                // Glass material - apply glass textures
                if (glassBaseColorTexture) mat.map = glassBaseColorTexture;
                if (glassNormalTexture) mat.normalMap = glassNormalTexture;
                if (glassRoughnessTexture && mat instanceof THREE.MeshStandardMaterial) {
                  mat.roughnessMap = glassRoughnessTexture;
                }
                if (glassMetallicTexture && mat instanceof THREE.MeshStandardMaterial) {
                  mat.metalnessMap = glassMetallicTexture;
                }
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.roughness = 0.1;
                  mat.metalness = 0.0;
                  mat.transparent = true;
                  mat.opacity = 0.8;
                }
              } else {
                // Wood material - apply wood textures
                if (baseColorTexture) mat.map = baseColorTexture;
                if (normalTexture) mat.normalMap = normalTexture;
                if (roughnessTexture && mat instanceof THREE.MeshStandardMaterial) {
                  mat.roughnessMap = roughnessTexture;
                }
                if (aoTexture && mat instanceof THREE.MeshStandardMaterial) {
                  mat.aoMap = aoTexture;
                }
                if (metallicTexture && mat instanceof THREE.MeshStandardMaterial) {
                  mat.metalnessMap = metallicTexture;
                }
                if (mat instanceof THREE.MeshStandardMaterial) {
                  mat.roughness = 0.7;
                  mat.metalness = 0.1;
                }
              }
              mat.needsUpdate = true;
            }
          });
        }
      }
    });
    return cloned;
  }, [obj, baseColorTexture, normalTexture, roughnessTexture, aoTexture, metallicTexture, glassBaseColorTexture, glassNormalTexture, glassRoughnessTexture, glassMetallicTexture]);
  
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
    console.error('Cupboard Model Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <>{this.props.fallback}</>;
    }
    return <>{this.props.children}</>;
  }
}

export function Cupboard({ id, position, rotation, data, onInteract }: CupboardProps) {
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
      {/* Cupboard Model */}
      <ErrorBoundary fallback={placeholder}>
        <Suspense fallback={placeholder}>
          <CupboardModel />
        </Suspense>
      </ErrorBoundary>

      {/* Label plaque */}
      <mesh position={[0, 1.9, 0.4]}>
        <boxGeometry args={[0.8, 0.1, 0.02]} />
        <meshStandardMaterial color="#2a1f1a" />
      </mesh>
      <Text
        position={[0, 1.9, 0.41]}
        fontSize={0.05}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {data.title}
      </Text>

      {/* Lighting */}
      <pointLight
        position={[0, 2.0, 0.3]}
        intensity={1.0}
        color="#ffffff"
        distance={2.5}
        decay={2}
      />
      
      {hovered && (
        <pointLight
          position={[0, 1.8, 0]}
          intensity={1.2}
          color="#fff8e1"
          distance={2.5}
          decay={2}
        />
      )}
    </group>
  );
}

