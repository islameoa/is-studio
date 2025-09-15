'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useAudio } from '../../contexts/BackgroundAudioContext';
import styles from './AudioButton.module.scss';

const AudioButton: React.FC = () => {
  const { isPlaying, toggleAudio, volume, setVolume, isLoaded } = useAudio();
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!isLoaded) {
    return null;
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowVolumeControl(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowVolumeControl(false);
    }, 150);
  };

  return (
    <div 
      className={styles.audioButtonContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showVolumeControl && (
        <div 
          className={styles.volumeControl}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className={styles.volumeSlider}
          />
        </div>
      )}
      
      <button
        onClick={toggleAudio}
        className={`${styles.audioButton} ${isPlaying ? styles.playing : styles.paused}`}
        aria-label={isPlaying ? 'Pausar musica' : 'Reproducir musica'}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={styles.audioIcon}
        >
          {isPlaying ? (
            <>
              <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
              <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
            </>
          ) : (
            <polygon points="8,5 19,12 8,19" fill="currentColor"/>
          )}
        </svg>
        
        {isPlaying && (
          <div className={styles.soundWaves}>
            <div className={styles.wave}></div>
            <div className={styles.wave}></div>
            <div className={styles.wave}></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default AudioButton;