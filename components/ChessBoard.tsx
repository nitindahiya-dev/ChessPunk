// components/ChessBoard.tsx
import React, { useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ChessBoardProps {
  position: string;
  onDrop: (source: string, target: string) => boolean;
  boardOrientation?: 'white' | 'black';
  isPlayerTurn: boolean;
}

const CustomChessBoard: React.FC<ChessBoardProps> = ({ 
  position, 
  onDrop, 
  boardOrientation = 'white',
  isPlayerTurn
}) => {
  const boardRef = useRef<HTMLDivElement>(null);

  // Custom board styles
  const customBoardStyle = {
    borderRadius: '8px',
    boxShadow: '0 0 30px rgba(123, 97, 255, 0.6)',
    overflow: 'hidden',
  };

  // Styles for all light squares
  const customLightSquareStyle = {
    backgroundColor: '#2A2A3A',
  };

  // Styles for all dark squares
  const customDarkSquareStyle = {
    backgroundColor: '#1A1A2A',
    backgroundImage: 'radial-gradient(circle, #7B61FF 1px, transparent 1px)',
    backgroundSize: '20px 20px',
  };

  // Custom pieces (unchanged, assuming this is defined elsewhere correctly)
// Piece animation
const customPieces = () => {
const pieceAnimation = (src: string, alt: string) => (
  <motion.div
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.2 }}
    className="relative"
  >
    <div className="absolute inset-0 bg-cyan-500 rounded-full opacity-20 blur-sm"></div>
    <Image 
      src={src} 
      alt={alt} 
      className="relative z-10 drop-shadow-[0_0_8px_rgba(0,255,194,0.6)]" 
      width={100}
      height={100}
    />
  </motion.div>
);

return {
  wP: () => pieceAnimation("/pieces/wp.svg", "White Pawn"),
  wN: () => pieceAnimation("/pieces/wn.svg", "White Knight"),
  wB: () => pieceAnimation("/pieces/wb.svg", "White Bishop"),
  wR: () => pieceAnimation("/pieces/wr.svg", "White Rook"),
  wQ: () => pieceAnimation("/pieces/wq.svg", "White Queen"),
  wK: () => pieceAnimation("/pieces/wk.svg", "White King"),
  bP: () => pieceAnimation("/pieces/bp.svg", "Black Pawn"),
  bN: () => pieceAnimation("/pieces/bn.svg", "Black Knight"),
  bB: () => pieceAnimation("/pieces/bb.svg", "Black Bishop"),
  bR: () => pieceAnimation("/pieces/br.svg", "Black Rook"),
  bQ: () => pieceAnimation("/pieces/bq.svg", "Black Queen"),
  bK: () => pieceAnimation("/pieces/bk.svg", "Black King"),
};
};

  return (
    <motion.div
      ref={boardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Glowing effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl opacity-10 blur-xl -z-10"></div>
      
      {/* Turn indicator */}
      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold z-10 ${
        isPlayerTurn 
          ? 'bg-cyan-500 text-gray-900' 
          : 'bg-gray-700 text-gray-300'
      }`}>
        {isPlayerTurn ? 'YOUR TURN' : 'OPPONENT\'S TURN'}
      </div>
      
      <Chessboard
        position={position}
        onPieceDrop={(source, target) => onDrop(source, target)}
        boardOrientation={boardOrientation}
        customBoardStyle={customBoardStyle}
        customLightSquareStyle={customLightSquareStyle}
        customDarkSquareStyle={customDarkSquareStyle}
        customPieces={customPieces()}
        animationDuration={300}
        boardWidth={Math.min(window.innerWidth * 0.9, 600)}
      />
    </motion.div>
  );
};

export default CustomChessBoard;

