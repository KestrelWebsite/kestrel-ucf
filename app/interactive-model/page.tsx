'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import ExplodedScrollModel from './_components/ExplodedScrollModel';

// Dynamically import ModelViewer to avoid SSR issues
const ModelViewer = dynamic(() => import('./_components/ModelViewer'), {
  ssr: false,
  loading: () => (
    <div className="text-white text-center pt-20 text-xl">
      Loading 3D model...
    </div>
  ),
});

export default function InteractiveModelPage() {
  return (
    <div className="flex flex-col gap-10 bg-black text-white">
      {/* Exploded view at top */}
      <ExplodedScrollModel />

      {/* Header between models */}
      <div className="text-center text-4xl font-bold py-10">
        🚀 Kestrel Interactive 3D Model
      </div>

      {/* Main 3D model */}
      <ModelViewer />
    </div>
  );
}
