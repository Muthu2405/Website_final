'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface AvatarModelProps {
  position?: [number, number, number];
  scale?: number;
  onLoad?: () => void;
  castShadow?: boolean;
  receiveShadow?: boolean;
  ref?: React.RefObject<THREE.Group>;
}

export function AvatarModel({
  position = [0, 0, 0],
  scale = 1,
  onLoad,
  castShadow = true,
  receiveShadow = true,
  ref,
}: AvatarModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref) ref.current = groupRef.current!;
  }, [ref]);

  const geometries = useMemo(() => ({
    head: new THREE.SphereGeometry(0.35, 32, 32),
    body: new THREE.CapsuleGeometry(0.25, 0.6, 8, 16),
    eye: new THREE.SphereGeometry(0.06, 16, 16),
    pupil: new THREE.SphereGeometry(0.03, 12, 12),
    eyelid: new THREE.SphereGeometry(0.065, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2),
    hair: new THREE.SphereGeometry(0.37, 32, 16, 0, Math.PI * 2, 0, Math.PI / 1.5),
    ear: new THREE.SphereGeometry(0.08, 16, 16),
  }), []);

  const materials = useMemo(() => ({
    skin: new THREE.MeshPhysicalMaterial({
      color: '#f5d0b8',
      metalness: 0,
      roughness: 0.4,
      clearcoat: 0.2,
      clearcoatRoughness: 0.1,
      subsurfaceColor: '#ff9966',
      thickness: 0.5,
    }),
    hair: new THREE.MeshPhysicalMaterial({
      color: '#2a2a2a',
      metalness: 0.1,
      roughness: 0.3,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2,
    }),
    eyeWhite: new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      metalness: 0,
      roughness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0,
    }),
    pupil: new THREE.MeshBasicMaterial({
      color: '#1a1a2e',
    }),
    eyelid: new THREE.MeshPhysicalMaterial({
      color: '#f5d0b8',
      metalness: 0,
      roughness: 0.4,
      clearcoat: 0.2,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
    }),
    clothing: new THREE.MeshPhysicalMaterial({
      color: '#0a0a2e',
      metalness: 0.1,
      roughness: 0.5,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
    }),
  }), []);

  useEffect(() => {
    const group = new THREE.Group();
    group.position.set(...position);
    group.scale.setScalar(scale);

    const body = new THREE.Mesh(geometries.body, materials.clothing);
    body.position.y = -0.6;
    body.rotation.x = Math.PI / 2;
    body.castShadow = castShadow;
    body.receiveShadow = receiveShadow;
    bodyRef.current = body;
    group.add(body);

    const head = new THREE.Mesh(geometries.head, materials.skin);
    head.position.y = 0.15;
    head.castShadow = castShadow;
    head.receiveShadow = receiveShadow;
    headRef.current = head;
    group.add(head);

    const hair = new THREE.Mesh(geometries.hair, materials.hair);
    hair.position.y = 0.15;
    hair.castShadow = castShadow;
    group.add(hair);

    const leftEye = new THREE.Group();
    leftEye.position.set(-0.1, 0.2, 0.32);
    const leftEyeWhite = new THREE.Mesh(geometries.eye, materials.eyeWhite);
    leftEyeWhite.castShadow = castShadow;
    leftEye.add(leftEyeWhite);
    const leftPupil = new THREE.Mesh(geometries.pupil, materials.pupil);
    leftPupil.position.z = 0.055;
    leftPupil.scale.set(1, 1, 0.1);
    leftEye.add(leftPupil);
    const leftEyelid = new THREE.Mesh(geometries.eyelid, materials.eyelid);
    leftEyelid.position.z = 0.01;
    leftEyelid.userData = { baseRotation: leftEyelid.rotation.x, isBlinking: false };
    leftEye.add(leftEyelid);
    leftEyeRef.current = leftEye;
    group.add(leftEye);

    const rightEye = new THREE.Group();
    rightEye.position.set(0.1, 0.2, 0.32);
    const rightEyeWhite = new THREE.Mesh(geometries.eye, materials.eyeWhite);
    rightEyeWhite.castShadow = castShadow;
    rightEye.add(rightEyeWhite);
    const rightPupil = new THREE.Mesh(geometries.pupil, materials.pupil);
    rightPupil.position.z = 0.055;
    rightPupil.scale.set(1, 1, 0.1);
    rightEye.add(rightPupil);
    const rightEyelid = new THREE.Mesh(geometries.eyelid, materials.eyelid);
    rightEyelid.position.z = 0.01;
    rightEyelid.userData = { baseRotation: rightEyelid.rotation.x, isBlinking: false };
    rightEye.add(rightEyelid);
    rightEyeRef.current = rightEye;
    group.add(rightEye);

    const leftEar = new THREE.Mesh(geometries.ear, materials.skin);
    leftEar.position.set(-0.35, 0.1, 0);
    leftEar.scale.set(0.8, 1, 0.5);
    leftEar.castShadow = castShadow;
    group.add(leftEar);

    const rightEar = new THREE.Mesh(geometries.ear, materials.skin);
    rightEar.position.set(0.35, 0.1, 0);
    rightEar.scale.set(0.8, 1, 0.5);
    rightEar.castShadow = castShadow;
    group.add(rightEar);

    groupRef.current?.add(group);
    setLoaded(true);
    onLoad?.();

    return () => {
      groupRef.current?.remove(group);
      Object.values(geometries).forEach(g => g.dispose());
      Object.values(materials).forEach(m => m.dispose());
    };
  }, [geometries, materials, position, scale, castShadow, receiveShadow, onLoad]);

  useFrame((state) => {
    if (!loaded) return;
    const time = state.clock.getElapsedTime();

    if (headRef.current) {
      headRef.current.position.y = 0.15 + Math.sin(time * 1.2) * 0.015;
      headRef.current.rotation.y = Math.sin(time * 0.3) * 0.15;
      headRef.current.rotation.x = Math.sin(time * 0.2) * 0.05;
    }

    if (bodyRef.current) {
      bodyRef.current.position.y = -0.6 + Math.sin(time * 1.2) * 0.01;
      bodyRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
    }

    const blinkCycle = Math.sin(time * 0.5);
    const shouldBlink = blinkCycle > 0.95;

    [leftEyeRef, rightEyeRef].forEach((eyeRef) => {
      if (eyeRef.current) {
        const eyelid = eyeRef.current.children[2] as THREE.Mesh;
        if (eyelid && eyelid.userData) {
          if (shouldBlink && !eyelid.userData.isBlinking) {
            eyelid.userData.isBlinking = true;
            gsap.to(eyelid.rotation, {
              x: Math.PI / 2,
              duration: 0.08,
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.to(eyelid.rotation, {
                  x: 0,
                  duration: 0.1,
                  ease: 'power2.inOut',
                  onComplete: () => { eyelid.userData.isBlinking = false; },
                });
              },
            });
          }
        }

        const pupil = eyeRef.current.children[1] as THREE.Mesh;
        if (pupil) {
          pupil.position.x = Math.sin(time * 0.7) * 0.015;
          pupil.position.y = Math.cos(time * 0.5) * 0.01;
        }
      }
    });
  });

  if (!loaded) return null;

  return <group ref={groupRef} />;
}

import { useState } from 'react';