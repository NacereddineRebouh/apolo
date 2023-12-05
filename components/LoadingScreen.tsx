'use client';
import { setLoaded } from '@/utils/Providers/Redux/Loaded';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '@/utils/Providers/store/store';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type Props = {};

export default function LoadingScreen({}: Props) {
  const percentage = useAppSelector(
    (state: RootState) => state.load.percentage
  );
  const dispatch = useAppDispatch();

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className='fixed top-0 flex h-full w-full select-none flex-col items-center justify-center gap-y-1 bg-black text-sm font-thin transition-all duration-300'
    >
      <AnimatePresence mode='wait'>
        {percentage < 100 && (
          <>
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className={`flex animate-pulse-slow2 flex-row gap-x-1`}
            >
              {percentage}% <span className='font-light'>Loading</span>
            </motion.div>
            <motion.progress
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              value={percentage}
              max='100'
              className='h-1 w-32'
            />
          </>
        )}
        {percentage >= 100 && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(setLoaded())}
            className='group cursor-pointer rounded-lg border-[2px] border-neutral-400 bg-neutral-950/30 px-4 py-2 font-light text-neutral-50'
          >
            <div className='animate-pulse-slow2 transition-all duration-300 group-hover:tracking-wider group-active:tracking-tight'>
              Start experience
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
