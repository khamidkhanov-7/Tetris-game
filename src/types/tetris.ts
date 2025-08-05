export interface Position {
  x: number;
  y: number;
}

export interface TetrominoShape {
  shape: number[][];
  color: string;
}

export interface Tetromino {
  shape: number[][];
  color: string;
  position: Position;
}

export interface GameState {
  board: (string | null)[][];
  currentPiece: Tetromino | null;
  nextPiece: Tetromino | null;
  score: number;
  level: number;
  lines: number;
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
}

export interface GameStats {
  score: number;
  level: number;
  lines: number;
  highScore: number;
}