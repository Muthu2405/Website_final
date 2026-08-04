'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface HolographicPlatformProps {
  position?: [number, number, number];
  ref?: React.RefObject<THREE.Group>;
}

export function HolographicPlatform({ position = [0, 0, 0], ref }: HolographicPlatformProps) {
  const groupRef = useRef<THREE.Group>(null);
  const platformRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh[]>([]);
  const scanLineRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (ref) ref.current = groupRef.current!;
  }, [ref]);

  const geometry = useMemo(() => new THREE.CylinderGeometry(2.2, 2.5, 0.15, 64), []);
  const ringGeometry = useMemo(() => new THREE.RingGeometry(2.3, 2.5, 64), []);
  const scanGeometry = useMemo(() => new THREE.RingGeometry(2.2, 2.5, 64, 1, 0, Math.PI * 2), []);

  const platformMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#00ffff',
    transparent: true,
    opacity: 0.15,
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0,
    transmission: 0.3,
    thickness: 0.5,
    ior: 1.5,
    side: THREE.DoubleSide,
  }), []);

  const ringMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#00ffff',
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  }), []);

  const scanMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (platformRef.current) {
      platformRef.current.material.opacity = 0.15 + Math.sin(time * 2) * 0.05;
      const hue = (Math.sin(time * 0.3) * 0.1 + 0.5);
      platformRef.current.material.color.setHSL(hue, 1, 0.5);
    }

    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.x = -Math.PI / 2;
        ring.scale.setScalar(1 + Math.sin(time * 1.5 + i) * 0.1);
        ring.material.opacity = 0.2 + Math.sin(time * 2 + i) * 0.1;
      }
    });

    if (scanLineRef.current) {
      const progress = (time * 0.5) % 1;
      scanLineRef.current.material.opacity = Math.sin(progress * Math.PI) * 0.4;
      scanLineRef.current.rotation.x = -Math.PI / 2;
      scanLineRef.current.rotation.z = time * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={platformRef} geometry={geometry} material={platformMaterial} receiveShadow />
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => { ringsRef.current[i] = el!; }}
          geometry={ringGeometry}
          material={ringMaterial}
          position={[0, 0.02 + i * 0.01, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      ))}
      <mesh
        ref={scanLineRef}
        geometry={scanGeometry}
        material={scanMaterial}
        position={[0, 0.08, 0]}
      />
      <mesh
        geometry={new THREE.CircleGeometry(2.5, 64)}
        material={new THREE.MeshBasicMaterial({
          color: '#00ffff',
          transparent: true,
          opacity: 0.05,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
        })}
        position={[0, -0.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}