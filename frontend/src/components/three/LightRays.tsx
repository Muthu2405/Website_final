'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LightRaysProps {
  intensity?: number;
}

export function LightRays({ intensity = 0.8 }: LightRaysProps) {
  const raysRef = useRef<THREE.Mesh[]>([]);
  const [initialized, setInitialized] = useState(false);

  const geometry = useMemo(() => new THREE.ConeGeometry(0.1, 8, 8, 1, true), []);
  const coneGeometry = useMemo(() => new THREE.ConeGeometry(3, 6, 16, 1, true), []);

  const rayMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#00ffff',
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  const coneMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#00ffff',
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useEffect(() => {
    setInitialized(true);
    return () => setInitialized(false);
  }, []);

  useFrame((state) => {
    if (!initialized) return;
    const time = state.clock.getElapsedTime();

    raysRef.current.forEach((ray, i) => {
      if (ray) {
        ray.rotation.y = time * (0.1 + i * 0.02);
        ray.material.opacity = intensity * (0.03 + Math.sin(time * 1.5 + i * 2) * 0.02);
        ray.scale.y = 1 + Math.sin(time * 0.5 + i) * 0.1;
      }
    });
  });

  return (
    <group>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          ref={(el) => { raysRef.current[i] = el!; }}
          geometry={geometry}
          material={rayMaterial}
          position={[0, 0.5, 0]}
          rotation={[-Math.PI / 2, 0, i * Math.PI / 2]}
          scale={[0.5, 1, 0.5]}
        />
      ))}
      <mesh
        ref={(el) => { raysRef.current[4] = el!; }}
        geometry={coneGeometry}
        material={coneMaterial}
        position={[0, -0.5, 0]}
        rotation={[Math.PI, 0, 0]}
        scale={[1, 0.5, 1]}
      />
      <mesh
        geometry={new THREE.SphereGeometry(3.5, 32, 16)}
        material={new THREE.MeshBasicMaterial({
          color: '#00ffff',
          transparent: true,
          opacity: intensity * 0.01,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })}
      />
    </group>
  );
}

import { useState } from 'react';
import { group } from '@react-three/fiber';