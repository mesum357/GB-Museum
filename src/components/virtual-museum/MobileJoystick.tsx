import { useEffect, useRef } from 'react';
import nipplejs from 'nipplejs';
import { joystickState } from './PlayerController';

interface MobileJoystickProps {
  isActive: boolean;
}

export function MobileJoystick({ isActive }: MobileJoystickProps) {
  const joystickRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) {
      // Clean up if not active
      if (joystickRef.current) {
        (joystickRef.current as any).destroy();
        joystickRef.current = null;
      }
      // Reset movement state
      joystickState.setMoveForward(false);
      joystickState.setMoveBackward(false);
      joystickState.setMoveLeft(false);
      joystickState.setMoveRight(false);
      return;
    }

    // Clean up existing joystick
    if (joystickRef.current) {
      (joystickRef.current as any).destroy();
      joystickRef.current = null;
    }

    // Create new joystick
    const joystick = nipplejs.create({
      zone: containerRef.current,
      mode: 'static',
      position: { left: '10%', bottom: '10%' },
      color: 'rgba(255, 255, 255, 0.5)',
      size: 100,
    });

    joystick.on('move', (evt: any, data: any) => {
      const angle = data.angle.radian;
      const force = data.force;
      
      if (force > 0.1) {
        joystickState.setMoveForward(Math.cos(angle) > 0.3);
        joystickState.setMoveBackward(Math.cos(angle) < -0.3);
        joystickState.setMoveLeft(Math.sin(angle) > 0.3);
        joystickState.setMoveRight(Math.sin(angle) < -0.3);
      } else {
        joystickState.setMoveForward(false);
        joystickState.setMoveBackward(false);
        joystickState.setMoveLeft(false);
        joystickState.setMoveRight(false);
      }
    });

    joystick.on('end', () => {
      joystickState.setMoveForward(false);
      joystickState.setMoveBackward(false);
      joystickState.setMoveLeft(false);
      joystickState.setMoveRight(false);
    });

    joystickRef.current = joystick;

    return () => {
      if (joystickRef.current) {
        (joystickRef.current as any).destroy();
        joystickRef.current = null;
      }
      // Reset movement state on cleanup
      joystickState.setMoveForward(false);
      joystickState.setMoveBackward(false);
      joystickState.setMoveLeft(false);
      joystickState.setMoveRight(false);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 w-1/3 h-1/3 pointer-events-auto z-50"
      style={{ touchAction: 'none' }}
    />
  );
}

