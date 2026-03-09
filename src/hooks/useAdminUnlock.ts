import { useState, useCallback, useRef } from 'react';

export function useAdminUnlock() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const clickTimestamps = useRef<number[]>([]);

  const handleClick = useCallback(() => {
    const now = Date.now();
    clickTimestamps.current.push(now);
    clickTimestamps.current = clickTimestamps.current.filter(
      (ts) => now - ts <= 2000
    );

    if (clickTimestamps.current.length >= 5) {
      setIsUnlocked(true);
      clickTimestamps.current = [];
    }
  }, []);

  const resetUnlock = useCallback(() => {
    setIsUnlocked(false);
    clickTimestamps.current = [];
  }, []);

  return { isUnlocked, handleClick, resetUnlock };
}
