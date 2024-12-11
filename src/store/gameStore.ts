import { create } from 'zustand';
import { Position, GameState } from '../types/game';
import { generateRandomPosition, isColliding } from '../utils/gameUtils';

const INITIAL_SPEED = 200;
const SPEED_INCREMENT = 10;
const MAX_SPEED = 50;

const getInitialState = () => ({
  snakeBody: [{ x: 0, y: 0, z: 0 }],
  food: { x: 5, y: 0, z: 5 },
  direction: 'right',
  nextDirection: 'right',
  score: 0,
  gameOver: false,
  highScore: 0,
  isPaused: false,
  speed: INITIAL_SPEED,
  level: 1,
  powerUp: null,
  powerUpType: null,
});

export const useGameStore = create<GameState>((set, get) => ({
  ...getInitialState(),

  moveSnake: (newDirection) => {
    const state = get();
    if (state.gameOver || state.isPaused) return;

    // Prevent 180-degree turns
    const currentDirection = state.direction;
    const isValidMove = !(
      (currentDirection === 'up' && newDirection === 'down') ||
      (currentDirection === 'down' && newDirection === 'up') ||
      (currentDirection === 'left' && newDirection === 'right') ||
      (currentDirection === 'right' && newDirection === 'left')
    );

    if (isValidMove) {
      set({ nextDirection: newDirection });
    }
  },

  updateGame: () => {
    const state = get();
    if (state.gameOver || state.isPaused) return;

    const head = { ...state.snakeBody[0] };
    const direction = state.nextDirection;

    // Move head based on direction
    switch (direction) {
      case 'up':
        head.z -= 1;
        break;
      case 'down':
        head.z += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
    }

    // Check collision with walls
    if (head.x < -9 || head.x > 9 || head.z < -9 || head.z > 9) {
      set({ 
        gameOver: true,
        highScore: Math.max(state.score, state.highScore)
      });
      return;
    }

    // Check collision with self
    if (state.snakeBody.slice(0, -1).some(segment => segment.x === head.x && segment.z === head.z)) {
      set({ 
        gameOver: true,
        highScore: Math.max(state.score, state.highScore)
      });
      return;
    }

    const newBody = [head];
    
    // Check if snake ate food
    if (head.x === state.food.x && head.z === state.food.z) {
      newBody.push(...state.snakeBody);
      const newScore = state.score + 1;
      const newLevel = Math.floor(newScore / 5) + 1;
      const newSpeed = Math.max(INITIAL_SPEED - (newLevel - 1) * SPEED_INCREMENT, MAX_SPEED);
      
      // Generate new food position that's not on snake body
      let newFood;
      do {
        newFood = generateRandomPosition(-9, 9);
      } while (newBody.some(segment => segment.x === newFood.x && segment.z === newFood.z));

      set({ 
        score: newScore,
        level: newLevel,
        speed: newSpeed,
        food: newFood,
        powerUp: Math.random() > 0.7 ? generateRandomPosition(-9, 9) : null,
        powerUpType: Math.random() > 0.5 ? 'speed' : 'points'
      });
    } else {
      newBody.push(...state.snakeBody.slice(0, -1));
    }

    // Check power-up collision
    if (state.powerUp && isColliding(head, state.powerUp)) {
      get().collectPowerUp();
    }

    set({ 
      snakeBody: newBody,
      direction: direction
    });
  },

  resetGame: () => {
    const currentHighScore = get().highScore;
    set({
      ...getInitialState(),
      highScore: currentHighScore
    });
  },

  togglePause: () => {
    const state = get();
    if (state.gameOver) {
      get().resetGame();
    } else {
      set(state => ({ isPaused: !state.isPaused }));
    }
  },

  setSpeed: (speed) => {
    set({ speed });
  },

  collectPowerUp: () => {
    const { powerUpType, score, speed } = get();
    if (powerUpType === 'speed') {
      set({ 
        speed: Math.max(speed * 0.8, MAX_SPEED),
        powerUp: null,
        powerUpType: null
      });
    } else if (powerUpType === 'points') {
      set({ 
        score: score + 3,
        powerUp: null,
        powerUpType: null
      });
    }
  }
}));