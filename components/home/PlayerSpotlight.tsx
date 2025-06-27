import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Button } from '../Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PlayerSpotlight = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !spotlightRef.current) return;

    gsap.fromTo(
      '.player-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: { trigger: spotlightRef.current, start: 'top 85%' },
      }
    );
    gsap.fromTo(
      '.trophy',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: { trigger: spotlightRef.current, start: 'top 85%' },
      }
    );

    return () => {
      gsap.killTweensOf('.player-card, .trophy');
    };
  }, []);

  return (
    <section ref={spotlightRef} className="py-20 bg-gradient-to-b from-gray-950 to-gray-900 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-cyan-400">Player</span> Spotlight
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Meet our top players and see their impressive NFT trophy collections
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="player-card bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all transform hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-cyan-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">♛</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">CyberQueen</h3>
                <div className="flex items-center">
                  <span className="text-cyan-400 mr-2">ELO 2150</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Wins</span>
                <span className="font-bold">124</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Win Rate</span>
                <span className="font-bold text-cyan-400">87%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Earnings</span>
                <span className="font-bold text-purple-400">5.2 ETH</span>
              </div>
            </div>
            <h4 className="text-lg font-bold mb-3 text-cyan-400">NFT Trophies</h4>
            <div className="flex justify-between">
              <div className="trophy bg-gradient-to-br from-cyan-500/20 to-purple-600/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="trophy bg-gradient-to-br from-cyan-500/20 to-purple-600/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🥇</span>
              </div>
              <div className="trophy bg-gradient-to-br from-cyan-500/20 to-purple-600/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚔️</span>
              </div>
            </div>
          </div>
          <div className="player-card bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all transform hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-cyan-600 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">♚</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">NeonKing</h3>
                <div className="flex items-center">
                  <span className="text-purple-400 mr-2">ELO 2280</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Wins</span>
                <span className="font-bold">187</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Win Rate</span>
                <span className="font-bold text-cyan-400">92%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Earnings</span>
                <span className="font-bold text-purple-400">8.7 ETH</span>
              </div>
            </div>
            <h4 className="text-lg font-bold mb-3 text-purple-400">NFT Trophies</h4>
            <div className="flex justify-between">
              <div className="trophy bg-gradient-to-br from-purple-500/20 to-cyan-600/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="trophy bg-gradient-to-br from-purple-500/20 to-cyan-600/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🥇</span>
              </div>
              <div className="trophy bg-gradient-to-br from-purple-500/20 to-cyan-600/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
            </div>
          </div>
          <div className="player-card bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all transform hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-cyan-400 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">♝</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">CryptoBishop</h3>
                <div className="flex items-center">
                  <span className="text-cyan-400 mr-2">ELO 2050</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Wins</span>
                <span className="font-bold">96</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Win Rate</span>
                <span className="font-bold text-cyan-400">83%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Earnings</span>
                <span className="font-bold text-purple-400">3.8 ETH</span>
              </div>
            </div>
            <h4 className="text-lg font-bold mb-3 text-cyan-400">NFT Trophies</h4>
            <div className="flex justify-between">
              <div className="trophy bg-gradient-to-br from-cyan-400/20 to-purple-500/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="trophy bg-gradient-to-br from-cyan-400/20 to-purple-500/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🥈</span>
              </div>
              <div className="trophy bg-gradient-to-br from-cyan-400/20 to-purple-500/20 w-16 h-16 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚔️</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <Button onClick={() => console.log('View all players')} variant="glow" className="text-lg">
            View Leaderboard
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PlayerSpotlight;