'use client';

import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SceneLoadingProps {
  onProgress: (progress: number) => void;
}

export function SceneLoading({ onProgress }: SceneLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 5;
        if (next >= 100) {
          clearInterval(interval);
          setVisible(false);
          onProgress(100);
          return 100;
        }
        onProgress(next);
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onProgress]);

  useFrame(() => {});

  return (
    <Html
      fullscreen
      transform
      sprites
      distanceFactor={10}
      zIndexRange={[100, 100]}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-[#050510] z-50"
        style={{ pointerEvents: 'none' }}
      >
        <div className="text-center">
          <motion.div
            className="w-24 h-24 mx-auto mb-6 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <svg className="w-full h-full text-[#00ffff]" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="180 100"
                strokeLinecap="round"
                className="animate-spin"
              />
            </svg>
          </motion.div>
          <motion.div
            className="text-[#00ffff] font-mono text-lg mb-2"
            animate={{ textContent: [0, progress] }}
          >
            {Math.floor(progress)}%
          </motion.div>
          <motion.div
            className="w-48 h-1 bg-gray-800 rounded-full mx-auto mt-4 overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#00ffff] to-[#ff4081] rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </motion.div>
          <p className="text-gray-500 text-sm mt-4">Loading cinematic experience...</p>
        </div>
      </motion.div>
    </Html>
  );
}