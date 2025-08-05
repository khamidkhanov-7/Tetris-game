import { TetrominoShape } from '../types/tetris';

export const TETROMINOES: Record<string, TetrominoShape> = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: '#00f5ff'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: '#ffff00'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#a000f0'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    color: '#00f000'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    color: '#f00000'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#0000f0'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    color: '#ff8000'
  }
};

export const TETROMINO_NAMES = Object.keys(TETROMINOES);

export function getRandomTetromino() {
  const randomIndex = Math.floor(Math.random() * TETROMINO_NAMES.length);
  const name = TETROMINO_NAMES[randomIndex];
  const tetromino = TETROMINOES[name];
  
  return {
    shape: tetromino.shape.map(row => [...row]),
    color: tetromino.color,
    position: { x: 3, y: 0 }
  };
}