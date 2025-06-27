import React, { useState } from 'react';

const NFTs = () => {
  const [activeTab, setActiveTab] = useState('collected');
  
  const nftCollections = [
    { 
      id: 1, 
      name: "Cyber Knights", 
      items: [
        { id: 101, name: "Quantum King", rarity: "Legendary", equipped: true },
        { id: 102, name: "Neon Queen", rarity: "Epic", equipped: false },
        { id: 103, name: "Crypto Rook", rarity: "Rare", equipped: false },
      ]
    },
    { 
      id: 2, 
      name: "Neon Boards", 
      items: [
        { id: 201, name: "Matrix Grid", rarity: "Epic", equipped: true },
        { id: 202, name: "Holo Circuit", rarity: "Rare", equipped: false },
      ]
    },
    { 
      id: 3, 
      name: "Avatars", 
      items: [
        { id: 301, name: "Byte Punk", rarity: "Legendary", equipped: false },
        { id: 302, name: "Cypher Ghost", rarity: "Rare", equipped: false },
      ]
    }
  ];

  const marketplaceItems = [
    { id: 401, name: "Neon Pawn", collection: "Cyber Knights", price: "0.05 ETH", rarity: "Uncommon" },
    { id: 402, name: "Glitch Board", collection: "Neon Boards", price: "0.1 ETH", rarity: "Rare" },
    { id: 403, name: "Crypto Vizier", collection: "Cyber Knights", price: "0.25 ETH", rarity: "Epic" },
    { id: 404, name: "Blockchain Bard", collection: "Avatars", price: "0.15 ETH", rarity: "Rare" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 border-b border-purple-500 pb-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-500">
            NFT ARMORY
          </h1>
          <p className="mt-2 text-gray-400">Customize your chess experience with blockchain assets</p>
        </div>

        {/* Tabs */}
        <div className="flex mb-8 border-b border-gray-700">
          <button 
            className={`px-6 py-3 font-bold ${activeTab === 'collected' ? 'border-b-2 border-cyan-500 text-cyan-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('collected')}
          >
            MY COLLECTION
          </button>
          <button 
            className={`px-6 py-3 font-bold ${activeTab === 'market' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('market')}
          >
            MARKETPLACE
          </button>
        </div>

        {/* Collection View */}
        {activeTab === 'collected' && (
          <div>
            {nftCollections.map(collection => (
              <div key={collection.id} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-3 h-3 bg-cyan-500 rounded-full mr-2"></span>
                  {collection.name}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {collection.items.map(item => (
                    <div 
                      key={item.id} 
                      className={`bg-gray-800 rounded-xl overflow-hidden border-2 ${item.equipped ? 'border-cyan-500' : 'border-gray-700'} transition-all hover:shadow-lg hover:shadow-cyan-500/20`}
                    >
                      <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-900 relative">
                        {/* NFT Image Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-gray-600 border-2 border-dashed rounded-xl w-16 h-16" />
                        </div>
                        {item.equipped && (
                          <div className="absolute top-3 right-3 bg-cyan-600 text-xs font-bold px-2 py-1 rounded">
                            EQUIPPED
                          </div>
                        )}
                        <div className="absolute bottom-3 left-3 bg-gray-900/80 px-2 py-1 rounded text-sm">
                          {item.rarity}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        
                        <div className="mt-4 flex">
                          {!item.equipped ? (
                            <button className="flex-1 mr-2 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                              Details
                            </button>
                          ) : null}
                          <button className={`flex-1 py-2 rounded-lg font-medium ${
                            item.equipped 
                              ? 'bg-gradient-to-r from-cyan-700 to-gray-700' 
                              : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:opacity-90'
                          }`}>
                            {item.equipped ? 'Equipped' : 'Equip'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Marketplace View */}
        {activeTab === 'market' && (
          <div>
            <div className="flex flex-wrap justify-between mb-6">
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                  All Items
                </button>
                <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  Chess Pieces
                </button>
                <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  Boards
                </button>
                <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  Avatars
                </button>
              </div>
              
              <div className="flex mt-4 md:mt-0">
                <input 
                  type="text" 
                  placeholder="Search NFTs..." 
                  className="px-4 py-2 bg-gray-800 rounded-l-lg w-48 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button className="px-4 py-2 bg-cyan-600 rounded-r-lg hover:bg-cyan-500 transition-colors">
                  Search
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {marketplaceItems.map(item => (
                <div 
                  key={item.id} 
                  className="bg-gray-800 rounded-xl overflow-hidden border-2 border-gray-700 transition-all hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-900 relative">
                    {/* NFT Image Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-gray-600 border-2 border-dashed rounded-xl w-16 h-16" />
                    </div>
                    <div className="absolute bottom-3 left-3 bg-gray-900/80 px-2 py-1 rounded text-sm">
                      {item.rarity}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-400 text-sm">{item.collection}</p>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <p className="text-gray-400 text-sm">Price</p>
                        <p className="font-bold text-cyan-400">{item.price}</p>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTs;