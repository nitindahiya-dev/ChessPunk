import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Profile from '../components/dashboard/Profile';
import Stats from '../components/dashboard/Stats';
import History from '../components/dashboard/History';
import NFTs from '../components/dashboard/NFTs';
import Analysis from '../components/dashboard/Analysis';
import Settings from '../components/dashboard/Settings';
import { userData } from '../components/dashboard/data';

const Dashboard: NextPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const tabs = [
    { id: 'profile', label: '👤 Profile' },
    { id: 'stats', label: '🎖 ELO Rating' },
    { id: 'history', label: '📈 Match History' },
    { id: 'nfts', label: '🧵 NFT Skins' },
    { id: 'analysis', label: '🧪 Analysis Tools' },
    { id: 'settings', label: '⚙️ Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background grid - prevent click interference */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="grid-item border border-cyan-500/10 rounded-sm opacity-10"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 to-gray-900"></div>
      </div>

      {/* Dashboard Header */}
      <section className="pt-24 pb-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="text-cyan-400">Cyber</span>
                <span className="text-purple-500">Punk</span> Dashboard
              </h1>
              <p className="text-gray-400">
                Manage your account, track stats, and customize your experience
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-cyan-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">♛</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">{userData.username}</h2>
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-2">♖ Master</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Tabs */}
      <div className="border-b border-cyan-500/20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  console.log('Switching to tab:', tab.id);
                  setActiveTab(tab.id);
                }}
                className={`py-4 px-2 font-medium text-sm md:text-base whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="dashboard-content min-h-[400px]">
            {activeTab === 'profile' && <Profile />}
            {activeTab === 'stats' && <Stats />}
            {activeTab === 'history' && <History />}
            {activeTab === 'nfts' && <NFTs />}
            {activeTab === 'analysis' && <Analysis />}
            {activeTab === 'settings' && <Settings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;