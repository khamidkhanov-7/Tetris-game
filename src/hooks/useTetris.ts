import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, Tetromino } from '../types/tetris';
import {
  initializeGame,
  isValidMove,
  rotatePiece,
  placePiece,
  clearLines,
  calculateScore,
  calculateLevel,
  calculateDropTime
} from '../utils/gameLogic';
import { getRandomTetromino } from '../utils/tetrominoes';
import { soundManager } from '../utils/soundManager';

export function useTetris() {
  const [gameState, setGameState] = useState<GameState>(initializeGame);
  const dropTimeRef = useRef<number>();
  const lastDropTime = useRef<number>(0);

  const moveDown = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.currentPiece || !prevState.isPlaying || prevState.isPaused) {
        return prevState;
      }

      const newPosition = {
        x: prevState.currentPiece.position.x,
        y: prevState.currentPiece.position.y + 1
      };

      if (isValidMove(prevState.board, prevState.currentPiece, newPosition)) {
        return {
          ...prevState,
          currentPiece: {
            ...prevState.currentPiece,
            position: newPosition
          }
        };
      } else {
        // Place the piece and spawn a new one
        const newBoard = placePiece(prevState.board, prevState.currentPiece);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        const newScore = prevState.score + calculateScore(linesCleared, prevState.level);
        const newLines = prevState.lines + linesCleared;
        const newLevel = calculateLevel(newLines);

        if (linesCleared > 0) {
          soundManager.play('line');
        } else {
          soundManager.play('drop');
        }

        // Check for game over
        const nextPiece = prevState.nextPiece || getRandomTetromino();
        const isGameOver = !isValidMove(clearedBoard, nextPiece, nextPiece.position);

        if (isGameOver) {
          soundManager.play('gameover');
          return {
            ...prevState,
            board: clearedBoard,
            isPlaying: false,
            isGameOver: true,
            score: newScore,
            lines: newLines,
            level: newLevel
          };
        }

        return {
          ...prevState,
          board: clearedBoard,
          currentPiece: nextPiece,
          nextPiece: getRandomTetromino(),
          score: newScore,
          lines: newLines,
          level: newLevel
        };
      }
    });
  }, []);

  const moveLeft = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.currentPiece || !prevState.isPlaying || prevState.isPaused) {
        return prevState;
      }

      const newPosition = {
        x: prevState.currentPiece.position.x - 1,
        y: prevState.currentPiece.position.y
      };

      if (isValidMove(prevState.board, prevState.currentPiece, newPosition)) {
        soundManager.play('move');
        return {
          ...prevState,
          currentPiece: {
            ...prevState.currentPiece,
            position: newPosition
          }
        };
      }

      return prevState;
    });
  }, []);

  const moveRight = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.currentPiece || !prevState.isPlaying || prevState.isPaused) {
        return prevState;
      }

      const newPosition = {
        x: prevState.currentPiece.position.x + 1,
        y: prevState.currentPiece.position.y
      };

      if (isValidMove(prevState.board, prevState.currentPiece, newPosition)) {
        soundManager.play('move');
        return {
          ...prevState,
          currentPiece: {
            ...prevState.currentPiece,
            position: newPosition
          }
        };
      }

      return prevState;
    });
  }, []);

  const rotate = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.currentPiece || !prevState.isPlaying || prevState.isPaused) {
        return prevState;
      }

      const rotatedPiece = rotatePiece(prevState.currentPiece);

      if (isValidMove(prevState.board, rotatedPiece, rotatedPiece.position)) {
        soundManager.play('rotate');
        return {
          ...prevState,
          currentPiece: rotatedPiece
        };
      }

      return prevState;
    });
  }, []);

  const hardDrop = useCallback(() => {
    setGameState(prevState => {
      if (!prevState.currentPiece || !prevState.isPlaying || prevState.isPaused) {
        return prevState;
      }

      let dropDistance = 0;
      let testPosition = { ...prevState.currentPiece.position };

      while (isValidMove(prevState.board, prevState.currentPiece, { x: testPosition.x, y: testPosition.y + 1 })) {
        testPosition.y++;
        dropDistance++;
      }

      if (dropDistance > 0) {
        const newPiece = {
          ...prevState.currentPiece,
          position: testPosition
        };

        const newBoard = placePiece(prevState.board, newPiece);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        const bonusScore = dropDistance * 2;
        const newScore = prevState.score + calculateScore(linesCleared, prevState.level) + bonusScore;
        const newLines = prevState.lines + linesCleared;
        const newLevel = calculateLevel(newLines);

        if (linesCleared > 0) {
          soundManager.play('line');
        } else {
          soundManager.play('drop');
        }

        const nextPiece = prevState.nextPiece || getRandomTetromino();
        const isGameOver = !isValidMove(clearedBoard, nextPiece, nextPiece.position);

        if (isGameOver) {
          soundManager.play('gameover');
          return {
            ...prevState,
            board: clearedBoard,
            isPlaying: false,
            isGameOver: true,
            score: newScore,
            lines: newLines,
            level: newLevel
          };
        }

        return {
          ...prevState,
          board: clearedBoard,
          currentPiece: nextPiece,
          nextPiece: getRandomTetromino(),
          score: newScore,
          lines: newLines,
          level: newLevel
        };
      }

      return prevState;
    });
  }, []);

  const startGame = useCallback(() => {
    setGameState(prevState => ({
      ...initializeGame(),
      isPlaying: true
    }));
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      isPaused: !prevState.isPaused
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initializeGame());
  }, []);

  // Game loop
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused) {
      return;
    }

    const dropTime = calculateDropTime(gameState.level);
    
    const gameLoop = (timestamp: number) => {
      if (timestamp - lastDropTime.current > dropTime) {
        moveDown();
        lastDropTime.current = timestamp;
      }
      dropTimeRef.current = requestAnimationFrame(gameLoop);
    };

    dropTimeRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (dropTimeRef.current) {
        cancelAnimationFrame(dropTimeRef.current);
      }
    };
  }, [gameState.isPlaying, gameState.isPaused, gameState.level, moveDown]);

  return {
    gameState,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    hardDrop,
    startGame,
    pauseGame,
    resetGame
  };
}