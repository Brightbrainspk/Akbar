
import React from 'react';

export const Spinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };
  return (
    <div className={`animate-spin rounded-full border-4 border-t-yellow-400 border-r-yellow-400 border-b-indigo-500 border-l-indigo-500 ${sizeClasses[size]}`}></div>
  );
};
