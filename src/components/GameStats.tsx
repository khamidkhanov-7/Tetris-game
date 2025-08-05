import React from 'react';
import { GameStats as GameStatsType } from '../types/tetris';

interface GameStatsProps {
  stats: GameStatsType;
}

export function GameStats({ stats }: GameStatsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Score</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {stats.score.toLocaleString()}
          </p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High Score</p>
          <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
            {stats.highScore.toLocaleString()}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Level</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              {stats.level}
            </p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lines</p>
            <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {stats.lines}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}