import Image from 'next/image';
import React from 'react';
import logo from '@/public/Images/White Logo.png';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  useAppSelector,
  getPercentage,
  getLoaded,
} from '@/utils/Providers/store/store';
type Props = {};
export default function Navbar({}: Props) {
  // ---- Framer Motion Variants ---- //
  const headerParent = {
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

  const Logo = {
    hidden: { opacity: 0, x: -25 },
    visible: {
      opacity: 1,
      x: 0,
    },
    exit: {},
  };

  const navBar = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.9,
        delayChildren: 1,
      },
    },
    exit: {},
  };

  const navBarItems = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
    },
    exit: {},
  };
  const loaded = useAppSelector(getLoaded);
  return (
    <>
      {loaded && (
        <div className='headerPadding absolute top-0 w-screen bg-neutral-900 py-4 text-neutral-100'>
          <motion.div
            variants={headerParent}
            initial='hidden'
            animate='visible'
            exit='exit'
            className='mx-auto flex h-full w-full max-w-[2000px] items-center justify-start gap-x-4 overflow-hidden xs:gap-x-8 sm:gap-x-12'
          >
            {/* Logo */}
            <motion.a
              variants={Logo}
              transition={{
                type: 'tween',
                ease: 'easeOut',
                duration: 1,
              }}
              href={'/'}
              className='block w-8 sm:w-10 '
            >
              <Image
                src={logo}
                alt={'Logo'}
                className='transition-all duration-150 active:scale-95'
                height={205}
                width={205}
              />
            </motion.a>
            {/* Links */}
            <motion.div
              variants={navBar}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='flex items-center justify-start gap-x-4 overflow-hidden text-xs font-semibold xs:text-sm sm:text-base'
            >
              <Link
                href={'#'}
                className='block text-neutral-100/75 transition-all duration-150 hover:text-neutral-100/100 active:scale-95'
              >
                <motion.p
                  variants={navBarItems}
                  transition={{
                    type: 'tween',
                    ease: 'circOut',
                    duration: 1,
                  }}
                >
                  Home
                </motion.p>
              </Link>
              <Link
                href={'#'}
                className='block text-neutral-100/75 transition-all duration-150 hover:text-neutral-100/100 active:scale-95'
              >
                <motion.p
                  variants={navBarItems}
                  transition={{
                    type: 'tween',
                    ease: 'circOut',
                    duration: 1,
                  }}
                  className='scale-150'
                >
                  Discover
                </motion.p>
              </Link>
              <Link
                href={'#'}
                className='block text-neutral-100/75 transition-all duration-150 hover:text-neutral-100/100 active:scale-95'
              >
                <motion.p
                  variants={navBarItems}
                  transition={{
                    type: 'tween',
                    ease: 'circOut',
                    duration: 1,
                  }}
                  className='scale-150'
                >
                  Shop
                </motion.p>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      )}
    </>
  );
}
