import React from 'react';
import { motion } from 'framer-motion';

type GameOutcome = 'win' | 'loss' | 'draw';
type GameReason = 'checkmate' | 'resignation' | 'draw';

interface GameResult {
  outcome: GameOutcome;
  reason: GameReason;
}

interface GameControlsProps {
  gameResult: GameResult | null;
  onRematch: () => void;
  onResign: () => void;
  onAction: (action: 'offer_draw' | 'takeback' | 'flip' | 'analysis') => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  gameResult,
  onRematch,
  onResign,
  onAction,
}) => {
  return (
    <div className="mt-6 w-full max-w-md">
      {gameResult ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-6 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-cyan-500/30"
        >
          <h3 className="text-xl font-bold mb-2">
            {gameResult.outcome === 'win'
              ? `You won by ${gameResult.reason}!`
              : gameResult.outcome === 'loss'
              ? `You lost by ${gameResult.reason}.`
              : `Draw by ${gameResult.reason}!`}
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRematch}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-bold"
          >
            Play Again
          </motion.button>
          <div className="mt-4 text-sm text-gray-500">
            Prize distribution will be processed on-chain...
          </div>
        </motion.div>
      ) : (
        <div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onResign}
            className="px-6 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 hover:bg-red-500/30 transition-colors"
          >
            Resign
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAction('offer_draw')}
            className="px-6 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-300 hover:bg-cyan-500/30 transition-colors"
          >
            Offer Draw
          </motion.button>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <div className="flex items-center space-x-4 text-sm">
          <button
            onClick={() => onAction('takeback')}
            className="px-3 py-1 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Take Back
          </button>
          <button
            onClick={() => onAction('flip')}
            className="px-3 py-1 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Flip Board
          </button>
          <button
            onClick={() => onAction('analysis')}
            className="px-3 py-1 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameControls;