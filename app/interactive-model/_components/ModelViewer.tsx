'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/models/InteractiveKesterelView.glb'); // simpler!
  return <primitive object={scene} scale={1.5} />;
}

// Optional: If you want to preload the model for faster loading
useGLTF.preload('/models/InteractiveKesterelView.glb');

const ModelViewer = () => {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Model />
          </Stage>
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
