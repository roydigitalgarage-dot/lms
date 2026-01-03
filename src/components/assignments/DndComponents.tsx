import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export function DraggableWord({ word, id, isDropped, disabled }: { word: string, id: string, isDropped: boolean, disabled?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    disabled: disabled || isDropped,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: disabled || isDropped ? 'not-allowed' : 'grab',
    touchAction: 'none', // Essential for touch devices
  };

  if (isDropped) {
     return <div className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-xl font-bold text-lg border-2 border-gray-300 dark:border-gray-600 opacity-50">{word}</div>
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes} 
      className={`px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-xl font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all ${disabled ? 'opacity-50' : ''}`}
    >
      {word}
    </div>
  );
}

export function DroppableBlank({ id, filledWord, correctWord, isSubmitted }: { id: string, filledWord: string | null, correctWord?: string, isSubmitted?: boolean }) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
    disabled: isSubmitted,
  });

  let borderColor = 'border-pink-300 dark:border-pink-600';
  let bgColor = 'bg-white dark:bg-gray-700';
  let textColor = 'text-gray-900 dark:text-white';

  if (isOver) {
    borderColor = 'border-blue-500 scale-110';
    bgColor = 'bg-blue-50 dark:bg-blue-900/30';
  }

  if (isSubmitted && filledWord) {
      if (filledWord === correctWord) {
          borderColor = 'border-green-500 bg-green-100 dark:bg-green-900/30';
          textColor = 'text-green-800 dark:text-green-200';
      } else {
          borderColor = 'border-red-500 bg-red-100 dark:bg-red-900/30';
          textColor = 'text-red-800 dark:text-red-200';
      }
  }

  return (
    <span 
      ref={setNodeRef}
      className={`inline-flex items-center justify-center mx-2 min-w-[120px] h-[40px] border-b-4 ${borderColor} ${bgColor} rounded-lg transition-all duration-200 align-middle px-3`}
    >
        <span className={`font-bold text-lg ${textColor}`}>
            {filledWord || ''}
        </span>
    </span>
  );
}
