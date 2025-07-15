
import React from 'react';

export const APP_TITLE = "Gallant Nexus Academy Sanghar";
export const DESIGNER_NAME = "Designed by Akbar Khaskheli";
export const TAGLINE = "Boost your brain. Beat the challenge.";

export const Logo = ({ className }: { className?: string }) => (
  <div className={`flex items-center space-x-3 font-sans ${className}`}>
    <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-lg shadow-lg">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-400">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 7L12 12M12 22V12M22 7L12 12M17 4.5L7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <text x="5" y="16.5" fontFamily="sans-serif" fontSize="6.5" fill="#FFD700" fontWeight="bold">GNS</text>
      </svg>
    </div>
    <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
      <span className="text-yellow-400">G</span>allant <span className="text-yellow-400">N</span>exus <span className="text-yellow-400">S</span>anghar
    </h1>
  </div>
);
