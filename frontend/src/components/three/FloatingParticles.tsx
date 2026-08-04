'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface FloatingParticlesProps {
  count?: number;
  size?: number;
}

export function FloatingParticles({ count = 500, size = 0.02 }: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<THREE.Vector3[]>([]);
  const originalPositionsRef = useRef<THREE.Vector3[]>([]);
  const [initialized, setInitialized] = useState(false);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 1.5 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositionsRef.current[i] = new THREE.Vector3(x, y, z);

      const hue = 0.5 + Math.random() * 0.3;
      const color = new THREE.Color().setHSL(hue, 1, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = size * (0.5 + Math.random() * 1.5);
      alphas[i] = 0.3 + Math.random() * 0.7;
      phases[i] = Math.random() * Math.PI * 2;

      velocitiesRef.current[i] = new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002
      );
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
    geo.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

    return geo;
  }, [count, size]);

  const material = useMemo(() => new THREE.PointsMaterial({
    size: size,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  }), [size]);

  useEffect(() => {
    setInitialized(true);
    return () => setInitialized(false);
  }, []);

  useFrame((state) => {
    if (!initialized || !pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const alphas = pointsRef.current.geometry.attributes.alpha.array as Float32Array;
    const phases = pointsRef.current.geometry.attributes.phase.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const originalPos = originalPositionsRef.current[i];
      const velocity = velocitiesRef.current[i];
      const phase = phases[i];

      positions[i * 3] = originalPos.x + Math.sin(time * 0.5 + phase) * 0.1;
      positions[i * 3 + 1] = originalPos.y + Math.cos(time * 0.3 + phase) * 0.15 + Math.sin(time * 0.1 + phase) * 0.05;
      positions[i * 3 + 2] = originalPos.z + Math.sin(time * 0.4 + phase) * 0.1;

      alphas[i] = 0.3 + Math.sin(time * 2 + phase) * 0.3;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.alpha.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0001;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

import { useState } from 'react';