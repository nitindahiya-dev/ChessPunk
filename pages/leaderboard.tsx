import React from 'react';
import { players } from '../data/data';

const Leaderboard = () => {


  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 border-b border-cyan-500 pb-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            LEADERBOARD
          </h1>
          <div className="flex flex-wrap justify-between items-center mt-4">
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-cyan-600 rounded-lg font-medium">Global</button>
              <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">Friends</button>
              <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">This Week</button>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Your position: #4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Players */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* 2nd Place */}
          <div className="order-1 md:order-1 flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-b from-cyan-500 to-cyan-700 rounded-full border-4 border-gray-900"></div>
            </div>
            <h3 className="mt-6 text-xl font-bold text-cyan-300">NeonQueen</h3>
            <div className="mt-2 text-2xl font-bold">2380</div>
            <div className="mt-2 text-gray-400">ELO Rating</div>
            <div className="mt-4 px-4 py-1 bg-gray-800 rounded-full">
              <span className="text-green-400">84%</span> Win Rate
            </div>
          </div>
          
          {/* 1st Place */}
          <div className="order-3 md:order-2 flex flex-col items-center -mt-8">
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-3xl font-bold">
                1
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full border-4 border-gray-900"></div>
            </div>
            <h3 className="mt-8 text-2xl font-bold text-yellow-300">CryptoKnight</h3>
            <div className="mt-2 text-3xl font-bold">2450</div>
            <div className="mt-2 text-gray-400">ELO Rating</div>
            <div className="mt-4 px-4 py-1 bg-gray-800 rounded-full">
              <span className="text-green-400">89%</span> Win Rate
            </div>
            <div className="mt-4 px-4 py-1 bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-full text-sm">
              🏆 Current Champion
            </div>
          </div>
          
          {/* 3rd Place */}
          <div className="order-2 md:order-3 flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-b from-amber-500 to-amber-700 rounded-full border-4 border-gray-900"></div>
            </div>
            <h3 className="mt-6 text-xl font-bold text-amber-300">BlockchainBishop</h3>
            <div className="mt-2 text-2xl font-bold">2325</div>
            <div className="mt-2 text-gray-400">ELO Rating</div>
            <div className="mt-4 px-4 py-1 bg-gray-800 rounded-full">
              <span className="text-green-400">83%</span> Win Rate
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-4 px-6 text-left text-gray-400 font-medium">Rank</th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium">Player</th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium">ELO</th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium">W/L</th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium">Win Rate</th>
                <th className="py-4 px-6 text-left text-gray-400 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {players.map(player => (
                <tr 
                  key={player.rank} 
                  className={`border-b border-gray-700 last:border-0 ${
                    player.isYou ? 'bg-gradient-to-r from-cyan-900/30 to-purple-900/30' : ''
                  } hover:bg-gray-700/50`}
                >
                  <td className="py-4 px-6 font-bold">
                    {player.rank <= 3 ? (
                      <span className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        player.rank === 1 ? 'bg-yellow-500' : 
                        player.rank === 2 ? 'bg-gray-400' : 'bg-amber-600'
                      }`}>
                        {player.rank}
                      </span>
                    ) : player.rank}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 mr-3"></div>
                      <span>
                        {player.username} 
                        {player.isYou && <span className="ml-2 text-cyan-400">(You)</span>}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold">{player.elo}</td>
                  <td className="py-4 px-6">{player.wins}<span className="text-gray-400">/</span>{player.losses}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">{player.winRate}%</span>
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full" 
                          style={{ width: `${player.winRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      Challenge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <button className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
              &lt;
            </button>
            <button className="w-10 h-10 rounded-lg bg-cyan-600 flex items-center justify-center">1</button>
            <button className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
              2
            </button>
            <button className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
              3
            </button>
            <span className="flex items-center px-2">...</span>
            <button className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
              8
            </button>
            <button className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;