'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbitRingsProps {
  count?: number;
}

export function OrbitRings({ count = 5 }: OrbitRingsProps) {
  const ringsRef = useRef<THREE.Mesh[]>([]);
  const [initialized, setInitialized] = useState(false);

  const geometries = useMemo(() => {
    const geos: THREE.RingGeometry[] = [];
    for (let i = 0; i < count; i++) {
      const innerRadius = 2.8 + i * 0.6;
      const outerRadius = innerRadius + 0.08;
      geos.push(new THREE.RingGeometry(innerRadius, outerRadius, 128));
    }
    return geos;
  }, [count]);

  const materials = useMemo(() => {
    const mats: THREE.MeshBasicMaterial[] = [];
    const colors = ['#00ffff', '#ff4081', '#61dafb', '#06b6d4', '#a78bfa'];
    for (let i = 0; i < count; i++) {
      mats.push(new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }));
    }
    return mats;
  }, [count]);

  useEffect(() => {
    setInitialized(true);
    return () => setInitialized(false);
  }, []);

  useFrame((state) => {
    if (!initialized) return;
    const time = state.clock.getElapsedTime();

    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.x = Math.sin(time * 0.1 + i) * 0.3;
        ring.rotation.y = time * (0.05 + i * 0.01);
        ring.rotation.z = Math.cos(time * 0.08 + i) * 0.2;

        ring.material.opacity = 0.1 + Math.sin(time * 1.5 + i) * 0.05;

        const scale = 1 + Math.sin(time * 0.5 + i * 1.5) * 0.05;
        ring.scale.setScalar(scale);
      }
    });
  });

  return (
    <group>
      {geometries.map((geometry, i) => (
        <mesh
          key={i}
          ref={(el) => { ringsRef.current[i] = el!; }}
          geometry={geometry}
          material={materials[i]}
        />
      ))}
    </group>
  );
}

import { useState } from 'react';
import { group } from '@react-three/fiber';