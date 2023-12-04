'use client';
import {
  Environment,
  Float,
  Html,
  Image as ThreeImage,
  OrbitControls,
  PerspectiveCamera,
  PresentationControls,
  ScrollControls,
  Text,
  useProgress,
} from '@react-three/drei';
import { Canvas, PerspectiveCameraProps, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import React, {
  Ref,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Perf } from 'r3f-perf';
import Image, { StaticImageData } from 'next/image';
import Earth from './Earth';
import gsap from 'gsap';
import Loader2 from '../Loader/Loader2';
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { AmbientLight, Camera, DirectionalLight, Group } from 'three';
import * as THREE from 'three';
import image from '@/public/Images/1.jpg';
import image2 from '@/public/Images/2.jpg';
import image3 from '@/public/Images/3.jpg';
import image4 from '@/public/Images/4.jpg';
import image5 from '@/public/Images/5.jpg';
import image6 from '@/public/Images/6.jpg';
import image7 from '@/public/Images/7.jpg';
import image8 from '@/public/Images/8.jpg';
import image9 from '@/public/Images/9.jpg';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '@/utils/Providers/store/store';
import { setLoaded, setPercentage } from '@/utils/Providers/Redux/Loaded';
const Images1 = [image, image3, image5, image7, image9];
const Images2 = [image2, image4, image6, image8];
type Props = {};
type rotation = {
  latitude: number;
  longitude: number;
};
export default function Scene({}: Props) {
  //Loading
  const { progress, loaded, total } = useProgress();
  const dispatch = useAppDispatch();
  // ------- //
  useEffect(() => {
    const value = ((loaded / 14) * 100).toFixed(0) as unknown as number;
    dispatch(setPercentage(value));
  }, [progress, loaded]);

  const earth = useRef<Group>(null);
  const cameraRef = useRef<any>(null);
  const imageGroup1 = useRef<Group>(null);
  const imageGroup2 = useRef<Group>(null);
  const ambientRef = useRef<AmbientLight>(null);
  const directionalLightRef = useRef<DirectionalLight>(null);
  const [mobile, setMobile] = useState(false);
  const [cameraZ, setCameraZ] = useState<{ a: number; b: number }>({
    a: 10,
    b: 15,
  });

  const handleWindowSizeChange = () => {
    setMobile(window.innerWidth < 500);
    if (window.innerWidth < 500) {
      setCameraZ({ a: 25, b: 30 });
    } else {
      setCameraZ({ a: 10, b: 15 });
    }
  };
  const { scrollY, scrollYProgress } = useScroll();

  const smoothedProgress = scrollYProgress;
  const intesity1 = useTransform(smoothedProgress, [0, 0.3], [0, 0.5]);
  const intesity2 = useTransform(smoothedProgress, [0, 0.3], [0.8, 1]);
  const Y = useTransform(smoothedProgress, [0, 1], [0, 15]);
  const rotation2 = useTransform(smoothedProgress, [0, 1], [0, Math.PI * 5]);
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (
      (scrollY.get() > 100 && scrollY.get() < 300) ||
      (scrollY.get() >= 100 && latest <= 0.85)
    ) {
      gsap.to(cameraRef.current?.position, {
        z: cameraZ.b,
        duration: 3,
      });
    } else if (scrollY.get() < 100) {
      //latest > 0.85
      gsap.to(cameraRef.current?.position, {
        z: cameraZ.a,
        duration: 3,
      });
    }
  });
  useMotionValueEvent(rotation2, 'change', (latest) => {
    earth.current?.rotation.set(0, latest, 0);
  });
  useMotionValueEvent(intesity1, 'change', (latest) => {
    if (ambientRef.current) ambientRef.current.intensity = latest;
  });
  useMotionValueEvent(intesity2, 'change', (latest) => {
    if (directionalLightRef.current)
      directionalLightRef.current.intensity = latest;
  });
  useMotionValueEvent(Y, 'change', (latest) => {
    if (imageGroup1.current)
      imageGroup1.current.position.set(-3, latest * 2.9, 3);
    if (imageGroup2.current)
      imageGroup2.current.position.set(3, -latest * 2.9, 3);
  });
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);
  return (
    <div className='relative h-[1200vh] w-full overflow-visible'>
      <Canvas
        style={{ opacity: 1 }}
        gl={{ antialias: true }}
        className='!fixed !top-1/2 -z-10  h-full max-h-screen w-full -translate-y-1/2 touch-none'
        camera={{ position: [0, 0, 11] }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
      >
        {/* <Perf /> */}
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={[0, 0, cameraZ.a]}
          near={0.1}
          far={50}
        />
        {/* <Lights /> */}
        <ambientLight ref={ambientRef} intensity={0} color={'white'} />
        <directionalLight
          ref={directionalLightRef}
          position={[3, 3, 5]}
          intensity={0.8}
          color={0xffe3d1}
        />

        {false && (
          <EffectComposer multisampling={2}>
            <Bloom
              intensity={2}
              luminanceThreshold={0}
              luminanceSmoothing={0}
              // height={300}
            ></Bloom>
          </EffectComposer>
        )}
        <Suspense fallback={<Loader2 Total={14} />}>
          {/* <Loader2 Total={5} /> */}
          <group ref={earth}>
            <Earth />
          </group>
          <group ref={imageGroup1} position={[-3, 0, 3]}>
            {Images1.map((i, index) => {
              return (
                <Frame
                  motionValue={scrollY}
                  key={index}
                  url={i}
                  position={[0, -index * 7, 0]}
                />
              );
            })}
          </group>

          <group ref={imageGroup2} position={[3, 0, 3]}>
            {Images2.map((i, index) => {
              return (
                <Frame
                  motionValue={scrollY}
                  key={index}
                  url={i}
                  position={[0, index * 7, 0]}
                />
              );
            })}
          </group>
        </Suspense>
      </Canvas>
      <motion.div
        animate={{ opacity: 0.41 }}
        transition={{ type: 'spring', stiffness: 200, damping: 70, delay: 1.3 }}
        initial={{ opacity: 0 }}
        className='fixed left-1/2 top-1/2 -z-50 aspect-video w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/100 antialiased opacity-40 blur-3xl'
      >
        Frame
      </motion.div>
    </div>
  );
}

