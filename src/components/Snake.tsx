import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { useGameStore } from '../store/gameStore';

export function Snake() {
  const { snakeBody } = useGameStore();
  const groupRef = useRef();

  // Create individual springs for each segment
  const springs = snakeBody.map((segment, index) => ({
    position: [
      segment.x,
      segment.y + Math.sin(Date.now() * 0.003 + index * 0.5) * 0.2,
      segment.z
    ],
    scale: index === 0 ? [1.1, 1.1, 1.1] : [0.9, 0.9, 0.9]
  }));

  return (
    <group ref={groupRef}>
      {springs.map((spring, index) => (
        <animated.mesh
          key={index}
          position={spring.position}
          scale={spring.scale}
        >
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial
            color={index === 0 ? '#4ade80' : '#22c55e'}
            metalness={0.8}
            roughness={0.2}
            emissive={index === 0 ? '#4ade80' : '#22c55e'}
            emissiveIntensity={0.2}
          />
        </animated.mesh>
      ))}
    </group>
  );
}