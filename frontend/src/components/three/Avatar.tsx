'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface AvatarProps {
  position?: [number, number, number];
  scale?: number;
  onLoad?: () => void;
  castShadow?: boolean;
  receiveShadow?: boolean;
  ref?: React.RefObject<THREE.Group>;
}

export function Avatar({
  position = [0, 0, 0],
  scale = 1,
  onLoad,
  castShadow = true,
  receiveShadow = true,
  ref,
}: AvatarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Map<string, THREE.AnimationAction>>(new Map());
  const [loaded, setLoaded] = useState(false);
  const [animationsLoaded, setAnimationsLoaded] = useState(false);

  useEffect(() => {
    if (ref) ref.current = groupRef.current!;
  }, [ref]);

  const gltf = useLoader(GLTFLoader, '/models/avatar.glb', (progress) => {
    if (progress.total > 0) {
      const percent = (progress.loaded / progress.total) * 100;
      console.log(`Avatar loading: ${percent.toFixed(0)}%`);
    }
  });

  useEffect(() => {
    if (!gltf || loaded) return;

    const model = gltf.scene.clone(true);
    model.scale.setScalar(scale);
    model.position.set(...position);

    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = castShadow;
        child.receiveShadow = receiveShadow;
        child.frustumCulled = false;

        if (child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
              mat.metalness = 0.1;
              mat.roughness = 0.4;
              mat.transparent = false;
            }
          });
        }
      }
    });

    groupRef.current?.add(model);

    if (gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(model);
      mixerRef.current = mixer;

      gltf.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        actionsRef.current.set(clip.name, action);
      });

      const idleAction = actionsRef.current.get('idle') || actionsRef.current.get('Idle') || actionsRef.current.get('breathing');
      const blinkAction = actionsRef.current.get('blink') || actionsRef.current.get('Blink');

      if (idleAction) {
        idleAction.play();
        idleAction.setLoop(THREE.LoopRepeat, Infinity);
        idleAction.clampWhenFinished = true;
      }

      if (blinkAction) {
        blinkAction.play();
        blinkAction.setLoop(THREE.LoopRepeat, Infinity);
        blinkAction.clampWhenFinished = true;
        blinkAction.timeScale = 0.5;
      }

      setAnimationsLoaded(true);
    }

    setLoaded(true);
    onLoad?.();

    return () => {
      mixerRef.current?.stopAllActions();
      groupRef.current?.remove(model);
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
    };
  }, [gltf, position, scale, castShadow, receiveShadow, onLoad, loaded]);

  useFrame((state) => {
    if (mixerRef.current && animationsLoaded) {
      mixerRef.current.update(state.clock.getDelta());
    }

    if (groupRef.current && loaded) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.15;
    }
  });

  if (!loaded) return null;

  return <group ref={groupRef} />;
}

import { useState } from 'react';