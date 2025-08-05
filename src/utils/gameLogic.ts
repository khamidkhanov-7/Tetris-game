import { Tetromino, GameState, Position } from '../types/tetris';
import { getRandomTetromino } from './tetrominoes';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export function createEmptyBoard(): (string | null)[][] {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null));
}

export function isValidMove(board: (string | null)[][], piece: Tetromino, newPosition: Position): boolean {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newX = newPosition.x + x;
        const newY = newPosition.y + y;

        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX])
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

export function rotatePiece(piece: Tetromino): Tetromino {
  const rotated = piece.shape[0].map((_, i) =>
    piece.shape.map(row => row[i]).reverse()
  );
  
  return {
    ...piece,
    shape: rotated
  };
}

export function placePiece(board: (string | null)[][], piece: Tetromino): (string | null)[][] {
  const newBoard = board.map(row => [...row]);
  
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = piece.position.y + y;
        const boardX = piece.position.x + x;
        if (boardY >= 0) {
          newBoard[boardY][boardX] = piece.color;
        }
      }
    }
  }
  
  return newBoard;
}

export function clearLines(board: (string | null)[][]): { newBoard: (string | null)[][], linesCleared: number } {
  const newBoard = [...board];
  let linesCleared = 0;
  
  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (newBoard[y].every(cell => cell !== null)) {
      newBoard.splice(y, 1);
      newBoard.unshift(Array(BOARD_WIDTH).fill(null));
      linesCleared++;
      y++; // Check the same line again
    }
  }
  
  return { newBoard, linesCleared };
}

export function calculateScore(linesCleared: number, level: number): number {
  const baseScore = [0, 40, 100, 300, 1200];
  return baseScore[linesCleared] * (level + 1);
}

export function calculateLevel(lines: number): number {
  return Math.floor(lines / 10);
}

export function calculateDropTime(level: number): number {
  return Math.max(50, 1000 - level * 50);
}

export function initializeGame(): GameState {
  return {
    board: createEmptyBoard(),
    currentPiece: getRandomTetromino(),
    nextPiece: getRandomTetromino(),
    score: 0,
    level: 0,
    lines: 0,
    isPlaying: false,
    isPaused: false,
    isGameOver: false
  };
}