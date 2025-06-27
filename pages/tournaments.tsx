import React from 'react';

const Tournaments = () => {
  const activeTournaments = [
    { id: 1, name: "Cyber Grand Prix", entryFee: "0.1 ETH", prize: "5 ETH", participants: 42, status: "Live" },
    { id: 2, name: "Neon Knight Classic", entryFee: "0.05 ETH", prize: "2.5 ETH", participants: 28, status: "Starting" },
  ];

  const upcomingTournaments = [
    { id: 3, name: "Blockchain Blitz", entryFee: "0.2 ETH", prize: "10 ETH", participants: 0, status: "Upcoming" },
    { id: 4, name: "DAO Masters", entryFee: "FREE", prize: "NFT Trophy", participants: 0, status: "Upcoming" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-cyan-500 pb-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            TOURNAMENTS
          </h1>
          <button className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg hover:from-cyan-500 hover:to-purple-500 transition-all font-bold text-lg">
            Create Tournament
          </button>
        </div>

        {/* Active Tournaments */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            LIVE TOURNAMENTS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTournaments.map(tournament => (
              <div key={tournament.id} className="bg-gray-800 border-2 border-cyan-500 rounded-xl p-6 transform hover:scale-[1.02] transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-cyan-300">{tournament.name}</h3>
                    <div className="flex mt-3">
                      <div className="mr-8">
                        <p className="text-gray-400">Entry</p>
                        <p className="font-mono">{tournament.entryFee}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Prize Pool</p>
                        <p className="font-mono text-green-400">{tournament.prize}</p>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-red-500 rounded-full text-sm font-bold">{tournament.status}</span>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Participants</span>
                    <span>{tournament.participants}/64</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2.5 rounded-full" 
                      style={{ width: `${(tournament.participants/64)*100}%` }}
                    ></div>
                  </div>
                </div>
                
                <button className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg font-bold hover:opacity-90 transition-opacity">
                  JOIN TOURNAMENT
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Tournaments */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
            UPCOMING EVENTS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingTournaments.map(tournament => (
              <div key={tournament.id} className="bg-gray-800 border-2 border-purple-500 rounded-xl p-6 hover:border-cyan-500 transition-all">
                <h3 className="text-xl font-bold text-purple-300">{tournament.name}</h3>
                <div className="flex mt-4">
                  <div className="mr-8">
                    <p className="text-gray-400">Entry</p>
                    <p className={`font-mono ${tournament.entryFee === "FREE" ? "text-green-400" : ""}`}>
                      {tournament.entryFee}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Prize</p>
                    <p className="font-mono text-yellow-400">{tournament.prize}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="px-4 py-2 bg-gray-700 rounded-lg font-medium hover:bg-gray-600 transition-colors">
                    Set Reminder
                  </button>
                  <button className="ml-3 px-4 py-2 bg-gradient-to-r from-purple-700 to-cyan-700 rounded-lg font-medium hover:opacity-90 transition-opacity">
                    View Details
                  </button>
                </div>
              </div>
            ))}
            
            {/* Special Tournament Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-500 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 rounded-full filter blur-3xl opacity-20"></div>
              <h3 className="text-xl font-bold text-yellow-300">Season Championship</h3>
              <p className="mt-2 text-gray-300">Monthly elite competition</p>
              
              <div className="mt-8">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span>Top 100 players qualify</span>
                </div>
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span>10 ETH prize pool</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span>Exclusive Champion NFT</span>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <div className="inline-flex items-center px-4 py-2 bg-yellow-600 rounded-lg font-bold">
                  <span>Starts in: 12d 06h</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tournaments;