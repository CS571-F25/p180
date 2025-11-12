import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Fallback component if model doesn't load
const FallbackGamepad = ({ scrollProgress }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      // Rotation based on scroll
      groupRef.current.rotation.x = scrollProgress * Math.PI * 0.5;
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2;

      // Position - move up as scroll progresses
      groupRef.current.position.y = scrollProgress * 3;

      // Scale - shrink as scroll progresses
      const scale = 1 - scrollProgress * 0.7;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Simple gamepad shape using basic geometries */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.8, 1.2]} />
        <meshStandardMaterial color="#ff6b35" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* D-pad */}
      <mesh position={[-0.6, 0.1, 0.6]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Buttons */}
      <mesh position={[0.6, 0.1, 0.6]}>
        <cylinderGeometry args={[0.12, 0.12, 0.1, 32]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>
      <mesh position={[0.75, 0.1, 0.45]}>
        <cylinderGeometry args={[0.12, 0.12, 0.1, 32]} />
        <meshStandardMaterial color="#F44336" />
      </mesh>

      {/* Analog sticks */}
      <mesh position={[-0.3, 0.15, 0.3]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.25, 0.15, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
};

const GamepadModel = ({ scrollProgress }) => {
  const groupRef = useRef();
  let model;

  try {
    const { scene } = useGLTF('/src/assets/gamepad.glb');
    model = scene;
  } catch (error) {
    console.warn('Gamepad model not found, using fallback');
    return <FallbackGamepad scrollProgress={scrollProgress} />;
  }

  useFrame(() => {
    if (groupRef.current) {
      // Rotation based on scroll
      groupRef.current.rotation.x = scrollProgress * Math.PI * 0.5;
      groupRef.current.rotation.y = scrollProgress * Math.PI * 2;

      // Position - move up as scroll progresses
      groupRef.current.position.y = scrollProgress * 3;

      // Scale - shrink as scroll progresses
      const scale = 1 - scrollProgress * 0.7;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  if (!model) {
    return <FallbackGamepad scrollProgress={scrollProgress} />;
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <primitive object={model} />
    </group>
  );
};

const Gamepad3D = ({ scrollProgress }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <pointLight position={[0, 5, 0]} intensity={0.5} />

      <Suspense fallback={<FallbackGamepad scrollProgress={scrollProgress} />}>
        <GamepadModel scrollProgress={scrollProgress} />
      </Suspense>
    </>
  );
};

export default Gamepad3D;
