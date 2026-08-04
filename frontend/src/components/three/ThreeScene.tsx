'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Preload, DepthOfField, ContactShadows, Html } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState, lazy } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HolographicPlatform } from './HolographicPlatform';
import { FloatingParticles } from './FloatingParticles';
import { OrbitRings } from './OrbitRings';
import { Avatar } from './Avatar';
import { CodeSymbols } from './CodeSymbols';
import { LightRays } from './LightRays';
import { SceneLoading } from './SceneLoading';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { animationConfig } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

const AvatarModel = lazy(() => import('./AvatarModel').then(m => ({ default: m.AvatarModel })));

interface ThreeSceneProps {
  onLoad: () => void;
  onProgress: (progress: number) => void;
  reducedMotion: boolean;
  scrollProgress: number;
}

export function ThreeScene({ onLoad, onProgress, reducedMotion, scrollProgress }: ThreeSceneProps) {
  const { camera, scene, gl } = useThree();
  const avatarRef = useRef<THREE.Group>(null);
  const platformRef = useRef<THREE.Group>(null);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const { mouse, setMouse } = useMouseParallax();

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;

    const resize = () => {
      gl.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [gl, camera]);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const time = state.clock.getElapsedTime();

    if (avatarRef.current) {
      avatarRef.current.rotation.y = Math.sin(time * 0.15) * 0.3;
      avatarRef.current.position.y = Math.sin(time * 1.2) * 0.02 + 0.15;
    }

    if (platformRef.current) {
      platformRef.current.rotation.y += delta * 0.05;
    }

    camera.position.x = Math.sin(time * 0.08) * 3.5;
    camera.position.z = Math.cos(time * 0.08) * 3.5;
    camera.position.y = 1.5 + Math.sin(time * 0.1) * 0.1;
    camera.lookAt(0, 0.8, 0);

    const parallaxX = mouse.x * 0.3;
    const parallaxY = mouse.y * 0.2;
    camera.position.x += parallaxX;
    camera.position.y += parallaxY;
  });

  useEffect(() => {
    if (scrollProgress > 0 && avatarRef.current) {
      gsap.to(avatarRef.current.scale, {
        x: 1 + scrollProgress * 0.1,
        y: 1 + scrollProgress * 0.1,
        z: 1 + scrollProgress * 0.1,
        duration: 1,
        ease: 'power2.out',
      });
    }
  }, [scrollProgress]);

  return (
    <>
      <color attach="background" args={['#050510']} />
      <fog attach="fog" args={['#050510', 5, 25]} />

      <group ref={avatarRef}>
        <Suspense fallback={<SceneLoading onProgress={onProgress} />}>
          <AvatarModel
            ref={avatarRef}
            onLoad={() => {
              setAvatarLoaded(true);
              onLoad();
            }}
            position={[0, 0.15, 0]}
            scale={1.2}
            castShadow
            receiveShadow
          />
        </Suspense>
      </group>

      <HolographicPlatform ref={platformRef} position={[0, -0.1, 0]} />
      <FloatingParticles count={reducedMotion ? 100 : 500} />
      <OrbitRings count={5} />
      <CodeSymbols count={reducedMotion ? 15 : 40} />
      <LightRays intensity={reducedMotion ? 0.3 : 0.8} />

      <DirectionalLight
        position={[5, 10, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.001}
      />
      <DirectionalLight position={[-5, 8, -5]} intensity={1.5} color="#61DAFB" />
      <DirectionalLight position={[5, 5, -5]} intensity={1} color="#FF4081" />
      <AmbientLight intensity={0.4} color="#1a1a2e" />
      <HemisphereLight skyColor="#0a0a2e" groundColor="#050510" intensity={0.5} />

      <ContactShadows
        position={[0, -0.15, 0]}
        opacity={0.4}
        scale={5}
        blur={2}
        color="#00ffff"
      />

      <EffectComposer multisampling={8} renderPriority={1}>
        <Bloom
          intensity={reducedMotion ? 0.3 : 0.8}
          luminanceThreshold={0.8}
          luminanceSmoothing={0.5}
          radius={0.6}
        />
        <DepthOfField
          focalDistance={3.5}
          focalLength={0.1}
          bokehScale={2}
          height={480}
        />
      </EffectComposer>
    </>
  );
}

function DirectionalLight(props: any) {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(useThree().clock.getElapsedTime() * 0.2) * 8;
      lightRef.current.position.z = Math.cos(useThree().clock.getElapsedTime() * 0.2) * 8;
    }
  });
  return <directionalLight ref={lightRef} {...props} />;
}

function AmbientLight(props: any) {
  return <ambientLight {...props} />;
}

function HemisphereLight(props: any) {
  return <hemisphereLight {...props} />;
}