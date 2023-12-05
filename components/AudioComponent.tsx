'use client';
import {
  useAppSelector,
  getPercentage,
  getLoaded,
} from '@/utils/Providers/store/store';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
type Props = {};

export default function AudioComponent({}: Props) {
  const loaded = useAppSelector(getLoaded);

  return <>{loaded && <Comp />}</>;
}

const Comp = () => {
  const [play, setPlay] = useState<boolean>(true);
  const audioPlayer = useRef<HTMLAudioElement>(null);
  const button = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (audioPlayer.current) {
      if (play) {
        audioPlayer.current.play();
      } else {
        audioPlayer.current.pause();
      }
    }
  }, [play, audioPlayer]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={button}
      onClick={() => {
        setPlay((v) => !v);
      }}
      className='group fixed bottom-5 right-5 flex aspect-square w-14 cursor-pointer items-center justify-center rounded-full border-[2px] border-neutral-400 bg-neutral-900/10 transition-all duration-200 hover:scale-105 active:scale-95'
    >
      <div
        className={`h-5/6 w-5/6 ${
          !play ? '' : 'animate-ping'
        } rounded-full bg-neutral-700/40`}
      />
      {!play && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 48 48'
          id='play'
          className='absolute left-1/2 top-1/2 h-8 w-8 -translate-x-[45%] -translate-y-1/2'
        >
          <path
            className='fill-transparent stroke-neutral-400 stroke-[3px] transition-all duration-200'
            d='M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z'
          ></path>
        </svg>
      )}
      {play && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 48 48'
          className='absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2'
          id='pause'
        >
          <path
            className='fill-transparent stroke-neutral-400 stroke-[3px] transition-all duration-200'
            d='M36 39h-6c-1.659 0-3-1.341-3-3V12c0-1.659 1.341-3 3-3h6c1.659 0 3 1.341 3 3v24c0 1.659-1.341 3-3 3zm-18 0h-6c-1.659 0-3-1.341-3-3V12c0-1.659 1.341-3 3-3h6c1.659 0 3 1.341 3 3v24c0 1.659-1.341 3-3 3z'
          ></path>
        </svg>
      )}
      <audio
        playsInline={true}
        autoPlay={true}
        loop={true}
        controls={false}
        preload='auto'
        className='relative'
        ref={audioPlayer}
        id='audio'
      >
        <source src='/NASA-MP3.mp3' type='audio/mpeg' />
        <source src='/NASA-MP3.ogg' type='audio/ogg' />
      </audio>
    </motion.div>
  );
};
