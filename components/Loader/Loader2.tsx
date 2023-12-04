'use client';
import { Html, useProgress } from '@react-three/drei';
import { animate } from 'framer-motion';
import React, { useEffect, useState } from 'react';

export default function Loader2({ Total }: { Total: number }) {
  const { progress, loaded, total } = useProgress();
  const [Opacity, setOpacity] = useState<string>('opacity-0');
  const [percentage, setpercentage] = useState(0);
  const [Progress, setProgress] = useState(0);
  const [From, setFrom] = useState(0);
  useEffect(() => {
    setOpacity('opacity-100');
  }, []);

  useEffect(() => {
    const value = ((loaded / Total) * 100).toFixed(0) as unknown as number;
    setpercentage(value > 100 ? 100 : value);
  }, [progress, loaded]);

  return (
    <Html
      //   zIndexRange={[-10, 0]}
      center
      className={`${Opacity} pointer-events-none flex h-20 min-h-fit w-full flex-col items-center justify-center gap-y-1 text-sm font-thin transition-all duration-300`}
    >
      <div className={`animate-pulse-slow2 flex flex-row gap-x-1`}>
        {percentage}% <span className='font-light'>Loading</span>
      </div>
      <progress value={percentage} max='100' className='h-1 w-32' />
    </Html>
  );
}
