import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function UI() {
  const { score, gameOver, highScore, isPaused, level, togglePause, resetGame } = useGameStore();

  const handlePlayAgain = () => {
    resetGame();
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-4 left-4 z-10 text-white space-y-2">
        <p className="text-2xl font-bold">Score: {score}</p>
        <p className="text-xl">High Score: {highScore}</p>
        <p className="text-xl">Level: {level}</p>
      </div>

      <div className="absolute top-4 right-4 z-10 space-x-2 pointer-events-auto">
        <button
          onClick={togglePause}
          className="bg-white/10 hover:bg-white/20 p-2 rounded-lg backdrop-blur-sm transition-colors"
        >
          {isPaused ? <Play size={24} className="text-white" /> : <Pause size={24} className="text-white" />}
        </button>
        <button
          onClick={resetGame}
          className="bg-white/10 hover:bg-white/20 p-2 rounded-lg backdrop-blur-sm transition-colors"
        >
          <RotateCcw size={24} className="text-white" />
        </button>
      </div>

      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50 backdrop-blur-sm pointer-events-auto">
          <div className="bg-white/10 p-8 rounded-lg text-center backdrop-blur-md text-white">
            <h2 className="text-4xl font-bold mb-4">Game Over!</h2>
            <p className="text-2xl mb-2">Final Score: {score}</p>
            <p className="text-xl mb-4">High Score: {highScore}</p>
            <button
              onClick={handlePlayAgain}
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg text-xl transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {isPaused && !gameOver && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30 backdrop-blur-sm">
          <div className="text-4xl font-bold text-white">PAUSED</div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 z-10 text-white/70 text-sm">
        <p>Controls: Arrow Keys or WASD</p>
        <p>Space: Pause/Resume</p>
      </div>
    </div>
  );
}