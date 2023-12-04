'use client';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import LoadingScreen from '@/components/LoadingScreen';
import Scene from '@/components/Scene/Scene';
import {
  RootState,
  getPercentage,
  useAppSelector,
} from '@/utils/Providers/store/store';
import Lenis from '@studio-freight/lenis';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import gsap, { Circ } from 'gsap';
import CSSPlugin from 'gsap/CSSPlugin';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
gsap.registerPlugin(ScrollTrigger, CSSPlugin, ScrollToPlugin);

export default function Home() {
  const main = useRef<HTMLElement>(null);
  const [velocity, setVelocity] = useState(0);
  const [done, setDone] = useState<boolean>(true);
  const [Section, setSection] = useState<number>(0);
  const doneRef = useRef<boolean>(done);
  const paragraph = useRef<HTMLDivElement>(null);
  const [paragraph1, setparagraph1] = useState<boolean>(true);
  const [paragraph2, setparagraph2] = useState<boolean>(true);
  const [paragraph3, setparagraph3] = useState<boolean>(true);
  const { scrollY, scrollYProgress } = useScroll({
    target: paragraph,
    offset: ['start start', 'end end'],
  });
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest == 0) {
      setparagraph1(true);
      setparagraph2(true);
      setparagraph3(true);
    } else if (latest > 0 && latest <= 0.3) {
      setparagraph1(false);
      setparagraph2(true);
      setparagraph3(true);
    } else if (latest > 0.3 && latest <= 0.6) {
      setparagraph1(true);
      setparagraph2(false);
      setparagraph3(true);
    } else if (latest > 0.6 && latest < 0.99) {
      setparagraph1(true);
      setparagraph2(true);
      setparagraph3(false);
    } else if (latest >= 0.99) {
      setparagraph1(true);
      setparagraph2(true);
      setparagraph3(true);
    }
  });
  const percentage = useAppSelector(getPercentage);

  useEffect(() => {
    const lenis = new Lenis({ smoothTouch: true });
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    if (document && percentage >= 100) {
      requestAnimationFrame(raf);
      let classN = document.documentElement.className;
      classN = classN.replaceAll('overflow-y-hidden', 'overflow-y-auto');
      document.documentElement.className = classN;
    }
  }, [percentage]);
  // useEffect(() => {
  //   if (document && percentage >= 100) {
  //   }
  // }, [percentage]);

  return (
    <main
      ref={main}
      className='flex h-full min-h-screen w-full flex-col items-center justify-center p-0'
    >
      {percentage >= 100 && <Hero />}
      <Scene />

      {/* Paragraph */}
      <div
        ref={paragraph}
        className='bg-neutral-900/.3 relative mx-auto flex h-[600vh] w-full max-w-6xl'
      >
        <div className='body fixed left-1/2 top-1/2 flex  w-full -translate-x-1/2 -translate-y-1/2 select-none flex-col items-center justify-center gap-y-4 !overflow-visible px-[4%] text-center xs:px-[10%] md:text-start'>
          <AnimatePresence mode='wait'>
            {!paragraph1 && (
              <motion.div
                key={1}
                initial={{ opacity: 0, translateY: '7rem' }}
                animate={{
                  opacity: 1,
                  translateY: 0,
                }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 110, stiffness: 600 }}
              >
                The 1969 Moon landing, commonly referred to as the Apollo 11
                mission, was a historic event in human space exploration. On
                July 20, 1969, American astronauts Neil Armstrong and Edwin
                &quot;Buzz&quot; Aldrin became the first humans to set foot on
                the lunar surface. This mission, organized by NASA, marked a
                significant milestone in the space race between the United
                States and the Soviet Union during the Cold War.
              </motion.div>
            )}

            {!paragraph2 && (
              <motion.div
                key={2}
                initial={{ opacity: 0, translateY: '7rem' }}
                animate={{
                  opacity: 1,
                  translateY: 0,
                }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 110, stiffness: 600 }}
              >
                The Apollo 11 mission began on July 16, 1969, when a Saturn V
                rocket launched from Kennedy Space Center in Florida. The crew
                of Apollo 11 included Commander Neil Armstrong, Lunar Module
                Pilot Buzz Aldrin, and Command Module Pilot Michael Collins.
                After a four-day journey to the Moon, the spacecraft entered
                lunar orbit. On July 20, Armstrong and Aldrin descended to the
                lunar surface in the Lunar Module, named &quot;Eagle.&quot; As
                Armstrong stepped onto the Moon, he famously declared,
                &quot;That&apos;s one small step for man, one giant leap for
                mankind.&quot; Aldrin soon followed, and the two astronauts
                conducted experiments, collected lunar samples, and planted the
                American flag on the Moon&apos;s surface.
              </motion.div>
            )}

            {!paragraph3 && (
              <motion.div
                key={3}
                initial={{ opacity: 0, translateY: '7rem' }}
                animate={{
                  opacity: 1,
                  translateY: 0,
                }}
                exit={{
                  scale: 0.9,
                  opacity: 0,
                  transition: {
                    translateY: {
                      type: 'spring',
                      damping: 60,
                      stiffness: 600,
                    },
                  },
                }}
                transition={{ type: 'spring', damping: 110, stiffness: 600 }}
              >
                Michael Collins, orbiting the Moon in the Command Module, played
                a crucial role in ensuring a safe return journey to Earth. After
                approximately 21 hours on the lunar surface, Armstrong and
                Aldrin rejoined Collins, and the spacecraft began its journey
                back to Earth. On July 24, 1969, Apollo 11 safely splashed down
                in the Pacific Ocean, and the crew was recovered by the USS
                Hornet. The mission was a tremendous success and marked a moment
                of unity and pride for people around the world. It represented a
                major achievement in space exploration and scientific discovery,
                and it demonstrated the remarkable capabilities of human
                spaceflight. The Apollo 11 mission is remembered as one of the
                most significant events in the history of space exploration and
                remains a symbol of human determination, ingenuity, and the
                pursuit of the unknown.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
      <AnimatePresence mode='popLayout'>
        {percentage < 100 && <LoadingScreen />}
      </AnimatePresence>
    </main>
  );
}
