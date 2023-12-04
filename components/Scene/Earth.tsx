'use client';
import { RootState, useAppSelector } from '@/utils/Providers/store/store';
import { Html, useTexture } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import React, { Children, useEffect, useRef, useState } from 'react';
import {
  Color,
  Euler,
  Group,
  Matrix4,
  Mesh,
  TextureLoader,
  Vector3,
} from 'three';
type Props = {};
const sphereRadius = 0.25 * 15;
const sphereOuterRadius = 0.262 * 15;
export default function Earth({}: Props) {
  const percentage = useAppSelector(
    (state: RootState) => state.load.percentage
  );
  const [diffuse, diffuse_Night, bump, specular, clouds] = useLoader(
    TextureLoader,
    [
      '/Images/textures/Color with bump_4k.jpg',
      '/Images/textures/Night 4k.jpg',
      '/Images/textures/bump_map_4k.jpg',
      '/Images/textures/water_mask_8k.png',
      '/Images/textures/fair_clouds_2k.png',
    ]
  );
  const earth = useRef<Group>(null);
  const earth2 = useRef<Mesh>(null);
  const ref = useRef<Mesh>(null);
  useEffect(() => {
    if (earth.current && percentage >= 100) {
      gsap.to(earth.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 2.5,
        ease: 'expo.out',
      });
      gsap.to(earth.current.rotation, {
        y: earth.current.rotation.y + Math.PI * 2,
        duration: 2.5,
        ease: 'expo.out',
      });
    }
  }, [percentage]);

  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += 0.002 / 20;
    if (earth.current) earth.current.rotation.y += 0.002 / 10;
  });
  return (
    <group
      scale={[0, 0, 0]}
      rotation={[0, Math.PI / 2, 0]}
      ref={earth}
      dispose={null}
    >
      <mesh ref={earth2}>
        <sphereGeometry args={[sphereRadius, 32, 32]} />
        <meshPhongMaterial
          map={diffuse}
          bumpMap={bump}
          specularMap={specular}
          bumpScale={0.05}
          specular={new Color('grey')}
        />
      </mesh>
      <mesh ref={ref}>
        <sphereGeometry args={[sphereOuterRadius, 32, 32]} />
        <meshPhongMaterial map={clouds} transparent opacity={1} />
      </mesh>
    </group>
  );
}
