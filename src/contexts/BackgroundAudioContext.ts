'use client';
import React, { createContext, useContext, useState, useRef, useEffect, JSX } from 'react';

interface BackgroundAudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  isLoaded: boolean;
}

const BackgroundAudioContext = createContext<BackgroundAudioContextType | undefined>(undefined);

export function useAudio(): BackgroundAudioContextType {
  const context = useContext(BackgroundAudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}

interface AudioProviderProps {
  children: React.ReactNode;
  audioSrc: string;
}

export function AudioProvider({ children, audioSrc }: AudioProviderProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.3);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;
    
    const handleCanPlay = (): void => {
      setIsLoaded(true);
    };
    
    const handleError = (): void => {
      setIsLoaded(false);
    };

    audio.addEventListener('canplaythrough', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.load();

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, [audioSrc]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleAudio = (): void => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
      setIsPlaying(true);
    }
  };

  const handleSetVolume = (newVolume: number): void => {
    setVolume(newVolume);
  };

  const contextValue: BackgroundAudioContextType = {
    isPlaying,
    toggleAudio,
    volume,
    setVolume: handleSetVolume,
    isLoaded
  };

  return React.createElement(
    BackgroundAudioContext.Provider,
    { value: contextValue },
    children
  );
}