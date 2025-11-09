import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useMuseum } from '@/contexts/MuseumContext';

interface PaintingProps {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  data: {
    title: string;
    description: string;
    year?: number;
    artist?: string;
  };
  onInteract?: (id: string, data: any) => void;
}

export function Painting({ id, position, rotation, data, onInteract }: PaintingProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const frameRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { isPointerLocked, isMobile } = useMuseum();

  // Create a placeholder texture for the painting
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, '#8b6f47');
  gradient.addColorStop(0.5, '#a67c52');
  gradient.addColorStop(1, '#6b5238');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);
  ctx.fillStyle = '#3b2f2a';
  ctx.font = '48px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Painting', 256, 256);
  ctx.fillStyle = '#5c493e';
  ctx.font = '24px Arial';
  ctx.fillText(data.title, 256, 300);
  
  const texture = new THREE.CanvasTexture(canvas);

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
      if (meshRef.current) {
        meshRef.current.scale.setScalar(hovered ? 1.05 : 1);
      }
      lastUpdate.current = 0;
    }
  });

  const frameWidth = 0.02;
  const paintingWidth = 1.5;
  const paintingHeight = 1.2;

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Painting frame (outer) */}
      <mesh ref={frameRef} castShadow receiveShadow>
        <boxGeometry args={[paintingWidth + frameWidth * 2, paintingHeight + frameWidth * 2, 0.05]} />
        <meshStandardMaterial
          color="#d4a574"
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>

      {/* Painting canvas */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0.03]}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[paintingWidth, paintingHeight]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* Label plaque */}
      <mesh position={[0, -paintingHeight / 2 - 0.15, 0.02]}>
        <boxGeometry args={[paintingWidth, 0.15, 0.02]} />
        <meshStandardMaterial color="#2a1f1a" />
      </mesh>
      <Text
        position={[0, -paintingHeight / 2 - 0.15, 0.03]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {data.title}
      </Text>

      {/* Rim lighting for paintings - always on for better visibility */}
      <pointLight
        position={[0, paintingHeight / 2 + 0.2, 0.1]}
        intensity={0.8}
        color="#ffffff"
        distance={2}
        decay={2}
      />
      
      {/* Additional accent light from above */}
      <pointLight
        position={[0, paintingHeight / 2 + 0.5, 0]}
        intensity={0.5}
        color="#fff8e1"
        distance={1.5}
        decay={2}
      />
      
      {/* Spotlight indicator when hovered */}
      {hovered && (
        <mesh position={[0, paintingHeight / 2 + 0.3, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial
            color="#fff8e1"
            emissive="#fff8e1"
            emissiveIntensity={1}
          />
        </mesh>
      )}
    </group>
  );
}

