import { useState, useEffect, useCallback } from 'react';
import { X, Maximize, Minimize, Info, HelpCircle, Camera, Lightbulb, LightbulbOff, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMuseum } from '@/contexts/MuseumContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ExhibitData {
  title: string;
  description: string;
  year?: number;
  artist?: string;
  material?: string;
}

interface UIOverlayProps {
  selectedExhibit: ExhibitData | null;
  onCloseExhibit: () => void;
  onExit: () => void;
  onFullscreen?: () => void;
  isFullscreen?: boolean;
}

export function UIOverlay({
  selectedExhibit,
  onCloseExhibit,
  onExit,
  onFullscreen,
  isFullscreen = false,
}: UIOverlayProps) {
  const [showInstructions, setShowInstructions] = useState(true);
  const { markhorMaterial, setMarkhorMaterial, ledLightsEnabled, setLedLightsEnabled, isPointerLocked, isMobile } = useMuseum();

  const handleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
      if (onFullscreen) {
        onFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, [onFullscreen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          handleFullscreen();
        }
      }
      if (e.key === 'Escape' && selectedExhibit) {
        onCloseExhibit();
      }
      // Camera presets: 1-Entrance, 2-Pedestal, 3-Overhead
      if (e.key === '1' && (window as any).setCameraPreset) {
        (window as any).setCameraPreset('entrance');
      }
      if (e.key === '2' && (window as any).setCameraPreset) {
        (window as any).setCameraPreset('pedestal');
      }
      if (e.key === '3' && (window as any).setCameraPreset) {
        (window as any).setCameraPreset('overhead');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedExhibit, handleFullscreen, onCloseExhibit]);

  return (
    <>
      {/* Instructions overlay */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full">
            <CardHeader>
              <CardTitle>Virtual Museum Controls</CardTitle>
              <CardDescription>
                Learn how to navigate the virtual museum
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Desktop Controls:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><strong>Mouse:</strong> Click to lock pointer and look around</li>
                  <li><strong>WASD:</strong> Move forward, backward, left, right</li>
                  <li><strong>Space:</strong> Jump (when available)</li>
                  <li><strong>1:</strong> Entrance view</li>
                  <li><strong>2:</strong> Pedestal close-up</li>
                  <li><strong>3:</strong> Overhead view</li>
                  <li><strong>F:</strong> Toggle fullscreen</li>
                  <li><strong>ESC:</strong> Exit pointer lock</li>
                  <li><strong>Click Palette:</strong> Switch material (Wood/Bronze)</li>
                  <li><strong>Click Lightbulb:</strong> Toggle LED lights</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Mobile Controls:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><strong>Joystick (bottom-left):</strong> Move around</li>
                  <li><strong>Right side touch:</strong> Drag to look around</li>
                </ul>
              </div>
              <Button
                onClick={() => setShowInstructions(false)}
                className="w-full"
              >
                Got it! Let's explore
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Top bar controls */}
      <div className="fixed top-4 right-4 z-40 flex gap-2">
        {/* Material Variant Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-background/80 backdrop-blur-sm"
            >
              <Palette className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setMarkhorMaterial('wood')}>
              Wood Material
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMarkhorMaterial('bronze')}>
              Bronze Material
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* LED Lights Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setLedLightsEnabled(!ledLightsEnabled)}
          className="bg-background/80 backdrop-blur-sm"
        >
          {ledLightsEnabled ? (
            <Lightbulb className="h-4 w-4" />
          ) : (
            <LightbulbOff className="h-4 w-4" />
          )}
        </Button>

        {/* Camera Presets */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-background/80 backdrop-blur-sm"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => (window as any).setCameraPreset?.('entrance')}>
              Entrance View (1)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => (window as any).setCameraPreset?.('pedestal')}>
              Pedestal Close (2)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => (window as any).setCameraPreset?.('overhead')}>
              Overhead View (3)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowInstructions(true)}
          className="bg-background/80 backdrop-blur-sm"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleFullscreen}
          className="bg-background/80 backdrop-blur-sm"
        >
          {isFullscreen ? (
            <Minimize className="h-4 w-4" />
          ) : (
            <Maximize className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onExit}
          className="bg-background/80 backdrop-blur-sm"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Exhibit info panel - Disabled */}
      {/* Modals removed - no popups on exhibit click */}

      {/* Mobile joystick info */}
      {isMobile && (
        <div className="fixed bottom-4 left-4 z-40 bg-background/80 backdrop-blur-sm p-3 rounded-lg text-xs text-muted-foreground max-w-xs">
          <Info className="h-4 w-4 inline mr-2" />
          Use the joystick to move. Drag on the right side to look around.
        </div>
      )}
    </>
  );
}

