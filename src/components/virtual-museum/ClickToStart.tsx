import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MousePointer } from 'lucide-react';

interface ClickToStartProps {
  onStart: () => void;
}

export function ClickToStart({ onStart }: ClickToStartProps) {
  const [show, setShow] = useState(true);

  const handleStart = () => {
    setShow(false);
    onStart();
  };

  useEffect(() => {
    // Don't add click listener if already started
    if (!show) return;

    const handleClick = () => {
      handleStart();
    };

    // Add click listener to canvas
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('click', handleClick);
      return () => {
        canvas.removeEventListener('click', handleClick);
      };
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="text-center text-white p-8">
        <MousePointer className="h-16 w-16 mx-auto mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold mb-4">Click to Start</h2>
        <p className="text-white/70 mb-6">
          Click anywhere on the screen to enter the virtual museum
        </p>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={handleStart}
        >
          Enter Museum
        </Button>
      </div>
    </div>
  );
}

