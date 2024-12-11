import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function GameGrid() {
  const gridRef = useRef();
  const gridSize = 20;
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group>
      <gridHelper
        ref={gridRef}
        args={[gridSize, gridSize, '#4a5568', '#4a5568']}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[gridSize, gridSize]} />
        <meshStandardMaterial
          color="#1f2937"
          metalness={0.5}
          roughness={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Border walls */}
      {[
        [-10, 0, 0, 0.1, 1, 20], // Left wall
        [10, 0, 0, 0.1, 1, 20],  // Right wall
        [0, 0, -10, 20, 1, 0.1], // Back wall
        [0, 0, 10, 20, 1, 0.1],  // Front wall
      ].map((props, index) => (
        <mesh key={index} position={[props[0], props[1], props[2]]}>
          <boxGeometry args={[props[3], props[4], props[5]]} />
          <meshStandardMaterial
            color="#4a5568"
            transparent
            opacity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}