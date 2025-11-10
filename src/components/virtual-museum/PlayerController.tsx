import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import { useMuseum } from '@/contexts/MuseumContext';

// Global state for joystick movement (shared between components)
const joystickState = {
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
  setMoveForward: (value: boolean) => { joystickState.moveForward = value; },
  setMoveBackward: (value: boolean) => { joystickState.moveBackward = value; },
  setMoveLeft: (value: boolean) => { joystickState.moveLeft = value; },
  setMoveRight: (value: boolean) => { joystickState.moveRight = value; },
};

// Export for use by MobileJoystick component
export { joystickState };

interface PlayerControllerProps {
  speed?: number;
}

export function PlayerController({ speed = 5 }: PlayerControllerProps) {
  const { camera, gl } = useThree();
  const moveForward = useRef(false);
  const moveBackward = useRef(false);
  const moveLeft = useRef(false);
  const moveRight = useRef(false);
  const canJump = useRef(false);
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const raycaster = useRef(new THREE.Raycaster());
  const controlsRef = useRef<any>(null);
  const { isMobile } = useMuseum();

  // Sync joystick state to local refs
  useEffect(() => {
    const interval = setInterval(() => {
      moveForward.current = joystickState.moveForward;
      moveBackward.current = joystickState.moveBackward;
      moveLeft.current = joystickState.moveLeft;
      moveRight.current = joystickState.moveRight;
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  // Right side touch for camera look (mobile only)
  useEffect(() => {
    if (!isMobile) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let isLooking = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1 && e.touches[0].clientX > window.innerWidth / 2) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isLooking = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isLooking && e.touches.length === 1) {
        e.preventDefault();
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        
        camera.rotation.y -= deltaX * 0.002;
        camera.rotation.x -= deltaY * 0.002;
        camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
        
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      isLooking = false;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, camera]);

  // Keyboard controls (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          moveForward.current = true;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          moveLeft.current = true;
          break;
        case 'ArrowDown':
        case 'KeyS':
          moveBackward.current = true;
          break;
        case 'ArrowRight':
        case 'KeyD':
          moveRight.current = true;
          break;
        case 'Space':
          event.preventDefault();
          if (canJump.current) {
            velocity.current.y += 350;
            canJump.current = false;
          }
          break;
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          moveForward.current = false;
          break;
        case 'ArrowLeft':
        case 'KeyA':
          moveLeft.current = false;
          break;
        case 'ArrowDown':
        case 'KeyS':
          moveBackward.current = false;
          break;
        case 'ArrowRight':
        case 'KeyD':
          moveRight.current = false;
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [isMobile]);

  // Movement and collision
  useFrame((state, delta) => {
    // Check if pointer lock is active (for desktop) or mobile
    const isLocked = isMobile || (controlsRef.current && controlsRef.current.isLocked);
    
    if (!isLocked && !isMobile) return;

    // Ground detection
    raycaster.current.set(camera.position, new THREE.Vector3(0, -1, 0));
    const intersects = raycaster.current.intersectObjects(
      state.scene.children.filter((child) => child.type === 'Mesh'),
      false
    );

    const onObject = intersects.length > 0 && intersects[0].distance < 1.8;

    // Velocity damping
    velocity.current.x -= velocity.current.x * 10.0 * delta;
    velocity.current.z -= velocity.current.z * 10.0 * delta;
    velocity.current.y -= 9.8 * 100.0 * delta; // gravity

    // Movement direction in local camera space
    direction.current.set(0, 0, 0);
    
    if (moveForward.current) direction.current.z -= 1;
    if (moveBackward.current) direction.current.z += 1;
    if (moveLeft.current) direction.current.x -= 1;
    if (moveRight.current) direction.current.x += 1;

    // Normalize and apply speed
    if (direction.current.length() > 0) {
      direction.current.normalize();
      
      // Transform direction to world space (camera space)
      const cameraDirection = new THREE.Vector3();
      camera.getWorldDirection(cameraDirection);
      cameraDirection.y = 0;
      cameraDirection.normalize();
      
      const cameraRight = new THREE.Vector3();
      cameraRight.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0)).normalize();
      
      // Calculate movement in world space
      const moveVector = new THREE.Vector3();
      moveVector.addScaledVector(cameraDirection, -direction.current.z);
      moveVector.addScaledVector(cameraRight, direction.current.x);
      moveVector.normalize();
      moveVector.multiplyScalar(speed);
      
      velocity.current.x = moveVector.x;
      velocity.current.z = moveVector.z;
    }

    // Collision detection with walls and exhibits (simple box collision)
    const moveDelta = velocity.current.clone().multiplyScalar(delta);
    const nextPos = camera.position.clone().add(moveDelta);

    // Wall boundaries (room is 20x15, player starts at 0,0,0)
    const roomWidth = 20;
    const roomDepth = 15;
    const wallMargin = 0.5;

    if (nextPos.x > roomWidth / 2 - wallMargin) nextPos.x = roomWidth / 2 - wallMargin;
    if (nextPos.x < -roomWidth / 2 + wallMargin) nextPos.x = -roomWidth / 2 + wallMargin;
    if (nextPos.z > roomDepth / 2 - wallMargin) nextPos.z = roomDepth / 2 - wallMargin;
    if (nextPos.z < -roomDepth / 2 + wallMargin) nextPos.z = -roomDepth / 2 + wallMargin;

    // Ground collision
    if (onObject) {
      velocity.current.y = Math.max(0, velocity.current.y);
      canJump.current = true;
      nextPos.y = Math.max(1.6, intersects[0].point.y + 1.6);
    } else {
      nextPos.y += velocity.current.y * delta;
    }

    // Keep player at eye level
    nextPos.y = Math.max(1.6, nextPos.y);

    camera.position.copy(nextPos);
  });

  // Only return Three.js components - no HTML elements
  // The joystick zone div will be handled outside the Canvas
  if (isMobile) {
    return null; // Mobile controls are handled via DOM events, not 3D components
  }

  return (
    <PointerLockControls
      ref={controlsRef}
      selector="canvas"
    />
  );
}
