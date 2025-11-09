import React, { useRef, useState, Suspense, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, useGLTF } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useMuseum } from '@/contexts/MuseumContext';

// ============================================================================
// MODEL FILE FORMAT CONFIGURATION
// ============================================================================
// Supported formats: .glb, .gltf, .obj, .fbx
// Set the format you want to use below

type ModelFormat = 'glb' | 'gltf' | 'obj' | 'fbx' | 'none';

const MODEL_FORMAT: ModelFormat = 'gltf'; // Using GLTF format from wildgoat folder
const MODEL_PATH = '/models/markhor/model'; // Base path (without extension)

// Enable model loading (set to true when model file is ready)
const ENABLE_MODEL_LOADING = MODEL_FORMAT !== 'none';

// ============================================================================

interface MarkhorStatueProps {
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
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial color="#8b6f47" wireframe />
    </mesh>
  );
}

// Create brownish texture for markhor statue
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

// GLB/GLTF Model Loader (Recommended)
function MarkhorModelGLB({ material }: { material: 'wood' | 'bronze' }) {
  const { scene } = useGLTF(`${MODEL_PATH}.${MODEL_FORMAT}`);
  const brownishTexture = useMemo(() => createBrownishTexture(), []);
  
  // The GLTF model already includes textures embedded, but we can optionally override
  // material properties for wood/bronze variants
  const model = useMemo(() => {
    const cloned = scene.clone();
    
    // Adjust scale if needed (model might be too large or small)
    // You can adjust these values based on how the model looks
    cloned.scale.set(1, 1, 1);
    
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              // Adjust material properties based on variant
              if (material === 'bronze') {
                // For bronze variant, adjust properties
                mat.roughness = 0.3;
                mat.metalness = 0.85;
                mat.color.set('#8B6914');
              } else {
                // For wood variant, apply brownish color and texture
                mat.map = brownishTexture;
                mat.roughness = 0.7;
                mat.metalness = 0.0;
                // Apply brownish color (warm brown)
                mat.color.set('#8B6F47');
              }
              mat.needsUpdate = true;
            }
          });
        }
      }
    });
    return cloned;
  }, [scene, material, brownishTexture]);
  
  return <primitive object={model} />;
}

// OBJ Model Loader
function MarkhorModelOBJ({ material }: { material: 'wood' | 'bronze' }) {
  const obj = useLoader(OBJLoader, `${MODEL_PATH}.obj`);
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);
  
  const colorTexture = useMemo(() => {
    try {
      const tex = textureLoader.load('/models/markhor/RGB_d81de30a7d1949de82a7d560a909c55d_T_Rove_Goat_Color.png');
      tex.flipY = false;
      return tex;
    } catch {
      return null;
    }
  }, [textureLoader]);
  
  const normalTexture = useMemo(() => {
    try {
      const tex = textureLoader.load('/models/markhor/N_8273b3dfdefd4f208bfdc8dfe85e8d50_T_Rove_Goat_Normal.png');
      tex.flipY = false;
      return tex;
    } catch {
      return null;
    }
  }, [textureLoader]);

  const model = useMemo(() => {
    const cloned = obj.clone();
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const meshMaterial = new THREE.MeshStandardMaterial({
          map: colorTexture,
          normalMap: normalTexture,
          roughness: material === 'bronze' ? 0.3 : 0.7,
          metalness: material === 'bronze' ? 0.85 : 0,
        });
        if (material === 'bronze') {
          meshMaterial.color.set('#8B6914');
        }
        child.material = meshMaterial;
      }
    });
    return cloned;
  }, [obj, colorTexture, normalTexture, material]);
  
  return <primitive object={model} />;
}

