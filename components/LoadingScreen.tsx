'use client';
import { RootState, useAppSelector } from '@/utils/Providers/store/store';
import { motion } from 'framer-motion';
import React from 'react';

type Props = {};

export default function LoadingScreen({}: Props) {
  const percentage = useAppSelector(
    (state: RootState) => state.load.percentage
  );

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className='pointer-events-none fixed top-0 flex h-full w-full flex-col items-center justify-center gap-y-1 bg-neutral-800 text-sm font-thin transition-all duration-300'
    >
      <div className={`animate-pulse-slow2 flex flex-row gap-x-1`}>
        {percentage}% <span className='font-light'>Loading</span>
      </div>
      <progress value={percentage} max='100' className='h-1 w-32' />
    </motion.div>
  );
}