const EffectS = () => {
  return (
    <>
      {true ? (
        <EffectComposer multisampling={2}>
          <Bloom
            intensity={2}
            luminanceThreshold={0}
            luminanceSmoothing={0}
            // height={300}
          ></Bloom>
        </EffectComposer>
      ) : (
        <></>
      )}
    </>
  );
};

type propsFrame = JSX.IntrinsicElements['group'] & {
  url: StaticImageData;
  c?: any;
  motionValue: MotionValue<number>;
};
const Frame = ({
  motionValue,
  url,
  c = new THREE.Color(),
  ...props
}: propsFrame) => {
  const frame = useRef<Group>(null);
  const frameMesh = useRef<THREE.Mesh>(null);
  const frameImage = useRef<THREE.Mesh>(null);
  useEffect(() => {
    if (frame.current) frame.current.scale.set(1, 1, 1);
    if (frameMesh.current)
      (frameMesh.current.material as THREE.MeshStandardMaterial).opacity = 0;
    if (frameImage.current)
      (frameImage.current.material as THREE.MeshStandardMaterial).opacity = 0;
  }, []);
  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (
      ((scrollY.get() >= 0 && scrollY.get() < 400) || latest >= 0.7) &&
      frame.current &&
      frameMesh.current &&
      frameImage.current
    ) {
      gsap.to(frameMesh.current.material as THREE.MeshStandardMaterial, {
        opacity: 0,
        duration: 1,
      });
      gsap.to(frameImage.current.material as THREE.MeshStandardMaterial, {
        opacity: 0,
        duration: 1,
      });
    } else if (
      ((scrollY.get() >= 400 && scrollY.get() < 600) || latest < 0.7) &&
      frame.current &&
      frameMesh.current &&
      frameImage.current
    ) {
      gsap.to(frameMesh.current.material as THREE.MeshStandardMaterial, {
        opacity: 1,
        duration: 1,
      });
      gsap.to(frameImage.current.material as THREE.MeshStandardMaterial, {
        opacity: 1,
        duration: 1,
      });
    }
  });
  const ar = calculateAspectRatioString(url.width, url.height);
  return (
    <group ref={frame} {...props}>
      <Float floatIntensity={0}>
        <mesh ref={frameMesh} position={[0, 0, 3]}>
          <boxGeometry args={[ar.a * 4 + 0.1, ar.b * 4 + 0.1, 0.05]} />
          {/* 2.5, 4, 0.2 */}
          <meshStandardMaterial
            transparent
            opacity={0}
            color='gray'
            metalness={0.5}
            roughness={0.2}
            envMapIntensity={2}
          />

          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <ThreeImage
            raycast={() => null}
            ref={frameImage}
            scale={[ar.a * 4, ar.b * 4]}
            zoom={1}
            opacity={0}
            transparent={true}
            position={[0, 0, 0.051]}
            url={url.src}
          />
        </mesh>
      </Float>
    </group>
  );
};

function calculateAspectRatioString(width: number, height: number) {
  const ratio: number = height / width;
  return { a: 1, b: ratio };
}
