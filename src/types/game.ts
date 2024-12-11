export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface GameState {
  snakeBody: Position[];
  food: Position;
  direction: string;
  nextDirection: string;
  score: number;
  gameOver: boolean;
  highScore: number;
  isPaused: boolean;
  speed: number;
  level: number;
  powerUp: Position | null;
  powerUpType: string | null;
  moveSnake: (newDirection: string) => void;
  updateGame: () => void;
  startGame: () => void;
  resetGame: () => void;
  togglePause: () => void;
  setSpeed: (speed: number) => void;
  collectPowerUp: () => void;
}