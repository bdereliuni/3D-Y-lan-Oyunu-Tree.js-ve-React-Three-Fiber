import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { useGameStore } from '../store/gameStore';

export function Food() {
  const { food } = useGameStore();
  const foodRef = useRef();

  const { scale, position } = useSpring({
    scale: [1, 1, 1],
    position: [food.x, 0.5 + Math.sin(Date.now() * 0.002) * 0.2, food.z],
    config: { tension: 100, friction: 10 }
  });

  useFrame((state) => {
    if (foodRef.current) {
      foodRef.current.rotation.y += 0.02;
    }
  });

  return (
    <animated.mesh ref={foodRef} scale={scale} position={position}>
      <dodecahedronGeometry args={[0.4]} />
      <meshStandardMaterial
        color="#ef4444"
        emissive="#ef4444"
        emissiveIntensity={0.5}
        metalness={1}
        roughness={0}
      />
    </animated.mesh>
  );
}