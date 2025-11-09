"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useTransform, MotionValue} from "framer-motion";

export default function MobileDrone({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const { scene } = useGLTF("/models/InteractiveBKestrelView_optimized.glb");
  const ref = useRef<THREE.Group>(null);
  const overlayRef = useRef<THREE.Mesh>(null);


  const rotY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const rotX = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 0.2]);
  const posY = useTransform(scrollYProgress, [0, 0.5, 1], [-2, -1, -0.1]);
  const zoomZ = useTransform(scrollYProgress, [0, 0.5, 1], [18, 29, 29]);


  const fadeOpacity = useTransform(
    scrollYProgress,
    [0, 0.11, 0.20, 0.25, 0.45, 0.55, 0.65, 0.97, 1],
    [0, 1, 0, 0.7, 0, 0.6, 0.7, 0.4, 0]
  );

  let t = 0;
  useFrame((state, delta) => {
    t += delta;
    const g = ref.current;
    const overlay = overlayRef.current;
    if (!g || !overlay) return;


    const s = 0.28 + 0.008 * Math.cos(t * 1.4);
    g.scale.setScalar(s);
    g.rotation.set(rotX.get(), rotY.get(), 0);
    g.position.set(0, posY.get(), 0);

    const targetZ = zoomZ.get();
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.08;
    state.camera.lookAt(0, 0, 0);


    const opacity = fadeOpacity.get();
    (overlay.material as THREE.MeshBasicMaterial).opacity = opacity;
  });

  return (
    <>
      {/* Drone */}
      <group ref={ref}>
        <primitive object={scene} />
      </group>

      {/* Black fade overlay plane in front of camera */}
      <mesh ref={overlayRef} position={[0, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial
          color="black"
          transparent
          opacity={0}
          depthTest={false}
        />
      </mesh>
    </>
  );
}