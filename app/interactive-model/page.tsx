'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import ExplodedScrollModel from './_components/ExplodedScrollModel';

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

      {/* Main 3D model */}
      <ModelViewer />
    </div>
  );
}
