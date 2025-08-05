import React from 'react';
import { ArrowLeft, ArrowRight, ArrowDown, RotateCw } from 'lucide-react';

interface TouchControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onMoveDown: () => void;
  onRotate: () => void;
  onHardDrop: () => void;
}

export function TouchControls({ 
  onMoveLeft, 
  onMoveRight, 
  onMoveDown, 
  onRotate, 
  onHardDrop 
}: TouchControlsProps) {
  return (
    <div className="md:hidden mt-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">Touch Controls</h3>
        <div className="grid grid-cols-3 gap-2">
          <div></div>
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              onRotate();
            }}
            className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white p-4 rounded-lg font-semibold transition-all duration-150 shadow-md active:scale-95 flex items-center justify-center"
          >
            <RotateCw size={24} />
          </button>
          <div></div>
          
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              onMoveLeft();
            }}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white p-4 rounded-lg font-semibold transition-all duration-150 shadow-md active:scale-95 flex items-center justify-center"
          >
            <ArrowLeft size={24} />
          </button>
          
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              onMoveDown();
            }}
            className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white p-4 rounded-lg font-semibold transition-all duration-150 shadow-md active:scale-95 flex items-center justify-center"
          >
            <ArrowDown size={24} />
          </button>
          
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              onMoveRight();
            }}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white p-4 rounded-lg font-semibold transition-all duration-150 shadow-md active:scale-95 flex items-center justify-center"
          >
            <ArrowRight size={24} />
          </button>
        </div>
        
        <button
          onTouchStart={(e) => {
            e.preventDefault();
            onHardDrop();
          }}
          className="w-full mt-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white p-4 rounded-lg font-semibold transition-all duration-150 shadow-md active:scale-95"
        >
          Hard Drop
        </button>
      </div>
    </div>
  );
}