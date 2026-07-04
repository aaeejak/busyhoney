'use client';

import { useEffect, useState } from 'react';
import { Drone, demoDrones } from '@/lib/demo-data';

export function useRealtimeDrones() {
  const [drones, setDrones] = useState<Drone[]>(demoDrones);
  const [selectedDroneId, setSelectedDroneId] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrones((prev) =>
        prev.map((d) => {
          const newBattery = Math.max(5, d.battery - 0.15);
          const newX = Math.max(0, Math.min(11, d.x + (Math.random() > 0.5 ? 1 : -1)));
          const newY = Math.max(0, Math.min(9,  d.y + (Math.random() > 0.5 ? 1 : -1)));
          return {
            ...d,
            prevX: d.x,
            prevY: d.y,
            x: newX,
            y: newY,
            battery: newBattery,
            status: newBattery <= 20 ? 'low_battery' : d.status,
          };
        }),
      );
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const selectedDrone = drones.find((d) => d.id === selectedDroneId) ?? null;

  return { drones, selectedDroneId, setSelectedDroneId, selectedDrone };
}