// FBX Model Loader
function MarkhorModelFBX({ material }: { material: 'wood' | 'bronze' }) {
  const fbx = useLoader(FBXLoader, `${MODEL_PATH}.fbx`);
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);
  
  const colorTexture = useMemo(() => {
    try {
      const tex = textureLoader.load('/models/markhor/RGB_d81de30a7d1949de82a7d560a909c55d_T_Rove_Goat_Color.png');
      tex.flipY = false;
      return tex;
    } catch {
      return null;
    }
  }, [textureLoader]);
  
  const normalTexture = useMemo(() => {
    try {
      const tex = textureLoader.load('/models/markhor/N_8273b3dfdefd4f208bfdc8dfe85e8d50_T_Rove_Goat_Normal.png');
      tex.flipY = false;
      return tex;
    } catch {
      return null;
    }
  }, [textureLoader]);

  const model = useMemo(() => {
    const cloned = fbx.clone();
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              if (colorTexture) mat.map = colorTexture;
              if (normalTexture) {
                mat.normalMap = normalTexture;
                mat.normalScale.set(1, 1);
              }
              mat.roughness = material === 'bronze' ? 0.3 : 0.7;
              mat.metalness = material === 'bronze' ? 0.85 : 0;
              if (material === 'bronze') {
                mat.color.set('#8B6914');
              }
              mat.needsUpdate = true;
            }
          });
        }
      }
    });
    return cloned;
  }, [fbx, colorTexture, normalTexture, material]);
  
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
    console.error('3D Model Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <>{this.props.fallback}</>;
    }
    return <>{this.props.children}</>;
  }
}

// Main model component - selects loader based on format
function MarkhorModel({ material }: { material: 'wood' | 'bronze' }) {
  if (!ENABLE_MODEL_LOADING) {
    return <ModelPlaceholder />;
  }

  const placeholder = <ModelPlaceholder />;

  // Select the appropriate loader based on format
  let ModelComponent: React.FC<{ material: 'wood' | 'bronze' }> | null = null;

  switch (MODEL_FORMAT) {
    case 'glb':
    case 'gltf':
      // GLTF/GLB formats use the same loader
      ModelComponent = MarkhorModelGLB;
      break;
    case 'obj':
      ModelComponent = MarkhorModelOBJ;
      break;
    case 'fbx':
      ModelComponent = MarkhorModelFBX;
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
        <ModelComponent material={material} />
      </Suspense>
    </ErrorBoundary>
  );
}

export function MarkhorStatue({ id, position, rotation, data, onInteract }: MarkhorStatueProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { markhorMaterial, isPointerLocked, isMobile } = useMuseum();

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
        <boxGeometry args={[0.9, plinthHeight, 0.9]} />
        <meshStandardMaterial
          color="#5c493e"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* 3D Model */}
      <group position={[0, plinthHeight, 0]}>
        <MarkhorModel material={markhorMaterial} />
      </group>

      {/* Label plaque */}
      <mesh position={[0, plinthHeight + 0.02, 0.5]}>
        <boxGeometry args={[0.7, 0.12, 0.02]} />
        <meshStandardMaterial color="#2a1f1a" />
      </mesh>
      <Text
        position={[0, plinthHeight + 0.02, 0.51]}
        fontSize={0.06}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {data.title}
      </Text>

      {/* Enhanced rim lighting for statues - always on */}
      <pointLight
        position={[0, plinthHeight + 1.2, 0.3]}
        intensity={1.2}
        color="#ffffff"
        distance={3}
        decay={2}
      />
      
      {/* Additional accent light from side */}
      <pointLight
        position={[0.5, plinthHeight + 0.8, 0]}
        intensity={0.8}
        color="#fff8e1"
        distance={2.5}
        decay={2}
      />
      
      {/* Enhanced rim light when hovered */}
      {hovered && (
        <pointLight
          position={[0, plinthHeight + 1, 0]}
          intensity={1.5}
          color="#ffffff"
          distance={3}
          decay={2}
        />
      )}
    </group>
  );
}

// ============================================================================
// INSTRUCTIONS:
// ============================================================================
// 1. Convert your model.g3d file to one of the supported formats:
//    - GLB (recommended): Best performance, single file
//    - GLTF: Text-based, may have separate textures
//    - OBJ: Simple format, requires .mtl file for materials
//    - FBX: Supports animations
//
// 2. Place the model file in: public/models/markhor/
//    Example: public/models/markhor/model.glb
//
// 3. Update MODEL_FORMAT above to match your file:
//    - 'glb' for model.glb
//    - 'gltf' for model.gltf
//    - 'obj' for model.obj (also needs model.mtl)
//    - 'fbx' for model.fbx
//
// 4. The component will automatically use the correct loader
//
// Conversion tools:
// - Online: https://rigmodels.com/convert3d
// - Blender: Free 3D software that supports all formats
// ============================================================================
