import React, { useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  Environment, 
  ContactShadows, 
  PerspectiveCamera, 
  Float,
  Text,
  useCursor
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { Bottle } from './Three/Bottle';
import confetti from 'canvas-confetti';

export default function Experience({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);
  const capRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    const audio = new Audio('/pop.mp3'); 
    audio.volume = 0.6; // Volume level set kiya hai[cite: 1]
    audio.play().catch(e => console.warn("Audio play blocked by browser:", e));
    // ------------------------------------

    if (capRef.current) {
      gsap.to(capRef.current.position, { y: 10, duration: 1.5, ease: 'power4.out' });
      gsap.to(capRef.current.scale, { x: 0, y: 0, z: 0, duration: 1 });
    }

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F40009', '#ffffff', '#330000']
    });

    setTimeout(onOpen, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">
      <div className="atmosphere absolute inset-0" />
      <Canvas shadows dpr={[1, 2]}>
        {/* Aapke frame ke liye perfect camera setup[cite: 1] */}
        <PerspectiveCamera makeDefault position={[0, 0, 9]} fov={35} />
        
        <ambientLight intensity={1.5} /> 
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#F40009" />
        
        <Environment preset="city" />

        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group 
              onPointerOver={() => setHovered(true)} 
              onPointerOut={() => setHovered(false)}
              onClick={handleOpen}
            >
              <Bottle open={opened} capRef={capRef} />
              
              {!opened && (
                <Text
                  position={[0, 4.2, 0]}
                  fontSize={0.35}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                >
                  Tap to Open Refreshment
                  <meshStandardMaterial emissive="#F40009" emissiveIntensity={2} />
                </Text>
              )}
            </group>
          </Float>
        </Suspense>

        <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
}