import React, { useRef, useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { Chess, Square } from 'chess.js';

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
  isPlayerTurn,
}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [boardWidth, setBoardWidth] = useState(400);
  const [highlightedSquares, setHighlightedSquares] = useState<Record<string, { backgroundColor: string }>>({});

  // Responsive board width
  useEffect(() => {
    const updateWidth = () => setBoardWidth(Math.min(window.innerWidth * 0.9, 600));
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const customBoardStyle = {
    borderRadius: '8px',
    boxShadow: '0 0 30px rgba(123, 97, 255, 0.6)',
    overflow: 'hidden',
  };
  const customLightSquareStyle = { backgroundColor: '#2A2A3A' };
  const customDarkSquareStyle = {
    backgroundColor: '#1A1A2A',
    backgroundImage: 'radial-gradient(circle, #7B61FF 1px, transparent 1px)',
    backgroundSize: '20px 20px',
  };

  const customPieces = () => {
    const anim = (src: string, alt: string) => (
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-cyan-500 rounded-full opacity-20 blur-sm" />
        <Image
          src={src}
          alt={alt}
          width={100}
          height={100}
          className="relative z-10 drop-shadow-[0_0_8px_rgba(0,255,194,0.6)]"
        />
      </motion.div>
    );
    return {
      wP: () => anim('/pieces/wp.svg', 'White Pawn'),
      wN: () => anim('/pieces/wn.svg', 'White Knight'),
      wB: () => anim('/pieces/wb.svg', 'White Bishop'),
      wR: () => anim('/pieces/wr.svg', 'White Rook'),
      wQ: () => anim('/pieces/wq.svg', 'White Queen'),
      wK: () => anim('/pieces/wk.svg', 'White King'),
      bP: () => anim('/pieces/bp.svg', 'Black Pawn'),
      bN: () => anim('/pieces/bn.svg', 'Black Knight'),
      bB: () => anim('/pieces/bb.svg', 'Black Bishop'),
      bR: () => anim('/pieces/br.svg', 'Black Rook'),
      bQ: () => anim('/pieces/bq.svg', 'Black Queen'),
      bK: () => anim('/pieces/bk.svg', 'Black King'),
    };
  };

  // Highlight legal moves for a clicked square
  const onSquareClick = (square: Square) => {
    const chess = new Chess(position);
    const moves = chess.moves({ square, verbose: true });
    if (moves.length === 0) {
      setHighlightedSquares({});
      return;
    }
    const highlights: Record<string, { backgroundColor: string }> = {};
    highlights[square] = { backgroundColor: 'rgba(0,255,194,0.4)' };
    moves.forEach((m) => {
      highlights[m.to] = { backgroundColor: 'rgba(0,255,194,0.6)' };
    });
    setHighlightedSquares(highlights);
  };

  // Prevent drag when not player's turn
  const onDragBegin = () => {
    if (!isPlayerTurn) {
      toast.info("It's not your turn");
      return false;
    }
    return true;
  };

  const handleDrop = (source: string, target: string) => {
    try {
      const valid = onDrop(source, target);
      if (!valid) toast.error('Invalid move');
      setHighlightedSquares({});
      return valid;
    } catch {
      toast.error('Invalid move');
      setHighlightedSquares({});
      return false;
    }
  };

  return (
    <motion.div
      ref={boardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl opacity-10 blur-xl -z-10" />

      {/* Turn indicator */}
      <div
        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold z-10 transition-all ${
          isPlayerTurn ? 'bg-cyan-500 text-gray-900' : 'bg-gray-700 text-gray-300'
        }`}
      >
        {isPlayerTurn ? 'YOUR TURN' : "OPPONENT'S TURN"}
      </div>

      <Chessboard
        position={position}
        boardOrientation={boardOrientation}
        onPieceDrop={(s, t) => handleDrop(s, t)}
        onPieceDragBegin={onDragBegin}
        onSquareClick={onSquareClick}
        customBoardStyle={customBoardStyle}
        customLightSquareStyle={customLightSquareStyle}
        customDarkSquareStyle={customDarkSquareStyle}
        customSquareStyles={highlightedSquares}
        customPieces={customPieces()}
        animationDuration={300}
        boardWidth={boardWidth}
      />
    </motion.div>
  );
};

export default CustomChessBoard;