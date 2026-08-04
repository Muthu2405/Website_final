'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from 'troika-three-text';

const CODE_SYMBOLS = [
  '{ }', '[ ]', '( )', '< >', '=>', '...', '??', '?.',
  'const', 'let', 'fn', 'async', 'await', 'return',
  'if', 'else', 'for', 'while', 'map', 'filter',
  'reduce', 'Promise', 'typeof', 'interface', 'type',
];

interface CodeSymbolsProps {
  count?: number;
}

export function CodeSymbols({ count = 40 }: CodeSymbolsProps) {
  const symbolsRef = useRef<THREE.Group[]>([]);
  const [initialized, setInitialized] = useState(false);

  const createSymbol = useMemo(() => {
    const symbol = CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)];
    return new Text();
  }, []);

  const symbolObjects = useMemo(() => {
    const objects: { mesh: THREE.Object3D; config: any }[] = [];
    for (let i = 0; i < count; i++) {
      const text = new Text();
      text.text = CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)];
      text.fontSize = 0.08 + Math.random() * 0.06;
      text.color = new THREE.Color().setHSL(0.5 + Math.random() * 0.3, 1, 0.6);
      text.anchorX = 'center';
      text.anchorY = 'middle';
      text.maxWidth = 0.5;
      text.sync();

      const radius = 2.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const config = {
        radius,
        theta,
        phi,
        speed: 0.1 + Math.random() * 0.2,
        verticalSpeed: 0.05 + Math.random() * 0.1,
        phase: Math.random() * Math.PI * 2,
        originalColor: text.color.clone(),
      };

      objects.push({ mesh: text, config });
    }
    return objects;
  }, [count]);

  useEffect(() => {
    symbolObjects.forEach((obj, i) => {
      symbolsRef.current[i] = new THREE.Group();
      symbolsRef.current[i]!.add(obj.mesh);
    });
    setInitialized(true);
    return () => setInitialized(false);
  }, [symbolObjects]);

  useFrame((state) => {
    if (!initialized) return;
    const time = state.clock.getElapsedTime();

    symbolObjects.forEach((obj, i) => {
      const group = symbolsRef.current[i];
      if (!group) return;

      const { radius, theta, phi, speed, verticalSpeed, phase, originalColor } = obj.config;

      const x = radius * Math.sin(phi + time * verticalSpeed) * Math.cos(theta + time * speed);
      const y = radius * Math.sin(phi + time * verticalSpeed) * Math.sin(theta + time * speed) + Math.sin(time * 0.5 + phase) * 0.3;
      const z = radius * Math.cos(phi + time * verticalSpeed);

      group.position.set(x, y, z);
      group.lookAt(0, 0, 0);
      group.rotateY(Math.PI);

      const opacity = 0.3 + Math.sin(time * 2 + phase) * 0.3;
      const material = (obj.mesh as any).material;
      if (material) {
        material.color?.setRGB(originalColor.r, originalColor.g, originalColor.b);
        material.opacity = opacity;
        material.transparent = true;
        material.blending = THREE.AdditiveBlending;
        material.depthWrite = false;
      }
      obj.mesh.sync();
    });
  });

  return (
    <group>
      {symbolsRef.current.map((group, i) => (
        group ? <primitive key={i} object={group} /> : null
      ))}
    </group>
  );
}

import { useState } from 'react';
import { primitive } from '@react-three/fiber';