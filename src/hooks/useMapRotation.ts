import { useState, useEffect } from 'react';

// Maps for mock rotation
const MAPS = [
  'Rustlands',
  'City Ruins',
  'Frost Peak',
  'Desert Outpost'
];

// Map rotation time in seconds
const ROTATION_TIME_SECONDS = 30 * 60; // 30 minutes

export const useMapRotation = () => {
  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROTATION_TIME_SECONDS);

  useEffect(() => {
    // Determine the current map index based on the actual time
    // so it's consistent across reloads for mock purposes.
    const now = Math.floor(Date.now() / 1000);
    const rotationCycle = Math.floor(now / ROTATION_TIME_SECONDS);
    const timePassedInCycle = now % ROTATION_TIME_SECONDS;

    setCurrentMapIndex(rotationCycle % MAPS.length);
    setTimeLeft(ROTATION_TIME_SECONDS - timePassedInCycle);

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCurrentMapIndex((idx) => (idx + 1) % MAPS.length);
          return ROTATION_TIME_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return {
    currentMap: MAPS[currentMapIndex],
    nextMap: MAPS[(currentMapIndex + 1) % MAPS.length],
    timeLeftFormatted: formatTime(timeLeft),
  };
};
