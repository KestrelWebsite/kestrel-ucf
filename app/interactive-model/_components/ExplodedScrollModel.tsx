'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useScroll, ScrollControls } from '@react-three/drei';
useGLTF.preload('/models/KestrelExp.glb');

function ExplodedModel() {
  const { scene } = useGLTF('/models/KestrelExp.glb');

  const modelRef = useRef<any>(null); 

  const scroll = useScroll();

  useFrame(() => {
    const progress = scroll.offset;
    if (modelRef.current) {
      modelRef.current.position.z = -progress * 2; // Example: slide it in
      modelRef.current.rotation.y = progress * Math.PI * 2;
    }
  });

  return <primitive object={scene} ref={modelRef} scale={5} />;
}

export default function ExplodedScrollModel() {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 5]} />
        <ScrollControls pages={2}>
          <ExplodedModel />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
