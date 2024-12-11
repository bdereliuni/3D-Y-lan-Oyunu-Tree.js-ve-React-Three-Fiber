import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Snake } from './Snake';
import { Food } from './Food';
import { PowerUp } from './PowerUp';
import { GameGrid } from './GameGrid';
import { UI } from './UI';
import { useGameStore } from '../store/gameStore';
import { useEffect, useCallback } from 'react';

export function Game() {
  const { moveSnake, updateGame, gameOver, isPaused, speed } = useGameStore();

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameOver) return;
    
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        moveSnake('up');
        break;
      case 'ArrowDown':
      case 's':
        moveSnake('down');
        break;
      case 'ArrowLeft':
      case 'a':
        moveSnake('left');
        break;
      case 'ArrowRight':
      case 'd':
        moveSnake('right');
        break;
      case ' ':
        e.preventDefault();
        useGameStore.getState().togglePause();
        break;
    }
  }, [moveSnake, gameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!gameOver && !isPaused) {
      const interval = setInterval(() => {
        updateGame();
      }, speed);
      return () => clearInterval(interval);
    }
  }, [updateGame, gameOver, isPaused, speed]);

  return (
    <div className="w-full h-screen relative bg-gray-900">
      <UI />
      <Canvas camera={{ position: [15, 15, 15], fov: 50 }}>
        <color attach="background" args={['#111827']} />
        <fog attach="fog" args={['#111827', 30, 40]} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#4ade80" />
        <GameGrid />
        <Snake />
        <Food />
        <PowerUp />
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}