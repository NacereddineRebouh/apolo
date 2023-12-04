'use client';
import Image from 'next/image';
import React from 'react';
import image10 from '@/public/Images/10.png';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <Image
        src={image10}
        alt={'moon landing'}
        width={3000}
        height={3000}
        className='h-full max-h-[600px] w-full object-cover object-top'
      />
      <div className='headerPadding flex w-screen flex-col items-center justify-center gap-y-4 bg-neutral-900 py-4 text-neutral-100'>
        <motion.div
          className='mx-auto flex h-full w-full max-w-[2000px] items-center justify-between gap-x-12 text-xs 
xs:text-sm '
        >
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 80, stiffness: 300 }}
          >
            Apolo 11
          </motion.div>
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 80, stiffness: 300 }}
            className='flex gap-x-4'
          >
            <Link href={'#'} className='font-medium'>
              Instagram
            </Link>
            <Link href={'#'} className='font-medium'>
              Twitter
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ type: 'spring', damping: 80, stiffness: 300 }}
          className='px-[8%] text-center text-[8px] font-medium sm:px-[15%]'
        >
          All photographs on this website are courtesy of the National
          Aeronautics and Space Administration, specifically the NASA History
          Office and the NASA JSC Media Services Center
        </motion.div>
      </div>
    </div>
  );
}
