
import { useState, useRef, useEffect } from "react";

export const useTimer = (togglePlay: () => void) => {
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer functionality
  useEffect(() => {
    if (timerActive && timerMinutes > 0) {
      timerRef.current = setTimeout(() => {
        togglePlay();
        setTimerActive(false);
        setTimerMinutes(0);
      }, timerMinutes * 60 * 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timerActive, timerMinutes, togglePlay]);

  const startTimer = (minutes: number) => {
    setTimerMinutes(minutes);
    setTimerActive(true);
  };

  const cancelTimer = () => {
    setTimerActive(false);
    setTimerMinutes(0);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return {
    timerMinutes,
    timerActive,
    startTimer,
    cancelTimer
  };
};
