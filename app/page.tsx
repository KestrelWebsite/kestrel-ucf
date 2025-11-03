'use client';

import { useEffect, useRef, Suspense } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import Contributors from '@/components/ui/Contributors';
import { Cpu, Map, Wrench, Box, Monitor, Globe } from 'lucide-react';
import Link from "next/link";
/* ----------------------------- Drone Component ---------------------------- */

function FloatingDrone({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const { scene } = useGLTF('/models/InteractiveBKestrelView_optimized.glb');
  const ref = useRef<THREE.Group>(null);

  
  const rotY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.45, 0.55, 0.65, 0.72, 0.8, 1],
    [0, Math.PI * 1.2, Math.PI * 1.4, Math.PI * 1.8, Math.PI * 1.8, Math.PI * 1.8, Math.PI * 1.8, Math.PI * 2.2]
  );

  const rotX = useTransform(
    scrollYProgress,
    [0, 0.35, 0.45, 0.55, 0.65, 0.72, 0.8, 1],
    [0, 0.15 * Math.PI, 0.25 * Math.PI, 0.4 * Math.PI, 0.9 * Math.PI, 0.9 * Math.PI, 0.1 * Math.PI, 0.1 * Math.PI]
  );

  const rotZ = useTransform(scrollYProgress, [0, 1], [0, 0.03 * Math.PI]);

  
  const posX = useTransform(
    scrollYProgress,
    [0, 0.10, 0.16, 0.18, 0.21, 0.35, 0.45, 0.5, 0.55, 0.65, 1],
    [0, 3, 2, 1.0, -2.5, -3.6, -2.0, -1.0, 0, 0, 0]
  );
  

  const posY = useTransform(
    scrollYProgress,
    [0, 0.4, 0.45, 0.55, 0.65, 0.72, 0.8, 1],
    [-2.0, -1.6, -1.2, -1.0, 0, 0.2, 0, -0.4]
  );

  
  const baseZoom = useTransform(
    scrollYProgress,
    [0, 0.15, 0.16, 0.21, 0.35, 0.45, 0.5, 0.55, 0.65, 1],
    [9, 11, 11.5, 12, 10.5, 9, 7, 1, 1, 10]
  );

  const zoomZ = useTransform(baseZoom, (b) => b);

  let t = 0;
  useFrame((state, delta) => {
    t += delta;
    const g = ref.current;
    if (!g) return;

    const s = 0.27 + 0.006 * Math.cos(t * 1.2); 
    g.scale.setScalar(s);
    g.rotation.set(rotX.get(), rotY.get(), rotZ.get());
    g.position.set(posX.get(), posY.get(), 0);

    const targetZ = zoomZ.get();
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.08;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}



/* ----------------------------- Overlays (UI) ------------------------------ */

function BottomProgress({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-x-0 bottom-6 z-[60] flex justify-center pointer-events-none">
      <div className="relative h-[2px] w-[70vw] bg-white/10">
        <div
          className="absolute left-0 top-0 h-[2px] bg-white/70"
          style={{ width: `${Math.max(0, Math.min(100, progress * 100))}%` }}
        />
        <div className="absolute inset-0 flex justify-between opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="h-[6px] w-[1px] bg-white/50 translate-y-[-2px]" />
          ))}
        </div>
      </div>
    </div>
  );
}


/* --------------------------------- Page ---------------------------------- */

export default function HomePage() {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.12 });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <main ref={scrollContainerRef} className="relative w-full bg-black text-white overflow-x-hidden">
      {/* Canvas (drone) */}
      <div className="fixed inset-0 z-[5]" style={{ pointerEvents: 'none' }}>
  <Canvas
    camera={{ position: [0, 0, 10], fov: 45 }}
    gl={{ alpha: true }}
    style={{ pointerEvents: 'none' }}
  >
    <Stars radius={100} depth={500} count={1000} factor={4} fade speed={1} />
    <ambientLight intensity={0.8} />
    <directionalLight position={[10, 10, 5]} intensity={1.2} />
    <Suspense fallback={null}>
      <FloatingDrone scrollYProgress={scrollYProgress} />
      <Environment preset="sunset" />
      <EffectComposer>
        <Bloom luminanceThreshold={0.18} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </Suspense>
  </Canvas>
</div>


      <motion.div style={{ opacity: progress }}>
        <BottomProgress progress={(progress as unknown as number) ?? 0} />
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="relative z-10">

        {/* HERO SECTION */}
        <section className="relative h-[100vh] flex flex-col items-center justify-start pt-[6vh]">
          <h1
            className="
              select-none text-[15vw] md:text-[12vw] leading-none font-extrabold tracking-tight
              text-white/90 text-center font-sans
            "
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
              letterSpacing: '-0.04em',
            }}
          >
            KESTREL&nbsp;
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="mt-6 text-center text-white/70 text-base md:text-lg tracking-wide"
          >
          </motion.p>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="relative flex items-center z-[10] py-75">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.4 }}
            className="max-w-xl ml-[8vw]"
          >
            <h2 className="text-5xl font-semibold mb-6">A Student-Built Drone System</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Kestrel is an autonomous videography drone initiative developed by student teams within several student ran
              clubs at UCF. Kestrel&apos;s focus is on pushing the boundaries of aerial robotics while integrating the intelligence
              of modern day computing systems.
            </p>
          </motion.div>
        </section>


        {/* INNOVATION SECTION */}
        <section className="relative flex items-center z-[10] pt-120 pb-500">
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.4 }}
            className="max-w-xl mr-[8vw] ml-auto text-right"
          >
            <h2 className="text-5xl font-semibold mb-6">Innovation Through Teamwork</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Each Kestrel subteam focuses on specialized goals—hardware engineering, embedded systems, autonomous pathing,
              simulation, and web visualization.
            </p>
          </motion.div>
        </section>

        {/* CINEMATIC BLACK VACUUM + CONTRIBUTORS TRANSITION */}
