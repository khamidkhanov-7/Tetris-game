import React from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { soundManager } from '../utils/soundManager';

interface GameControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function GameControls({ 
  isPlaying, 
  isPaused, 
  isGameOver, 
  onStart, 
  onPause, 
  onReset 
}: GameControlsProps) {
  const { isDark, toggleTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = React.useState(soundManager.isEnabled());

  const handleSoundToggle = () => {
    const enabled = soundManager.toggle();
    setSoundEnabled(enabled);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-4">
      <div className="flex flex-wrap gap-4 justify-center">
        {!isPlaying || isGameOver ? (
          <button
            onClick={onStart}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-lg"
          >
            <Play size={24} />
            {isGameOver ? 'New Game' : 'Start'}
          </button>
        ) : (
          <button
            onClick={onPause}
            className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-lg"
          >
            <Pause size={24} />
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}
        
        <button
          onClick={onReset}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-lg"
        >
          <RotateCcw size={24} />
          Reset
        </button>
        
        <button
          onClick={handleSoundToggle}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-lg"
        >
          {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
          <span className="hidden sm:inline">Sound</span>
        </button>
        
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-lg"
        >
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
          <span className="hidden sm:inline">Theme</span>
        </button>
      </div>
    </div>
  );
}