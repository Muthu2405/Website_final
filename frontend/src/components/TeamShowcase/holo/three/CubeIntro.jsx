import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Cube({ unfolding }) {
  const wire = useRef(null);
  const glass = useRef(null);
  const inner = useRef(null);

  useFrame((state, delta) => {
    if (!wire.current || !inner.current || !glass.current) return;
    const spin = unfolding ? 1.4 : 0.5;
    wire.current.rotation.y += delta * spin;
    wire.current.rotation.x += delta * 0.25;
    glass.current.rotation.copy(wire.current.rotation);

    const targetScale = unfolding ? 3.2 : 1;
    wire.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.06);
    glass.current.scale.copy(wire.current.scale);

    const targetOpacity = unfolding ? 0 : 0.9;
    const wireMat = wire.current.material;
    wireMat.opacity = THREE.MathUtils.lerp(wireMat.opacity, targetOpacity, 0.08);
    const glassMat = glass.current.material;
    glassMat.opacity = THREE.MathUtils.lerp(glassMat.opacity, unfolding ? 0 : 0.5, 0.08);

    inner.current.rotation.y -= delta * 0.8;
    const innerMat = inner.current.material;
    innerMat.opacity = THREE.MathUtils.lerp(innerMat.opacity, unfolding ? 0 : 1, 0.08);
  });

  return (
    <group>
      {/* Glass shell — refractive body of the cube, matches the reference's crystalline look */}
      <mesh ref={glass}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color="#bae6fd"
          transmission={0.92}
          thickness={0.8}
          roughness={0.08}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
      {/* Wireframe edges on top for definition */}
      <mesh ref={wire}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color="#7dd3fc"
          wireframe
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Glowing core */}
      <mesh ref={inner} scale={0.4}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial color="#e0f2fe" transparent opacity={0} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight position={[2, 2, 2]} intensity={20} color="#818cf8" />
      <pointLight position={[0, 0, 0]} intensity={15} color="#ffffff" distance={2} />
    </group>
  );
}

export default function CubeIntro({ unfolding }) {
  return (
    <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }} gl={{ alpha: true }} aria-hidden="true">
      <ambientLight intensity={0.3} />
      <Cube unfolding={unfolding} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={1.6} luminanceThreshold={0.1} luminanceSmoothing={0.4} mipmapBlur radius={0.8} />
      </EffectComposer>
    </Canvas>
  );
}
