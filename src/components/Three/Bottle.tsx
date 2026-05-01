import * as THREE from 'three';
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';

export function Bottle({ open, capRef }: { open: boolean, capRef: React.RefObject<THREE.Group> }) {
  const points = useMemo(() => {
    const pts = [];
    pts.push(new THREE.Vector2(0, 0), new THREE.Vector2(0.3, 0), new THREE.Vector2(0.35, 0.1));
    pts.push(new THREE.Vector2(0.4, 0.5), new THREE.Vector2(0.35, 1.0));
    pts.push(new THREE.Vector2(0.28, 1.2), new THREE.Vector2(0.35, 1.5));
    pts.push(new THREE.Vector2(0.3, 2.0), new THREE.Vector2(0.12, 2.3));
    pts.push(new THREE.Vector2(0.12, 2.6), new THREE.Vector2(0.15, 2.65));
    return pts;
  }, []);

  const liquidRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (liquidRef.current) {
      liquidRef.current.rotation.y += 0.01;
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.015;
      liquidRef.current.scale.set(s, 1, s);
    }
  });

  return (
    /* Reduced Scale from 2 to 1.2 and adjusted position */
    <group scale={1.2} position={[0, -1.5, 0]}>
      {/* Glass Body */}
      <mesh castShadow>
        <latheGeometry args={[points, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          resolution={512}
          thickness={0.5}
          roughness={0.05}
          transmission={1}
          ior={1.4}
          color="#ffffff"
        />
      </mesh>

      {/* Liquid Content */}
      <mesh ref={liquidRef}>
        <latheGeometry args={[points.map(p => new THREE.Vector2(p.x * 0.92, p.y)), 64]} />
        <meshStandardMaterial color="#1a0000" metalness={0.9} roughness={0.1} emissive="#220000" />
      </mesh>

      {/* Label - Properly scaled for the body */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.365, 0.365, 0.5, 32, 1, true]} />
        <meshStandardMaterial color="#F40009" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* The Cap */}
      <group ref={capRef} position={[0, 2.7, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.1, 32]} />
          <meshStandardMaterial color="#F40009" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      <Bubbles count={15} />
    </group>
  );
}

function Bubbles({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    for (let i = 0; i < count; i++) {
        const time = state.clock.elapsedTime * 0.5;
        const x = Math.sin(time + i) * 0.1;
        const y = (time + i * 2.5) % 2.5;
        const z = Math.cos(time + i) * 0.1;
        dummy.position.set(x, y, z);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} position={[0, 0, 0]}>
      <sphereGeometry args={[0.01, 8, 8]} />
      <meshStandardMaterial color="#fff" transparent opacity={0.6} />
    </instancedMesh>
  );
}