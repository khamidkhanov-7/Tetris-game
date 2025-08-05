import React from 'react';
import { Tetromino } from '../types/tetris';

interface NextPieceProps {
  nextPiece: Tetromino | null;
}

export function NextPiece({ nextPiece }: NextPieceProps) {
  if (!nextPiece) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">Next</h3>
      <div className="flex justify-center">
        <div 
          className="grid gap-px bg-gray-200 dark:bg-gray-700 p-2 rounded"
          style={{
            gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, 1fr)`,
            gridTemplateRows: `repeat(${nextPiece.shape.length}, 1fr)`,
          }}
        >
          {nextPiece.shape.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${y}-${x}`}
                className="w-4 h-4 border border-gray-300 dark:border-gray-600"
                style={{
                  backgroundColor: cell ? nextPiece.color : 'transparent',
                  boxShadow: cell ? `inset 0 0 0 1px ${nextPiece.color}40` : undefined,
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}