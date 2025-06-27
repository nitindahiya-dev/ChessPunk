import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !featuresRef.current) return;

    gsap.fromTo(
      '.feature-item',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.2,
        scrollTrigger: { trigger: featuresRef.current, start: 'top 85%' },
      }
    );

    return () => {
      gsap.killTweensOf('.feature-item');
    };
  }, []);

  return (
    <section ref={featuresRef} className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-cyan-400">Web3-Powered</span> Chess Revolution
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience blockchain technology integrated into competitive chess
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="feature-item bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
            <div className="text-cyan-400 text-4xl mb-4">🪙</div>
            <h3 className="text-xl font-bold mb-2">Crypto Rewards</h3>
            <p className="text-gray-400">Win real cryptocurrency prizes in competitive matches and tournaments</p>
          </div>
          <div className="feature-item bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all">
            <div className="text-purple-400 text-4xl mb-4">🎴</div>
            <h3 className="text-xl font-bold mb-2">NFT Collectibles</h3>
            <p className="text-gray-400">Collect limited edition chess pieces, boards, and player avatars</p>
          </div>
          <div className="feature-item bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
            <div className="text-cyan-400 text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">Provably Fair</h3>
            <p className="text-gray-400">Transparent match results secured on the blockchain with smart contracts</p>
          </div>
          <div className="feature-item bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all">
            <div className="text-purple-400 text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">On-chain Stats</h3>
            <p className="text-gray-400">Your chess achievements permanently recorded on the blockchain</p>
          </div>
          <div className="feature-item bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
            <div className="text-cyan-400 text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-2">Tournaments</h3>
            <p className="text-gray-400">Compete in high-stakes tournaments with guaranteed prize pools</p>
          </div>
          <div className="feature-item bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all">
            <div className="text-purple-400 text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-2">DAO Governance</h3>
            <p className="text-gray-400">Vote on platform features and tournament rules as a community</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;