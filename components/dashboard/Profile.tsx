// components/dashboard/Profile.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useUserData } from '../../hooks/useUserData';
import { useWallet } from '../../context/WalletContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Profile: React.FC = () => {
  const profileRef = useRef<HTMLDivElement>(null);
  const { connectedWallet } = useWallet();
  const { userData, loading, error } = useUserData(connectedWallet?.address);

  useEffect(() => {
    if (profileRef.current && userData) {
      gsap.fromTo(
        '.profile-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
        }
      );
    }
    return () => {
      gsap.killTweensOf('.profile-card');
    };
  }, [userData]);

  if (!connectedWallet) return <div>Please connect your wallet to view your profile.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data found.</div>;

  return (
    <div ref={profileRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="profile-card lg:col-span-2 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">👤 Player Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-2 text-cyan-400">Account Details</h3>
            <div className="space-y-3">
              <div>
                <div className="text-gray-400 text-sm">Username</div>
                <div className="font-medium">{userData.username}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Wallet Address</div>
                <div className="font-mono text-sm text-purple-400 truncate">{userData.wallet_address}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Member Since</div>
                <div className="font-medium">{new Date(userData.join_date).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Last Active</div>
                <div className="font-medium">{new Date(userData.last_active).toLocaleString()}</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2 text-cyan-400">Membership Status</h3>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-400">Account Type</div>
                <div className={`font-bold ${userData.premium_member ? 'text-cyan-400' : 'text-gray-400'}`}>
                  {userData.premium_member ? 'Premium Member' : 'Free Account'}
                </div>
              </div>
              {!userData.premium_member && (
                <div className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 p-4 rounded-lg mt-4">
                  <h4 className="font-bold mb-2">Upgrade to Premium</h4>
                  <p className="text-sm mb-3">Unlock advanced features and exclusive content</p>
                  <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-bold">
                    Upgrade Now
                  </button>
                </div>
              )}
            </div>
            <h3 className="text-lg font-bold mb-2 text-cyan-400">Social Profiles</h3>
            <div className="flex space-x-3">
              <button className="bg-gray-700 hover:bg-cyan-500/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                𝕏
              </button>
              <button className="bg-gray-700 hover:bg-cyan-500/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                𝔻
              </button>
              <button className="bg-gray-700 hover:bg-cyan-500/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                𝕋
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-card bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">🎖 Achievements</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
            <div className="flex items-center">
              <div className="bg-cyan-500/20 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <span>🏆</span>
              </div>
              <div>
                <div className="font-medium">Grandmaster Victory</div>
                <div className="text-sm text-gray-400">Defeat a 2400+ ELO player</div>
              </div>
            </div>
            <div className="text-cyan-400">Unlocked</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
            <div className="flex items-center">
              <div className="bg-cyan-500/20 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <span>🔥</span>
              </div>
              <div>
                <div className="font-medium">Win Streak</div>
                <div className="text-sm text-gray-400">Win 10 matches in a row</div>
              </div>
            </div>
            <div className="text-gray-500">8/10</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
            <div className="flex items-center">
              <div className="bg-cyan-500/20 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <span>💎</span>
              </div>
              <div>
                <div className="font-medium">NFT Collector</div>
                <div className="text-sm text-gray-400">Collect 5 NFT skins</div>
              </div>
            </div>
            <div className="text-cyan-400">Unlocked</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
            <div className="flex items-center">
              <div className="bg-cyan-500/20 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <span>⚔️</span>
              </div>
              <div>
                <div className="font-medium">Tournament Champion</div>
                <div className="text-sm text-gray-400">Win a major tournament</div>
              </div>
            </div>
            <div className="text-gray-500">Locked</div>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Profile;