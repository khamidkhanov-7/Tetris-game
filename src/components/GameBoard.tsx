import React from 'react';
import { GameState } from '../types/tetris';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../utils/gameLogic';

interface GameBoardProps {
  gameState: GameState;
}

export function GameBoard({ gameState }: GameBoardProps) {
  const { board, currentPiece } = gameState;

  // Create a display board that includes the current piece
  const displayBoard = board.map(row => [...row]);

  // Add current piece to display board
  if (currentPiece) {
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPiece.position.y + y;
          const boardX = currentPiece.position.x + x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            displayBoard[boardY][boardX] = currentPiece.color;
          }
        }
      }
    }
  }

  return (
    <div className="game-board relative bg-gray-900 dark:bg-gray-800 border-4 border-gray-700 dark:border-gray-600 rounded-lg overflow-hidden shadow-2xl mx-auto">
      <div 
        className="grid gap-px bg-gray-800 dark:bg-gray-700 p-3"
        style={{
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`,
        }}
      >
        {displayBoard.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`aspect-square border border-gray-700 dark:border-gray-600 transition-all duration-75 min-h-[20px] min-w-[20px] ${
                cell 
                  ? 'shadow-inner transform scale-100' 
                  : 'bg-gray-800 dark:bg-gray-900 opacity-50'
              }`}
              style={{
                backgroundColor: cell || undefined,
                boxShadow: cell ? `inset 0 0 0 2px ${cell}40, 0 2px 4px rgba(0,0,0,0.3)` : undefined,
              }}
            />
          ))
        )}
      </div>
      
      {gameState.isGameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Game Over</h2>
            <p className="text-xl">Final Score: {gameState.score.toLocaleString()}</p>
          </div>
        </div>
      )}
      
      {gameState.isPaused && !gameState.isGameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold">Paused</h2>
          </div>
        </div>
      )}
    </div>
  );
}