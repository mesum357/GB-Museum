import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Lighting() {
  const spotLight1Ref = useRef<THREE.SpotLight>(null);
  const spotLight2Ref = useRef<THREE.SpotLight>(null);
  const spotLight3Ref = useRef<THREE.SpotLight>(null);
  const spotLight4Ref = useRef<THREE.SpotLight>(null);

  return (
    <group>
      {/* Warm ambient light */}
      <ambientLight intensity={0.4} color="#ffeedd" />
      
      {/* Main directional light (soft fill) - optimized shadows */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.3}
        color="#fff8e1"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-radius={4}
        shadow-bias={-0.0001}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Spotlight 1 - Left wall painting 1 - no shadows for performance */}
      <spotLight
        ref={spotLight1Ref}
        position={[-8, 3.8, -2]}
        angle={0.35}
        penumbra={0.4}
        intensity={3.5}
        color="#ffffff"
        castShadow={false}
        target-position={[-8, 1.5, -2]}
        distance={8}
        decay={2}
      />

      {/* Spotlight 2 - Left wall painting 2 - no shadows for performance */}
      <spotLight
        position={[-8, 3.8, 2]}
        angle={0.35}
        penumbra={0.4}
        intensity={3.5}
        color="#ffffff"
        castShadow={false}
        target-position={[-8, 1.5, 2]}
        distance={8}
        decay={2}
      />

      {/* Spotlight 3 - Back wall painting 1 - no shadows for performance */}
      <spotLight
        ref={spotLight2Ref}
        position={[-3, 3.8, -6]}
        angle={0.35}
        penumbra={0.4}
        intensity={3.5}
        color="#ffffff"
        castShadow={false}
        target-position={[-3, 1.5, -6]}
        distance={8}
        decay={2}
      />

      {/* Spotlight 4 - Back wall painting 2 - no shadows for performance */}
      <spotLight
        position={[3, 3.8, -6]}
        angle={0.35}
        penumbra={0.4}
        intensity={3.5}
        color="#ffffff"
        castShadow={false}
        target-position={[3, 1.5, -6]}
        distance={8}
        decay={2}
      />

      {/* Spotlight 5 - Right wall painting 1 - no shadows for performance */}
      <spotLight
        ref={spotLight3Ref}
        position={[8, 3.8, -2]}
        angle={0.35}
        penumbra={0.4}
        intensity={3.5}
        color="#ffffff"
        castShadow={false}
        target-position={[8, 1.5, -2]}
        distance={8}
        decay={2}
      />

      {/* Spotlight 6 - Right wall painting 2 - no shadows for performance */}
      <spotLight
        position={[8, 3.8, 2]}
        angle={0.35}
        penumbra={0.4}
        intensity={3.5}
        color="#ffffff"
        castShadow={false}
        target-position={[8, 1.5, 2]}
        distance={8}
        decay={2}
      />

      {/* Spotlight 7 - Markhor centerpiece statue (main focus) - shadows enabled */}
      <spotLight
        position={[0, 3.8, 0]}
        angle={0.4}
        penumbra={0.4}
        intensity={5}
        color="#ffffff"
        castShadow={true}
        target-position={[0, 0.5, 0]}
        distance={8}
        decay={2}
      />

      {/* Spotlight 8 - Markhor centerpiece statue (rim light) - no shadows */}
      <spotLight
        position={[2, 3.5, 2]}
        angle={0.5}
        penumbra={0.5}
        intensity={3.5}
        color="#fff8e1"
        castShadow={false}
        target-position={[0, 0.5, 0]}
        distance={6}
        decay={2}
      />

      {/* Spotlight 9 & 10 - Removed (dress displays removed) */}

    </group>
  );
}

