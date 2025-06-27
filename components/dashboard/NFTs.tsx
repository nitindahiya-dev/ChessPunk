import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { nftSkins } from '../../data/data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const NFTs = () => {
  const nftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !nftRef.current) return;

    gsap.fromTo(
      '.nft-card',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: nftRef.current,
          start: 'top 90%',
        },
      }
    );

    return () => {
      gsap.killTweensOf('.nft-card');
    };
  }, []);

  return (
    <div ref={nftRef}>
      <div className="mb-8 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">🧵 NFT Skins Collection</h2>
          <div className="flex items-center">
            <div className="mr-4">
              <span className="text-gray-400">Filter:</span>
              <select className="ml-2 bg-gray-700 border border-cyan-500/20 rounded-lg px-3 py-1">
                <option>All Items</option>
                <option>Boards</option>
                <option>Pieces</option>
                <option>Avatars</option>
              </select>
            </div>
            <div>
              <span className="text-gray-400">Sort:</span>
              <select className="ml-2 bg-gray-700 border border-cyan-500/20 rounded-lg px-3 py-1">
                <option>Rarity</option>
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {nftSkins.map((nft) => (
          <div
            key={nft.id}
            className={`nft-card bg-gray-800/50 backdrop-blur-sm border rounded-xl overflow-hidden transition-all ${
              nft.equipped
                ? 'border-cyan-500 shadow-lg shadow-cyan-500/20'
                : 'border-cyan-500/20 hover:border-cyan-500/50'
            }`}
          >
            <div className="h-48 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 flex items-center justify-center">
              <div className="text-6xl">
                {nft.type === 'board' && '◼️'}
                {nft.type === 'avatar' && '👤'}
                {nft.type === 'pieces' && '♜'}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{nft.name}</h3>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        nft.rarity === 'Legendary'
                          ? 'bg-purple-500/20 text-purple-400'
                          : nft.rarity === 'Epic'
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      {nft.rarity}
                    </span>
                  </div>
                </div>
                <div className="text-2xl">
                  {nft.type === 'board' && '◼️'}
                  {nft.type === 'avatar' && '👤'}
                  {nft.type === 'pieces' && '♜'}
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                {nft.equipped ? (
                  <button className="flex-1 bg-cyan-500/20 text-cyan-400 py-2 rounded-lg text-sm font-bold">
                    Equipped
                  </button>
                ) : (
                  <button className="flex-1 bg-cyan-500/10 hover:bg-cyan-500/20 py-2 rounded-lg text-sm">
                    Equip
                  </button>
                )}
                <button className="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-cyan-500/20 rounded-lg">
                  ↗
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 px-8 rounded-lg font-bold">
          Browse NFT Marketplace
        </button>
      </div>
    </div>
  );
};

export default NFTs;