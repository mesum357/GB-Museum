import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface DressDisplayProps {
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

// Create cream/off-white fabric texture
function createFabricTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;
  
  // Base color - cream/off-white
  const gradient = ctx.createLinearGradient(0, 0, 0, 1024);
  gradient.addColorStop(0, '#f5f5dc'); // Beige
  gradient.addColorStop(0.5, '#fffef0'); // Off-white
  gradient.addColorStop(1, '#f5f5dc'); // Beige
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1024, 1024);
  
  // Add subtle fabric weave texture
  const imageData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % 1024;
    const y = Math.floor((i / 4) / 1024);
    const weave = Math.sin(x * 0.2) * Math.sin(y * 0.2) * 0.02;
    const noise = (Math.random() - 0.5) * 0.03;
    const variation = weave + noise;
    
    data[i] = Math.max(0, Math.min(255, data[i] + variation * 255));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + variation * 255));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + variation * 255));
  }
  ctx.putImageData(imageData, 0, 0);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Create floral embroidery texture
function createEmbroideryTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  // Transparent background
  ctx.clearRect(0, 0, 512, 512);
  
  // Draw floral embroidery patterns - pink/red flowers with green leaves
  // Flower 1
  const centerX1 = 150;
  const centerY1 = 200;
  // Petals
  ctx.fillStyle = '#ff6b9d'; // Pink
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const x = centerX1 + Math.cos(angle) * 30;
    const y = centerY1 + Math.sin(angle) * 30;
    ctx.beginPath();
    ctx.ellipse(x, y, 12, 20, angle, 0, Math.PI * 2);
    ctx.fill();
  }
  // Center
  ctx.fillStyle = '#ff1493'; // Deep pink
  ctx.beginPath();
  ctx.arc(centerX1, centerY1, 15, 0, Math.PI * 2);
  ctx.fill();
  // Leaves
  ctx.fillStyle = '#228b22'; // Green
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI * 2) / 4 + Math.PI / 4;
    const x = centerX1 + Math.cos(angle) * 40;
    const y = centerY1 + Math.sin(angle) * 40;
    ctx.beginPath();
    ctx.ellipse(x, y, 8, 15, angle, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Flower 2
  const centerX2 = 350;
  const centerY2 = 200;
  // Petals
  ctx.fillStyle = '#ff6b9d';
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const x = centerX2 + Math.cos(angle) * 30;
    const y = centerY2 + Math.sin(angle) * 30;
    ctx.beginPath();
    ctx.ellipse(x, y, 12, 20, angle, 0, Math.PI * 2);
    ctx.fill();
  }
  // Center
  ctx.fillStyle = '#ff1493';
  ctx.beginPath();
  ctx.arc(centerX2, centerY2, 15, 0, Math.PI * 2);
  ctx.fill();
  // Leaves
  ctx.fillStyle = '#228b22';
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI * 2) / 4 + Math.PI / 4;
    const x = centerX2 + Math.cos(angle) * 40;
    const y = centerY2 + Math.sin(angle) * 40;
    ctx.beginPath();
    ctx.ellipse(x, y, 8, 15, angle, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // White accents
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.6;
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI * 2) / 16;
    const x1 = centerX1 + Math.cos(angle) * 25;
    const y1 = centerY1 + Math.sin(angle) * 25;
    ctx.beginPath();
    ctx.arc(x1, y1, 3, 0, Math.PI * 2);
    ctx.fill();
    
    const x2 = centerX2 + Math.cos(angle) * 25;
    const y2 = centerY2 + Math.sin(angle) * 25;
    ctx.beginPath();
    ctx.arc(x2, y2, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function DressDisplay({ id, position, rotation, data, onInteract }: DressDisplayProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

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

  const fabricTexture = useMemo(() => createFabricTexture(), []);
  const embroideryTexture = useMemo(() => createEmbroideryTexture(), []);

  const pedestalHeight = 0.4;
  const mannequinHeight = 1.6;
  const robeLength = 1.2;
  const robeWidth = 0.5;

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Pedestal */}
      <mesh position={[0, pedestalHeight / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, pedestalHeight, 16]} />
        <meshStandardMaterial
          color="#5c493e"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Mannequin stand */}
      <group position={[0, pedestalHeight + mannequinHeight / 2, 0]}>
        {/* Stand base */}
        <mesh position={[0, -mannequinHeight / 2 + 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
          <meshStandardMaterial
            color="#8d6b5c"
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>

        {/* Traditional Cap with Markhor feather */}
        <group position={[0, mannequinHeight / 2 - 0.1, 0]}>
          {/* Cap base */}
          <mesh castShadow>
            <coneGeometry args={[0.12, 0.15, 8]} />
            <meshStandardMaterial
              color="#f5deb3" // Beige
              roughness={0.7}
              metalness={0}
            />
          </mesh>
          {/* Markhor feather */}
          <mesh position={[0.08, 0.05, 0]} rotation={[0, 0, -0.3]} castShadow>
            <boxGeometry args={[0.15, 0.01, 0.01]} />
            <meshStandardMaterial
              color="#8b7355" // Brown feather
              roughness={0.8}
              metalness={0}
            />
          </mesh>
        </group>

        {/* Robe body - long and loose-fitting */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[robeWidth, robeLength, 0.25]} />
          <meshStandardMaterial
            map={fabricTexture}
            roughness={0.8}
            metalness={0}
          />
        </mesh>

        {/* V-neck with wide lapels */}
        <group position={[0, robeLength / 2 - 0.15, 0.13]}>
          {/* Left lapel */}
          <mesh rotation={[0, 0, -0.3]} castShadow>
            <boxGeometry args={[0.15, 0.2, 0.02]} />
            <meshStandardMaterial
              map={fabricTexture}
              roughness={0.8}
              metalness={0}
            />
          </mesh>
          {/* Right lapel */}
          <mesh rotation={[0, 0, 0.3]} castShadow>
            <boxGeometry args={[0.15, 0.2, 0.02]} />
            <meshStandardMaterial
              map={fabricTexture}
              roughness={0.8}
              metalness={0}
            />
          </mesh>
        </group>

        {/* Floral embroidery on chest - two prominent designs */}
        <mesh position={[-0.12, robeLength / 2 - 0.25, 0.13]} castShadow>
          <planeGeometry args={[0.12, 0.12]} />
          <meshStandardMaterial
            map={embroideryTexture}
            transparent
            alphaTest={0.1}
            roughness={0.7}
            metalness={0}
          />
        </mesh>
        <mesh position={[0.12, robeLength / 2 - 0.25, 0.13]} castShadow>
          <planeGeometry args={[0.12, 0.12]} />
          <meshStandardMaterial
            map={embroideryTexture}
            transparent
            alphaTest={0.1}
            roughness={0.7}
            metalness={0}
          />
        </mesh>

        {/* Voluminous sleeves */}
        <group position={[-robeWidth / 2 - 0.05, robeLength / 2 - 0.3, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.1, 0.4, 12]} />
            <meshStandardMaterial
              map={fabricTexture}
              roughness={0.8}
              metalness={0}
            />
          </mesh>
          {/* Cuff embroidery */}
          <mesh position={[0, -0.2, 0]} castShadow>
            <torusGeometry args={[0.08, 0.01, 8, 16]} />
            <meshStandardMaterial
              color="#ff6b9d" // Pink embroidery
              roughness={0.7}
              metalness={0}
            />
          </mesh>
        </group>
        <group position={[robeWidth / 2 + 0.05, robeLength / 2 - 0.3, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.1, 0.4, 12]} />
            <meshStandardMaterial
              map={fabricTexture}
              roughness={0.8}
              metalness={0}
            />
          </mesh>
          {/* Cuff embroidery */}
          <mesh position={[0, -0.2, 0]} castShadow>
            <torusGeometry args={[0.08, 0.01, 8, 16]} />
            <meshStandardMaterial
              color="#ff6b9d" // Pink embroidery
              roughness={0.7}
              metalness={0}
            />
          </mesh>
        </group>

        {/* White fabric sash/belt with decorative knot and tassels */}
        <group position={[0, robeLength / 2 - 0.6, 0.13]}>
          {/* Belt */}
          <mesh castShadow>
            <torusGeometry args={[robeWidth / 2 + 0.05, 0.03, 8, 16]} />
            <meshStandardMaterial
              color="#ffffff" // White
              roughness={0.7}
              metalness={0}
            />
          </mesh>
          {/* Decorative knot */}
          <mesh position={[0, 0, 0.05]} castShadow>
            <boxGeometry args={[0.08, 0.08, 0.06]} />
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.7}
              metalness={0}
            />
          </mesh>
          {/* Tassels */}
          {Array.from({ length: 6 }, (_, i) => {
            const angle = (i / 5) * Math.PI * 0.4 - Math.PI * 0.2;
            const x = Math.cos(angle) * 0.15;
            const z = Math.sin(angle) * 0.05;
            return (
              <mesh
                key={i}
                position={[x, -0.1, z]}
                rotation={[0, 0, angle]}
                castShadow
              >
                <cylinderGeometry args={[0.008, 0.008, 0.12, 6]} />
          <meshStandardMaterial
                  color="#ffffff"
            roughness={0.7}
            metalness={0}
          />
        </mesh>
            );
          })}
        </group>

        {/* Floral embroidery on bottom hem */}
        <mesh position={[0, -robeLength / 2 + 0.1, 0.13]} castShadow>
          <planeGeometry args={[robeWidth * 0.8, 0.08]} />
            <meshStandardMaterial
            map={embroideryTexture}
            transparent
            alphaTest={0.1}
            roughness={0.7}
            metalness={0}
            />
          </mesh>
      </group>

      {/* Label plaque */}
      <mesh position={[0, pedestalHeight + 0.02, 0.5]}>
        <boxGeometry args={[0.6, 0.1, 0.02]} />
        <meshStandardMaterial color="#2a1f1a" />
      </mesh>
      <Text
        position={[0, pedestalHeight + 0.02, 0.51]}
        fontSize={0.05}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {data.title}
      </Text>

      {/* Enhanced spotlight from above */}
      <spotLight
        position={[0, pedestalHeight + mannequinHeight + 1.2, 0]}
        angle={0.3}
        penumbra={0.4}
        intensity={hovered ? 2.5 : 2}
        color="#ffffff"
        castShadow
        target-position={[0, pedestalHeight + mannequinHeight / 2, 0]}
        distance={4}
        decay={2}
      />
      
      {/* Rim lighting for dress display - always on */}
      <pointLight
        position={[0.3, pedestalHeight + mannequinHeight / 2, 0.2]}
        intensity={1}
        color="#ffffff"
        distance={2.5}
        decay={2}
      />
      
      {/* Additional accent light from side */}
      <pointLight
        position={[-0.3, pedestalHeight + mannequinHeight / 2, 0.2]}
        intensity={0.8}
        color="#fff8e1"
        distance={2.5}
        decay={2}
      />
    </group>
  );
}
