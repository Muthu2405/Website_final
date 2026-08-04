'use client';

import { Canvas } from '@react-three/fiber';
import { ThreeScene, ThreeSceneProps } from '@/components/three';

export function ThreeSceneWrapper(props: ThreeSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 3.5], fov: 50 }}
      gl={{ preserveDrawingBuffer: true, alpha: true, antialias: true }}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    >
      <ThreeScene {...props} />
    </Canvas>
  );
}