import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { useGameStore } from '../store/gameStore';

export function PowerUp() {
  const { powerUp, powerUpType } = useGameStore();
  const powerUpRef = useRef();

  // Only create spring animation if powerUp exists
  const { scale, position } = useSpring({
    scale: powerUp ? [1, 1, 1] : [0, 0, 0],
    position: powerUp 
      ? [powerUp.x, 1 + Math.sin(Date.now() * 0.003) * 0.3, powerUp.z]
      : [0, 0, 0],
    config: { tension: 100, friction: 10 }
  });

  useFrame((state) => {
    if (powerUpRef.current && powerUp) {
      powerUpRef.current.rotation.y += 0.03;
      powerUpRef.current.rotation.x += 0.02;
    }
  });

  if (!powerUp || !powerUpType) return null;

  const color = powerUpType === 'speed' ? '#3b82f6' : '#f59e0b';

  return (
    <animated.mesh 
      ref={powerUpRef}
      scale={scale}
      position={position}
    >
      <octahedronGeometry args={[0.4]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        metalness={1}
        roughness={0}
      />
    </animated.mesh>
  );
}