<motion.div
  style={{
    opacity: useTransform(
      scrollYProgress,
      [0.45, 0.5, 0.55, 0.75, 0.85, 0.9],
      [0, 0.4, 1, 1, 0.1, 0]
    ),
  }}
  className="fixed inset-0 bg-black z-[0] pointer-events-none"
/>

<section
  id="contributors"
  className="relative z-[20] h-[250vh] py-[80vh] flex flex-col items-center justify-center text-white"
>
  <motion.div
    style={{
      opacity: useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.9, 1], [1, 1, 1, 1, 1]),
      y: useTransform(scrollYProgress, [0.65, 0.85], [0, 0]),
    }}
    className="flex flex-col items-center justify-center"
  >
    <h1 className="text-5xl font-bold mb-10"></h1>
    <Contributors />
  </motion.div>
</section>


        {/* TEAMS */}
        <section id="teams" className="relative w-full z-[10] py-150">
          <h1 className="text-5xl font-bold text-center mb-14">Our Teams</h1>
          <div className="flex justify-between items-start w-full px-6">
            <div className="flex flex-col gap-10 ml-[6vw]">
              {[{ name: 'Embedded', icon: Cpu }, { name: 'Hardware', icon: Wrench }, { name: 'Website', icon: Globe }].map(
                (team, idx) => {
                  const Icon = team.icon;
                  return (
                    <div
                      key={idx}
                      className="w-60 group bg-black/40 border border-white/20 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 hover:border-white/40 transition-transform"
                    >
                      <Icon className="w-12 h-12 mb-4 text-gray-300 group-hover:text-blue-400 transition" />
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
                        {team.name}
                      </h3>
                    </div>
                  );
                }
              )}
            </div>

            <div className="flex flex-col gap-10 mr-[6vw]">
              {[{ name: 'Pathing', icon: Map }, { name: 'Model', icon: Box }, { name: 'Simulation', icon: Monitor }].map(
                (team, idx) => {
                  const Icon = team.icon;
                  return (
                    <div
                      key={idx}
                      className="w-60 group bg-black/40 border border-white/20 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 hover:border-white/40 transition-transform"
                    >
                      <Icon className="w-12 h-12 mb-4 text-gray-300 group-hover:text-blue-400 transition" />
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
                        {team.name}
                      </h3>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section id="journey" className="flex flex-col items-center justify-center text-center z-[10] py-75">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true, amount: 0.4 }}
            className="max-w-4xl"
          >
            <h2 className="text-5xl font-semibold mb-6">Explore Our Journey</h2>
            <p className="text-lg text-gray-300 mb-4">
              Learn about our development process, challenges, and achievements...
            </p>
            <div className="space-x-6 mt-4">
              <Link href="/devlogs" className="underline text-white hover:text-gray-300">
                Read Devlogs
              </Link>
              <Link href="/teams" className="underline text-white hover:text-gray-300">
                Meet the Teams
              </Link>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Footer */}
<footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-xl text-gray-300 py-10 overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-radial from-blue-500/30 via-transparent to-transparent blur-3xl animate-pulse-slow" />
    <div className="absolute -bottom-20 left-1/2 w-[600px] h-[400px] -translate-x-1/2 bg-blue-400/10 rounded-full blur-[160px]" />
  </div>

  <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
    <div>
      <h4 className="text-white font-semibold mb-4">About</h4>
      <ul className="space-y-2 text-sm">
        <li><Link href="/#about" className="hover:text-white">About Project</Link></li>
        <li><Link href="/#contributors" className="hover:text-white">Contributors</Link></li>
        <li><Link href="/#teams" className="hover:text-white">Teams</Link></li>
        <li><Link href="/#journey" className="hover:text-white">More</Link></li>
      </ul>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-4">Teams</h4>
      <ul className="space-y-2 text-sm">
        <li><Link href="/teams/hardware" className="hover:text-white">Hardware</Link></li>
        <li><Link href="/teams/embedded" className="hover:text-white">Embedded</Link></li>
        <li><Link href="/teams/simulation" className="hover:text-white">Simulation</Link></li>
        <li><Link href="/teams/pathing" className="hover:text-white">Pathing</Link></li>
        <li><Link href="/teams/model" className="hover:text-white">Modeling</Link></li>
        <li><Link href="/teams/website" className="hover:text-white">Website</Link></li>
        <li><Link href="/teams/aerostructures" className="hover:text-white">Aerostructures</Link></li>
      </ul>
    </div>

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

    <div>
      <h4 className="text-white font-semibold mb-4">Resources</h4>
      <ul className="space-y-2 text-sm">
        <li><Link href="/devlogs" className="hover:text-white">Devlogs</Link></li>
        <li><a href="mailto:teamlead@example.com" className="hover:text-white">Contact</a></li>
      </ul>
    </div>
  </div>

  <p className="text-center text-gray-500 text-sm mt-10 relative z-10">
    Developed by students at the University of Central Florida — In collaboration with Blue Origin and affiliated
    UCF clubs. <br />© 2025 Kestrel UCF. All rights reserved.
  </p>
</footer>
</main>
);
}
