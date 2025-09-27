'use client';

import { useEffect, useRef, Suspense } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Stars } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import Contributors from "@/components/ui/Contributors";

// ✅ Lucide icons
import {
  Users,
  Cpu,
  Map,
  Wrench,
  Box,
  Monitor,
  Globe,
} from "lucide-react";

// ✅ Floating drone fixed in viewport (toned down + always visible)
function FloatingDrone({ scrollYProgress }: { scrollYProgress: any }) {
  const { scene } = useGLTF('/InteractiveKesterelView.glb');
  const ref = useRef<THREE.Group>(null);

  // --- Y Rotation ---
  const rotationY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, Math.PI * 2, Math.PI] // full spin → end backward
  );

  // --- X Rotation (top view tilt) ---
  const rotationX = useTransform(
    scrollYProgress,
    [0.5, 0.8, 1],
    [0, Math.PI / 2, 0] // tilt back to top → return upright
  );

  // --- Keep Z Rotation locked ---
  const rotationZ = useTransform(scrollYProgress, [0, 1], [0, 0]);

  // --- Smooth zoom in when showing top ---
  const zoom = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [8, 15, 9, 8]);

  // --- Vertical shift to stay centered while tilting ---
  const verticalShift = useTransform(scrollYProgress, [0.5, 0.8], [0, 0.8]); 
  // moves drone slightly UP when tilting to top

  useFrame((state) => {
    const g = ref.current;
    if (g) {
      g.scale.set(0.27, 0.27, 0.27);

      // Apply rotations
      g.rotation.set(rotationX.get(), rotationY.get(), rotationZ.get());

      // Apply vertical shift for top view centering
      g.position.y = verticalShift.get() - 1.8;
    }

    // Smooth zoom effect
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
<section className="relative w-full py-20 bg-transparent">
  <h1 className="text-4xl font-bold text-center mb-12">Our Teams</h1>

  <div className="flex justify-between items-start w-full px-6">
    {/* Left Column */}
    <div className="flex flex-col gap-10 ml-8">
      {[
        { name: "Embedded", icon: Cpu },
        { name: "Hardware", icon: Wrench },
        { name: "Website", icon: Globe },
      ].map((team, idx) => {
        const Icon = team.icon;
        return (
          <div
            key={idx}
            className="w-60 group bg-black/40 border border-white/20 backdrop-blur-lg 
                       rounded-xl shadow-lg p-6 flex flex-col items-center text-center 
                       hover:scale-105 hover:border-white/40 transition-transform"
          >
            {/* Icon */}
            <Icon className="w-12 h-12 mb-4 text-gray-300 group-hover:text-blue-400 transition" />

            {/* Name */}
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
              {team.name}
            </h3>
          </div>
        );
      })}
    </div>

    {/* Right Column */}
    <div className="flex flex-col gap-10 mr-8">
      {[
        { name: "Pathing", icon: Map },
        { name: "Model", icon: Box },
        { name: "Simulation", icon: Monitor },
      ].map((team, idx) => {
        const Icon = team.icon;
        return (
          <div
            key={idx}
            className="w-60 group bg-black/40 border border-white/20 backdrop-blur-lg 
                       rounded-xl shadow-lg p-6 flex flex-col items-center text-center 
                       hover:scale-105 hover:border-white/40 transition-transform"
          >
            {/* Icon */}
            <Icon className="w-12 h-12 mb-4 text-gray-300 group-hover:text-blue-400 transition" />

            {/* Name */}
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
              {team.name}
            </h3>
          </div>
        );
      })}
    </div>
  </div>
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
