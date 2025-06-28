
import { useState, useRef, useEffect } from "react";
import { Song } from "@/types/song";

interface UseAudioPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  playNext: () => void;
  volume: number;
  isRepeat: boolean;
}

export const useAudioPlayer = ({ currentSong, isPlaying, playNext, volume, isRepeat }: UseAudioPlayerProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const skipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (audioRef.current && currentSong) {
      setIsLoading(true);
      setHasError(false);
      
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Song started playing successfully:", currentSong.title);
              setIsLoading(false);
            })
            .catch((error) => {
              console.log("Failed to play song:", error);
              setHasError(true);
              setIsLoading(false);
              
              // Clear any existing timeout
              if (skipTimeoutRef.current) {
                clearTimeout(skipTimeoutRef.current);
              }
              
              // Add a longer delay before skipping to prevent rapid cycling
              skipTimeoutRef.current = setTimeout(() => {
                console.log("Skipping to next song after error");
                playNext();
              }, 2000); // 2 second delay
            });
        }
      } else {
        audioRef.current.pause();
        setIsLoading(false);
      }
    }
  }, [isPlaying, currentSong, playNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (skipTimeoutRef.current) {
        clearTimeout(skipTimeoutRef.current);
      }
    };
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
      console.log("Song metadata loaded:", currentSong?.title, "Duration:", audioRef.current.duration);
    }
  };

  const handleError = (event: any) => {
    console.log("Audio error occurred:", event.target?.error);
    setHasError(true);
    setIsLoading(false);
    
    // Clear any existing timeout
    if (skipTimeoutRef.current) {
      clearTimeout(skipTimeoutRef.current);
    }
    
    // Add a longer delay before skipping to prevent rapid cycling
    skipTimeoutRef.current = setTimeout(() => {
      console.log("Auto-skipping to next song due to error");
      playNext();
    }, 3000); // 3 second delay
  };

  const handleEnded = () => {
    console.log("Song ended naturally, playing next song");
    if (isRepeat) {
      // Restart the same song
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      // Play next song
      playNext();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return {
    audioRef,
    currentTime,
    duration,
    isLoading,
    hasError,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleError,
    handleEnded,
    handleSeek
  };
};
