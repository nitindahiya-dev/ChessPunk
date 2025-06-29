import React from 'react';
// import { motion } from 'framer-motion';

interface Player {
  name: string;
  elo: number;
  color: 'white' | 'black';
}

interface PlayerPanelProps {
  player: Player;
  opponent: Player | null;
  roomId: string;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ player, opponent, roomId }) => {
  return (
    <div className="w-96 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
      <h2 className="text-lg font-bold mb-4 text-cyan-300 border-b border-cyan-500/30 pb-2">
        Players
      </h2>
      
      {/* Current player */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center ${
            player.color === 'white' 
              ? 'bg-gray-200 text-gray-800' 
              : 'bg-gray-800 text-gray-200'
          }`}>
            {player.color === 'white' ? '♔' : '♚'}
          </div>
          <div>
            <div className="font-bold">{player.name}</div>
            <div className="text-sm text-gray-400">You</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
          <div className="text-sm">ELO Rating</div>
          <div className="font-bold text-cyan-300">{player.elo}</div>
        </div>
      </div>
      
      {/* Opponent */}
      <div>
        {opponent ? (
          <>
            <div className="flex items-center mb-4">
              <div className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center ${
                opponent.color === 'white' 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-gray-800 text-gray-200'
              }`}>
                {opponent.color === 'white' ? '♔' : '♚'}
              </div>
              <div>
                <div className="font-bold">{opponent.name}</div>
                <div className="text-sm text-gray-400">Opponent</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
              <div className="text-sm">ELO Rating</div>
              <div className="font-bold text-cyan-300">{opponent.elo}</div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="animate-pulse">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-cyan-500/30 rounded-full"></div>
              <p className="text-cyan-300 font-bold">Waiting for opponent...</p>
              <p className="text-sm text-gray-400 mt-2">Share room ID: {roomId}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Stats */}
      <div className="mt-8 pt-6 border-t border-cyan-500/20">
        <h3 className="font-bold mb-3 text-cyan-300">Match Stats</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-700/50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-400">Moves</div>
            <div className="text-xl font-bold">24</div>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-400">Time</div>
            <div className="text-xl font-bold">05:32</div>
          </div>
          <div className="bg-gray-700/50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-400">Streak</div>
            <div className="text-xl font-bold text-cyan-300">+3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPanel;