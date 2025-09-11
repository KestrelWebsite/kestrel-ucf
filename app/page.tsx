'use client';

import { useEffect, useRef, Suspense } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Stars } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import SmoothSlider from "@/components/ui/SmoothSlider";
import Contributors from "@/components/ui/Contributors";


// ✅ Floating drone fixed in viewport (toned down + always visible)
function FloatingDrone({ scrollYProgress }: { scrollYProgress: any }) {
  const { scene } = useGLTF('/InteractiveKesterelView.glb');
  const ref = useRef<THREE.Group>(null);

  // Y rotation: full spin as you scroll
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);

  // X rotation: tilt forward (showing top) midway, then return upright
  const rotationX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],    // keyframes
    [0, -0.5, 0]    // tilt ~-30° then return to 0
  );

  // Z rotation: small wobble effect, but return to 0 at the end
  const rotationZ = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0.2, 0]
  );

  // Camera zoom: starts farther out, zooms in, then eases back
  const zoom = useTransform(scrollYProgress, [0, 1], [12, 8.5]);

  useFrame((state) => {
    const g = ref.current;
    if (g) {
      // Slight scale reduction so it always fits
      g.scale.set(0.27, 0.27, 0.27);

      // Apply rotations
      g.rotation.set(rotationX.get(), rotationY.get(), rotationZ.get());

      // Gentle bounce
      g.position.y = Math.sin(state.clock.elapsedTime) * 0.2 - 1.8;
    }

    // Smooth camera zoom
    state.camera.position.z = zoom.get();
  });

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}



export default function HomePage() {
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  const scrollContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end']
  });

  return (
    <main ref={scrollContainerRef} className="relative w-full bg-black text-white overflow-x-hidden">
      {/* ✅ Fixed drone canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{ alpha: true }}                        
          style={{ background: 'transparent' }}       
        >
          <Stars radius={100} depth={500} count={1000} factor={4} fade speed={1} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <Suspense fallback={null}>
            <FloatingDrone scrollYProgress={scrollYProgress} />
            <Environment preset="sunset" />
            <EffectComposer>
              <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
            </EffectComposer>
          </Suspense>
          <OrbitControls makeDefault target={[0, 0, 0]} enableZoom={false} enableRotate={false} />
        </Canvas>
      </div>

      {/* ✅ Content sections scroll over drone */}
      <div className="relative z-10 space-y-32">
        {/* Hero */}
        <section className="h-screen flex flex-col items-center justify-center">
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="text-5xl md:text-6xl font-bold text-center">
            Kestrel UCF
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.8, delay: 0.5 }} className="text-gray-300 text-lg mt-4 max-w-xl text-center">
            Scroll to reveal more.
          </motion.p>
        </section>

        {/* About */}
        <section className="h-screen flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className="text-center max-w-3xl">
            <h2 className="text-4xl font-semibold mb-6">A Student-Built Drone System</h2>
            <p className="text-lg text-gray-300">
              Kestrel is an autonomous videography drone initiative developed by student teams within several student ran clubs at UCF...
            </p>
          </motion.div>
        </section>

        {/* Teams */}
        <section className="w-full overflow-hidden py-12">
          <h1 className="text-4xl font-bold text-center mb-8">Our Teams</h1>
          <SmoothSlider />
        </section>

        {/* Contributors */}
        <Contributors />

        {/* Journey */}
        <section className="h-screen flex flex-col items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} viewport={{ once: true }} className="max-w-4xl">
            <h2 className="text-4xl font-semibold mb-6">Explore Our Journey</h2>
            <p className="text-lg text-gray-300 mb-4">Learn about our development process, challenges, and achievements...</p>
            <div className="space-x-6 mt-4">
              <a href="/devlogs" className="underline text-white hover:text-gray-300">Read Devlogs</a>
              <a href="/teams" className="underline text-white hover:text-gray-300">Meet the Teams</a>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="h-32 flex items-center justify-center border-t border-gray-700 text-gray-400">
          © 2025 Kestrel UCF. Built by students with passion.
        </footer>
      </div>
    </main>
  );
}
