// src/contexts/BackgroundColorContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface BackgroundColorContextType {
  currentBgColor: string;
  setCurrentBgColor: (color: string) => void;
}

const BackgroundColorContext = createContext<BackgroundColorContextType | undefined>(undefined);

export const useBackgroundColor = () => {
  const context = useContext(BackgroundColorContext);
  if (!context) {
    throw new Error('useBackgroundColor must be used within BackgroundColorProvider');
  }
  return context;
};

interface BackgroundColorProviderProps {
  children: ReactNode;
}

export const BackgroundColorProvider = ({ children }: BackgroundColorProviderProps) => {
  const [currentBgColor, setCurrentBgColor] = useState('#d8d0bb');

  return (
    <BackgroundColorContext.Provider value={{ currentBgColor, setCurrentBgColor }}>
      {children}
    </BackgroundColorContext.Provider>
  );
};