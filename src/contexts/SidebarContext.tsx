import { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  hideSidebar: boolean;
  setHideSidebar: (hide: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [hideSidebar, setHideSidebar] = useState(false);

  return (
    <SidebarContext.Provider value={{ hideSidebar, setHideSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

