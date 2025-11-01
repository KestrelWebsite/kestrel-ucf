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
  Cpu,
  Map,
  Wrench,
  Box,
  Monitor,
  Globe,
} from "lucide-react";

// ✅ Floating drone with cinematic side movement
function FloatingDrone({ scrollYProgress }: { scrollYProgress: any }) {
  const { scene } = useGLTF("/InteractiveKesterelView.glb");
  const ref = useRef<THREE.Group>(null);

  // --- Rotations (unchanged) ---
  const rotationY = useTransform(scrollYProgress, [0, 0.5, 1], [0, Math.PI * 2, Math.PI]);
  const rotationX = useTransform(scrollYProgress, [0.5, 0.8, 1], [0, Math.PI / 2, 0]);
  const rotationZ = useTransform(scrollYProgress, [0, 1], [0, 0]);

  // --- Smart zoom (unchanged) ---
  const baseZoom = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [8, 13, 9, 10]);
  const zoomAdjust = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0.7, 0, 0.7, 0]);
  const zoom = useTransform([baseZoom, zoomAdjust], ([b, a]) => (b as number) + (a as number));

  // --- Vertical position (unchanged) ---
  const verticalShift = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [-1.7, -0.9, -0.5, -1.3]);

  // --- Horizontal motion ---
  // Left drift for "Innovation Through Teamwork" (0.45–0.55)
  // Then smooth right drift for "Our Teams" (0.55–0.7)
  const horizontalShift = useTransform(
    scrollYProgress,
    [0, 0.25, 0.45, 0.55, 0.7, 0.85, 1],
    [0, 3.5, -3.8, -3.8, 1, 3.2, 0] // right drift added for "Our Teams"
  );

  useFrame((state) => {
    const g = ref.current;
    if (g) {
      const scale = 0.27 + 0.01 * Math.cos(scrollYProgress.get() * Math.PI * 2);
      g.scale.set(scale, scale, scale);
      g.rotation.set(rotationX.get(), rotationY.get(), rotationZ.get());
      g.position.set(horizontalShift.get(), verticalShift.get(), 0);
    }
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
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-5xl md:text-6xl font-bold text-center"
          >
            Kestrel UCF
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 0.5 }}
            className="text-gray-300 text-lg mt-4 max-w-xl text-center"
          >
            Scroll to reveal more.
          </motion.p>
        </section>

        {/* Section 1: Drone moves right, text on left */}
        <section id="about" className="h-screen flex items-center justify-start px-20">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-lg text-left"
          >
            <h2 className="text-4xl font-semibold mb-6">A Student-Built Drone System</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Kestrel is an autonomous videography drone initiative developed by
              student teams within several student ran clubs at UCF. Kestrel&apos;s
              focus is on pushing the boundaries of aerial robotics while integrating
              the intelligence of modern day computing systems. The project combines
              expertise from both hardware and software disciplines to design, build,
              and program drones capable of intelligent flight. Whether it&apos;s
              object detection, pathfinding, or dynamic control, Kestrel aims to
              provide a comprehensive platform for learning, research, and innovation
              in autonomous systems.
            </p>
          </motion.div>
        </section>

        {/* Section 2: Drone moves left, text on right */}
        <section className="h-screen flex items-center justify-end px-20">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-lg text-right"
          >
            <h2 className="text-4xl font-semibold mb-6">Innovation Through Teamwork</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Each Kestrel subteam focuses on specialized goals—hardware engineering,
              embedded systems, autonomous pathing, simulation, and web visualization.
              Together, they bring life to a drone that embodies both creativity and
              precision, demonstrating the power of collaborative learning.
            </p>
          </motion.div>
        </section>

        {/* ✅ Contributors (moved here) */}
        <section id="contributors">
          <Contributors />
        </section>

        {/* Teams */}
        <section id="teams" className="relative w-full py-20 bg-transparent">
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
                    <Icon className="w-12 h-12 mb-4 text-gray-300 group-hover:text-blue-400 transition" />
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
                    <Icon className="w-12 h-12 mb-4 text-gray-300 group-hover:text-blue-400 transition" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
                      {team.name}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Journey */}
        <section id="journey" className="h-screen flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="text-4xl font-semibold mb-6">Explore Our Journey</h2>
            <p className="text-lg text-gray-300 mb-4">
              Learn about our development process, challenges, and achievements...
            </p>
            <div className="space-x-6 mt-4">
              <a href="/devlogs" className="underline text-white hover:text-gray-300">Read Devlogs</a>
              <a href="/teams" className="underline text-white hover:text-gray-300">Meet the Teams</a>
            </div>
          </motion.div>
        </section>

                        {/* ✅ Futuristic Transparent Footer */}
<footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-xl text-gray-300 py-10 overflow-hidden">
  {/* Animated Glow Background */}
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-radial from-blue-500/30 via-transparent to-transparent blur-3xl animate-pulse-slow" />
    <div className="absolute -bottom-20 left-1/2 w-[600px] h-[400px] -translate-x-1/2 bg-blue-400/10 rounded-full blur-[160px]" />
  </div>

  {/* --- Grid Columns --- */}
  <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
    {/* Column 1 */}
    <div>
  <h4 className="text-white font-semibold mb-4">About</h4>
  <ul className="space-y-2 text-sm">
    <li>
      <a href="/#about" className="hover:text-white">
        About Project
      </a>
    </li>
    <li>
      <a href="/#contributors" className="hover:text-white">
        Contributors
      </a>
    </li>
    <li>
      <a href="/#teams" className="hover:text-white">
        Teams
      </a>
    </li>
    <li>
      <a href="/#journey" className="hover:text-white">
        More
      </a>
    </li>
  </ul>
</div>


    {/* Column 2 */}
    <div>
  <h4 className="text-white font-semibold mb-4">Teams</h4>
  <ul className="space-y-2 text-sm">
    <li><a href="/teams/hardware" className="hover:text-white">Hardware</a></li>
    <li><a href="/teams/embedded" className="hover:text-white">Embedded</a></li>
    <li><a href="/teams/simulation" className="hover:text-white">Simulation</a></li>
    <li><a href="/teams/pathing" className="hover:text-white">Pathing</a></li>
    <li><a href="/teams/model" className="hover:text-white">Modeling</a></li>
    <li><a href="/teams/website" className="hover:text-white">Website</a></li>
    <li><a href="/teams/aerostructures" className="hover:text-white">Aerostructures</a></li>
  </ul>
</div>


    {/* Column 3 */}
    <div>
  <h4 className="text-white font-semibold mb-4">Media</h4>
  <ul className="space-y-2 text-sm">
    <li>
      <a
        href="https://www.youtube.com/@ProjectKestrel"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white"
      >
        YouTube
      </a>
    </li>
    <li>
      <a
        href="https://github.com/Autonomous-droneProject/Kestrel"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white"
      >
        GitHub
      </a>
    </li>
  </ul>
</div>


    {/* Column 4 */}
    <div>
  <h4 className="text-white font-semibold mb-4">Resources</h4>
  <ul className="space-y-2 text-sm">
    <li>
      <a href="/devlogs" className="hover:text-white">
        Devlogs
      </a>
    </li>
    <li>
      <a
        href="mailto:teamlead@example.com"
        className="hover:text-white"
      >
        Contact
      </a>
    </li>
  </ul>
</div>

  </div>

  {/* Credits */}
  <p className="text-center text-gray-500 text-sm mt-10 relative z-10">
    Developed by students at the University of Central Florida — In collaboration with Blue Origin and affiliated UCF clubs. <br />
    © 2025 Kestrel UCF. All rights reserved.
  </p>
</footer>



      </div>
    </main>
  );
}
