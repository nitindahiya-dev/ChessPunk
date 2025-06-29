// components/TrophyCase.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface NFTTrophy {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earnedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  attributes: {
    wins: number;
    streak: number;
    tournament?: string;
  };
}

interface TrophyCaseProps {
  trophies: NFTTrophy[];
}

const rarityColors = {
  common: 'border-gray-500',
  rare: 'border-blue-500',
  epic: 'border-purple-500',
  legendary: 'border-yellow-500',
};

const rarityGradients = {
  common: 'from-gray-700 to-gray-800',
  rare: 'from-blue-700/30 to-blue-900/50',
  epic: 'from-purple-700/30 to-purple-900/50',
  legendary: 'from-yellow-700/20 via-amber-900/40 to-yellow-700/20',
};

const TrophyCase: React.FC<TrophyCaseProps> = ({ trophies }) => {
  if (trophies.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-bold mb-4 text-cyan-300">Your Trophy Case</h3>
        <p className="text-gray-500">No trophies yet. Play matches to earn NFTs!</p>
        <div className="mt-6">
          <div className="inline-block p-6 bg-gray-800/50 rounded-xl border-2 border-dashed border-cyan-500/30">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl border border-cyan-500/10"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h3 className="text-xl font-bold mb-6 text-cyan-300 text-center">Your Trophy Collection</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trophies.map((trophy) => (
          <motion.div
            key={trophy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className={`bg-gradient-to-br ${rarityGradients[trophy.rarity]} backdrop-blur-sm rounded-xl overflow-hidden border-2 ${rarityColors[trophy.rarity]} relative`}
          >
            <div className="absolute inset-0 bg-[url('/backgrounds/grid-pattern.svg')] opacity-20"></div>
            
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 pointer-events-none"></div>
            
            {/* Holographic effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,194,0.05)_0%,rgba(0,255,194,0)_70%)]"></div>
            
            {/* NFT Image */}
            <div className="relative pt-[100%]">
              <Image 
                src={trophy.imageUrl} 
                alt={trophy.name} 
                className="absolute top-0 left-0 w-full h-full object-cover p-4"
                width={100}
                height={100}
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(123,97,255,0.2)_0%,rgba(123,97,255,0)_70%)]"></div>
            </div>
            
            {/* NFT Info */}
            <div className="p-4 relative z-10">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg">{trophy.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  trophy.rarity === 'common' ? 'bg-gray-700' :
                  trophy.rarity === 'rare' ? 'bg-blue-700' :
                  trophy.rarity === 'epic' ? 'bg-purple-700' : 'bg-yellow-700'
                }`}>
                  {trophy.rarity}
                </span>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">{trophy.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-800/50 p-2 rounded">
                  <div className="text-cyan-300">Wins</div>
                  <div>{trophy.attributes.wins}</div>
                </div>
                <div className="bg-gray-800/50 p-2 rounded">
                  <div className="text-cyan-300">Streak</div>
                  <div>{trophy.attributes.streak}</div>
                </div>
                {trophy.attributes.tournament && (
                  <div className="col-span-2 bg-gray-800/50 p-2 rounded">
                    <div className="text-cyan-300">Tournament</div>
                    <div>{trophy.attributes.tournament}</div>
                  </div>
                )}
              </div>
              
              <div className="mt-3 text-xs text-gray-500 text-right">
                Earned: {trophy.earnedAt}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Stats Summary */}
      <div className="mt-10 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20">
        <h4 className="font-bold text-cyan-300 mb-4">Collection Stats</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold">{trophies.length}</div>
            <div className="text-sm text-gray-400">Total NFTs</div>
          </div>
          <div className="p-4 bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold text-yellow-300">
              {trophies.filter(t => t.rarity === 'legendary').length}
            </div>
            <div className="text-sm text-gray-400">Legendary</div>
          </div>
          <div className="p-4 bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold">
              {trophies.reduce((sum, trophy) => sum + trophy.attributes.wins, 0)}
            </div>
            <div className="text-sm text-gray-400">Total Wins</div>
          </div>
          <div className="p-4 bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold text-cyan-300">
              {Math.max(...trophies.map(t => t.attributes.streak))}
            </div>
            <div className="text-sm text-gray-400">Best Streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrophyCase;