// components/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glow';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary',
  className = ''
}) => {
  const baseClasses = "font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105";
  
  const variantClasses = {
    primary: "bg-cyan-500 hover:bg-cyan-400 text-gray-900",
    secondary: "bg-transparent border-2 border-cyan-500 hover:bg-cyan-500/20 text-cyan-500",
    glow: "bg-cyan-500 text-gray-900 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};