// components/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glow' | 'outline'; // Add 'outline'
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary',
  className = '',
  disabled = false
}) => {
  const baseClasses = "font-bold py-3 px-8 rounded-full transition-all duration-300 transform";
  
  const variantClasses = {
    primary: "bg-cyan-500 hover:bg-cyan-400 text-gray-900",
    secondary: "bg-transparent border-2 border-cyan-500 hover:bg-cyan-500/20 text-cyan-500",
    glow: "bg-cyan-500 text-gray-900 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70",
    outline: "bg-transparent border-2 border-gray-400 hover:bg-gray-400/20 text-gray-400" // New outline style
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? disabledClasses : ''} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};