import React, { useMemo } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { GameBoard } from './components/GameBoard';
import { NextPiece } from './components/NextPiece';
import { GameStats } from './components/GameStats';
import { GameControls } from './components/GameControls';
import { TouchControls } from './components/TouchControls';
import { useTetris } from './hooks/useTetris';
import { useGameControls } from './hooks/useGameControls';
import { useLocalStorage } from './hooks/useLocalStorage';
import { GameStats as GameStatsType } from './types/tetris';

function TetrisGame() {
  const {
    gameState,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    hardDrop,
    startGame,
    pauseGame,
    resetGame
  } = useTetris();

  const [highScore, setHighScore] = useLocalStorage('tetris-high-score', 0);

  // Update high score when game ends
  React.useEffect(() => {
    if (gameState.isGameOver && gameState.score > highScore) {
      setHighScore(gameState.score);
    }
  }, [gameState.isGameOver, gameState.score, highScore, setHighScore]);

  const stats: GameStatsType = useMemo(() => ({
    score: gameState.score,
    level: gameState.level,
    lines: gameState.lines,
    highScore
  }), [gameState.score, gameState.level, gameState.lines, highScore]);

  useGameControls({
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    hardDrop,
    pauseGame,
    isPlaying: gameState.isPlaying
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Modern Tetris
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Classic gameplay, modern design
          </p>
        </div>

        {/* Game Area */}
        <div className="flex flex-col items-center justify-center">
          {/* Game Stats and Next Piece - Top Row */}
          <div className="flex flex-wrap justify-center gap-6 mb-6 w-full max-w-4xl">
            <GameStats stats={stats} />
            <NextPiece nextPiece={gameState.nextPiece} />
          </div>

          {/* Main Game Board - Centered and Large */}
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <GameBoard gameState={gameState} />
            </div>
          </div>

          {/* Game Controls - Below Game Board */}
          <div className="w-full max-w-2xl">
            <GameControls
              isPlaying={gameState.isPlaying}
              isPaused={gameState.isPaused}
              isGameOver={gameState.isGameOver}
              onStart={startGame}
              onPause={pauseGame}
              onReset={resetGame}
            />
            
            {/* Touch Controls for Mobile */}
            <TouchControls
              onMoveLeft={moveLeft}
              onMoveRight={moveRight}
              onMoveDown={moveDown}
              onRotate={rotate}
              onHardDrop={hardDrop}
            />
            
            {/* Desktop Controls Info */}
            <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700 mt-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">Keyboard Controls</h3>
              <div className="text-xs text-gray-600 dark:text-gray-400 grid grid-cols-2 gap-2 text-center">
                <div>← → ↓: Move</div>
                <div>↑ / Space: Rotate</div>
                <div>Enter: Hard Drop</div>
                <div>P / Esc: Pause</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Created by <span className="font-semibold text-purple-600 dark:text-purple-400">Khamidkhanov</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TetrisGame />
    </ThemeProvider>
  );
}

export default App;