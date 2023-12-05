'use client';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import React, { useRef } from 'react';

type Props = {};

export default function Hero({}: Props) {
  const HeroRef = useRef<HTMLDivElement>(null);

  const { scrollY, scrollYProgress } = useScroll({
    target: HeroRef,
    offset: ['start start', 'end start'],
  });

  // const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 128,
  });
  const title1X = useTransform(smoothVelocity, [0, 1], ['0%', '-105%']);
  const title2X = useTransform(smoothVelocity, [0, 1], ['0%', '105%']);
  const bodyY = useTransform(smoothVelocity, [0, 0.3], ['0%', '-150%']);
  const titleOpacity = useTransform(smoothVelocity, [0, 0.3], ['100%', '0%']);
  const titlescale = useTransform(smoothVelocity, [0, 0.5], [1, 0.7]);

  const HeroParent = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1,
        delayChildren: 2,
        delay: 2,
      },
    },
    exit: {},
  };
  const titles = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1,
        delayChildren: 1,
      },
    },
    exit: {},
  };
  const title1 = {
    hidden: { opacity: 0, x: '-15%' },
    visible: {
      opacity: 1,
      x: 0,
      delay: 2,
    },
    exit: {},
  };
  const title2 = {
    hidden: { opacity: 0, x: '15%' },
    visible: {
      opacity: 1,
      x: 0,
    },
    exit: {},
  };
  const body = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
    exit: {},
  };

  return (
    <motion.div
      variants={HeroParent}
      initial='hidden'
      animate='visible'
      exit='exit'
      ref={HeroRef}
      className='Hero mx-auto flex h-full min-h-screen grow-0 select-none flex-col items-center justify-center gap-y-4 sm:gap-y-12'
    >
      <motion.h1
        variants={titles}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='font-Lucida title px-2'
      >
        <motion.div
          variants={title1}
          style={{ x: title1X, scale: titlescale, opacity: titleOpacity }}
          transition={{
            type: 'spring',
            damping: 60,
            stiffness: 120,
          }}
        >
          &quot;One small step for a man,
        </motion.div>
        <motion.div
          variants={title2}
          style={{ x: title2X, scale: titlescale, opacity: titleOpacity }}
          transition={{
            type: 'spring',
            damping: 60,
            stiffness: 120,
          }}
        >
          one giant leap for mankind.&quot;
        </motion.div>
      </motion.h1>
      <motion.p
        variants={body}
        transition={{
          type: 'spring',
          damping: 60,
          stiffness: 120,
        }}
        style={{ opacity: titleOpacity }}
        className='body max-w-6xl px-4 text-center font-medium lg:text-start'
      >
        The 1969 moon landing, conducted by NASA&apos;s Apollo 11 mission, made
        history as astronauts Neil Armstrong and Buzz Aldrin became the first
        humans to set foot on the lunar surface, a monumental achievement in
        space exploration.
      </motion.p>
    </motion.div>
  );
}
