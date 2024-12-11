import { Position } from '../types/game';

export const generateRandomPosition = (min: number, max: number): Position => ({
  x: Math.floor(Math.random() * (max - min + 1)) + min,
  y: 0,
  z: Math.floor(Math.random() * (max - min + 1)) + min,
});

export const isColliding = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.z === pos2.z;
};