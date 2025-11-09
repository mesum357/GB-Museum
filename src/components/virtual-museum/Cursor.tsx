import { useEffect, useState } from 'react';

interface CursorProps {
  isActive?: boolean;
}

export function Cursor({ isActive = true }: CursorProps) {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    // Detect hover over interactive elements
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over an interactive element (canvas or buttons)
      const isInteractive = target.tagName === 'CANVAS' || target.closest('button');
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
      style={{ cursor: 'none' }}
    >
      {/* Crosshair cursor */}
      <div className="relative w-0 h-0">
        {/* Center dot */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-200"
          style={{
            backgroundColor: isHovering ? '#60a5fa' : '#ffffff',
            boxShadow: isHovering
              ? '0 0 8px rgba(96, 165, 250, 0.8)'
              : '0 0 4px rgba(255, 255, 255, 0.6)',
          }}
        />
        {/* Horizontal line */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-0.5 transition-all duration-200"
          style={{
            backgroundColor: isHovering ? '#60a5fa' : '#ffffff',
            marginLeft: '-40px',
            opacity: isHovering ? 0.9 : 0.7,
            boxShadow: isHovering
              ? '0 0 4px rgba(96, 165, 250, 0.6)'
              : '0 0 2px rgba(255, 255, 255, 0.4)',
          }}
        />
        {/* Vertical line */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-20 transition-all duration-200"
          style={{
            backgroundColor: isHovering ? '#60a5fa' : '#ffffff',
            marginTop: '-40px',
            opacity: isHovering ? 0.9 : 0.7,
            boxShadow: isHovering
              ? '0 0 4px rgba(96, 165, 250, 0.6)'
              : '0 0 2px rgba(255, 255, 255, 0.4)',
          }}
        />
        {/* Outer circle */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 transition-all duration-200"
          style={{
            borderColor: isHovering ? '#60a5fa' : '#ffffff',
            marginLeft: '-20px',
            marginTop: '-20px',
            opacity: isHovering ? 0.7 : 0.5,
            boxShadow: isHovering
              ? '0 0 8px rgba(96, 165, 250, 0.5)'
              : '0 0 4px rgba(255, 255, 255, 0.3)',
          }}
        />
      </div>
    </div>
  );
}

