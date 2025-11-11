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

    // Create new joystick - centered within its container
    const joystick = nipplejs.create({
      zone: containerRef.current,
      mode: 'static',
      position: { left: '50%', bottom: '50%' },
      color: 'rgba(255, 255, 255, 0.9)',
      size: 110,
      threshold: 0.1,
      fadeTime: 250,
      restOpacity: 0.8,
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

  // Respect safe areas and pull the joystick inward so it's fully visible
  const safeLeft = 'calc(env(safe-area-inset-left, 0px) + 16px)';
  const safeBottom = 'calc(env(safe-area-inset-bottom, 0px) + 16px)';

  return (
    <div
      ref={containerRef}
      className="fixed pointer-events-auto z-50"
      style={{ 
        touchAction: 'none',
        left: safeLeft,
        bottom: safeBottom,
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        border: '2px solid rgba(255, 255, 255, 0.45)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35)',
        overflow: 'hidden',
      }}
    />
  );
}

