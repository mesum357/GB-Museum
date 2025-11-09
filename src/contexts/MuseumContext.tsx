import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MuseumContextType {
  markhorMaterial: 'wood' | 'bronze';
  setMarkhorMaterial: (material: 'wood' | 'bronze') => void;
  ledLightsEnabled: boolean;
  setLedLightsEnabled: (enabled: boolean) => void;
  quality: 'high' | 'medium' | 'low';
  setQuality: (quality: 'high' | 'medium' | 'low') => void;
  isPointerLocked: boolean;
  isMobile: boolean;
}

const MuseumContext = createContext<MuseumContextType | undefined>(undefined);

export const MuseumProvider = ({ children }: { children: ReactNode }) => {
  const [markhorMaterial, setMarkhorMaterial] = useState<'wood' | 'bronze'>('wood');
  const [ledLightsEnabled, setLedLightsEnabled] = useState(true);
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Track pointer lock state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();

    const handlePointerLockChange = () => {
      setIsPointerLocked(!!document.pointerLockElement);
    };

    const handlePointerLockError = () => {
      setIsPointerLocked(false);
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('pointerlockerror', handlePointerLockError);

    // Initial check
    handlePointerLockChange();

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('pointerlockerror', handlePointerLockError);
    };
  }, []);

  return (
    <MuseumContext.Provider
      value={{
        markhorMaterial,
        setMarkhorMaterial,
        ledLightsEnabled,
        setLedLightsEnabled,
        quality,
        setQuality,
        isPointerLocked,
        isMobile,
      }}
    >
      {children}
    </MuseumContext.Provider>
  );
};

export const useMuseum = () => {
  const context = useContext(MuseumContext);
  if (context === undefined) {
    // Return default values if context is not available (for components inside Canvas)
    return {
      markhorMaterial: 'wood' as const,
      setMarkhorMaterial: () => {},
      ledLightsEnabled: true,
      setLedLightsEnabled: () => {},
      quality: 'high' as const,
      setQuality: () => {},
      isPointerLocked: false,
      isMobile: false,
    };
  }
  return context;
};

