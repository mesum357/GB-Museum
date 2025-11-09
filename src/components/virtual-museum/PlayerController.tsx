import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import nipplejs from 'nipplejs';

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
  const [isMobile, setIsMobile] = useState(false);
  const joystickRef = useRef<any>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  // Setup joystick for mobile
  useEffect(() => {
    if (isMobile && !joystickRef.current) {
      // Wait for DOM to be ready
      const timeoutId = setTimeout(() => {
        const zone = document.getElementById('joystick-zone');
        if (zone && !joystickRef.current) {
          const joystick = nipplejs.create({
            zone: zone,
            mode: 'static',
            position: { left: '10%', bottom: '10%' },
            color: 'rgba(255, 255, 255, 0.5)',
            size: 100,
          });

          joystick.on('move', (evt: any, data: any) => {
            const angle = data.angle.radian;
            const force = data.force;
            
            if (force > 0.1) {
              moveForward.current = Math.cos(angle) > 0.3;
              moveBackward.current = Math.cos(angle) < -0.3;
              moveLeft.current = Math.sin(angle) > 0.3;
              moveRight.current = Math.sin(angle) < -0.3;
            } else {
              moveForward.current = false;
              moveBackward.current = false;
              moveLeft.current = false;
              moveRight.current = false;
            }
          });

          joystick.on('end', () => {
            moveForward.current = false;
            moveBackward.current = false;
            moveLeft.current = false;
            moveRight.current = false;
          });

          joystickRef.current = joystick;
        }
      }, 100);

      // Right side touch for camera look
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

      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);

      return () => {
        clearTimeout(timeoutId);
        if (joystickRef.current) {
          (joystickRef.current as any).destroy();
          joystickRef.current = null;
        }
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isMobile, camera]);

  // Keyboard controls
  useEffect(() => {
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
  }, []);

  // Movement and collision
  useFrame((state, delta) => {
    // Check if pointer lock is active (for desktop)
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

  return (
    <>
      {!isMobile && (
        <PointerLockControls
          ref={controlsRef}
          selector="canvas"
        />
      )}
      {/* Joystick zone for mobile */}
      {isMobile && (
        <div
          id="joystick-zone"
          className="fixed bottom-0 left-0 w-1/3 h-1/3 pointer-events-none z-50"
          style={{ touchAction: 'none' }}
        />
      )}
    </>
  );
}

