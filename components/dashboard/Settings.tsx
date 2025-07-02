// components/dashboard/Settings.tsx

import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useWallet } from '../../context/WalletContext';
import { useUserData } from '../../hooks/useUserData';

const Settings: React.FC = () => {
  const { connectedWallet, setConnectedWallet } = useWallet();
  const { userData, loading, error } = useUserData(connectedWallet?.address);
  const [toast, setToast] = useState<string | null>(null);

  // Local state for settings
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [theme, setTheme] = useState('CyberPunk');
  const [boardStyle, setBoardStyle] = useState('Neon Grid');
  const [soundEffects, setSoundEffects] = useState(true);
  const [moveSounds, setMoveSounds] = useState(true);
  const [gameNotifications, setGameNotifications] = useState(true);
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);

  // Load initial values from userData
  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setBio(userData.bio || '');
      setTheme(userData.theme);
      setBoardStyle(userData.board_style);
      setSoundEffects(userData.sound_effects);
      setMoveSounds(userData.move_sounds);
      setGameNotifications(userData.game_notifications);
      setTwoFaEnabled(userData.two_fa_enabled);
    }
  }, [userData]);

  const connectWallet = async (walletType: 'MetaMask' | 'Phantom') => {
    try {
      if (walletType === 'MetaMask' && window.ethereum?.isMetaMask) {
        // now accepts params: []
        await window.ethereum.request({ method: 'eth_requestAccounts', params: [] });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const web3Instance = new Web3(window.ethereum as any); const accounts = (await web3Instance.eth.getAccounts()) as string[];
        if (accounts[0]) {
          setConnectedWallet({ type: 'ethereum', address: accounts[0] });
        }
        window.ethereum.on?.('accountsChanged', (accounts: string[]) => {
          setConnectedWallet(
            accounts.length > 0
              ? { type: 'ethereum', address: accounts[0] }
              : null
          );
        });
      } else if (walletType === 'Phantom' && window.solana?.isPhantom) {
        const resp = await window.solana.connect();
        const addr = resp.publicKey.toString();
        setConnectedWallet({ type: 'solana', address: addr });
        window.solana.on?.('disconnect', () => setConnectedWallet(null));
      } else {
        throw new Error('Selected wallet not available');
      }
    } catch (err: unknown) {
      console.error('Wallet connection failed:', err);
      setToast('Failed to connect wallet. Please try again.');
      setTimeout(() => setToast(null), 3000);
    }
  };

  const disconnectWallet = () => {
    if (connectedWallet?.type === 'solana') {
      window.solana?.disconnect();    // now available
    }
    setConnectedWallet(null);
  };

  const saveSettings = async () => {
    if (!connectedWallet) return;

    const settings = {
      username,
      bio,
      theme,
      board_style: boardStyle,
      sound_effects: soundEffects,
      move_sounds: moveSounds,
      game_notifications: gameNotifications,
      two_fa_enabled: twoFaEnabled,
    };

    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: connectedWallet.address, settings }),
      });

      if (!response.ok) throw new Error('Failed to save settings');
      setToast('Settings saved successfully');
    } catch (err) {
      console.error('Error saving settings:', err);
      setToast('Failed to save settings. Please try again.');
    } finally {
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (!connectedWallet) return <div>Please connect your wallet to access settings.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (

    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 theme-${theme.toLowerCase()}`}>
      <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">⚙️ Account Settings</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-3 text-cyan-400">Profile Settings</h3>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-2 focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell the ChessPunk community about yourself..."
                  className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-2 focus:border-cyan-500 focus:outline-none"
                ></textarea>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3 text-cyan-400">Appearance</h3>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Theme</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setTheme('CyberPunk')}
                    className={`flex-1 border-2 ${theme === 'CyberPunk' ? 'border-cyan-500' : 'border-gray-600'} rounded-lg p-4 bg-gradient-to-br from-gray-900 to-gray-800`}
                  >
                    <div className="font-bold mb-2">CyberPunk</div>
                    <div className="flex">
                      <div className="w-4 h-4 bg-cyan-500 rounded-full mr-1"></div>
                      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setTheme('Dark')}
                    className={`flex-1 border-2 ${theme === 'Dark' ? 'border-cyan-500' : 'border-gray-600'} rounded-lg p-4 bg-gradient-to-br from-gray-800 to-gray-700`}
                  >
                    <div className="font-bold mb-2">Dark</div>
                    <div className="flex">
                      <div className="w-4 h-4 bg-gray-400 rounded-full mr-1"></div>
                      <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setTheme('Light')}
                    className={`flex-1 border-2 ${theme === 'Light' ? 'border-cyan-500' : 'border-gray-600'} rounded-lg p-4 bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800`}
                  >
                    <div className="font-bold mb-2">Light</div>
                    <div className="flex">
                      <div className="w-4 h-4 bg-gray-500 rounded-full mr-1"></div>
                      <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                    </div>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Board Style</label>
                <select
                  value={boardStyle}
                  onChange={(e) => setBoardStyle(e.target.value)}
                  className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-2 focus:border-cyan-500 focus:outline-none"
                >
                  <option>Neon Grid</option>
                  <option>Quantum Matrix</option>
                  <option>Holographic</option>
                  <option>Data Stream</option>
                  <option>Classic Wood</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3 text-cyan-400">Sound & Notifications</h3>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium">Sound Effects</div>
                  <div className="text-sm text-gray-400">Enable/disable game sounds</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={soundEffects}
                    onChange={(e) => setSoundEffects(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium">Move Sounds</div>
                  <div className="text-sm text-gray-400">Sound when pieces move</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={moveSounds}
                    onChange={(e) => setMoveSounds(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Game Notifications</div>
                  <div className="text-sm text-gray-400">Notify when {`it's`} your turn</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gameNotifications}
                    onChange={(e) => setGameNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
            </div>
          </div>
          <button
            onClick={saveSettings}
            className="mt-6 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 py-2 px-4 rounded-lg"
          >
            Save Settings
          </button>
        </div>
      </div>
      <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">🔐 Security</h2>
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-cyan-400">Wallet Connection</h3>
          <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="fontr-medium">MetaMask</div>
                <div className="text-sm text-gray-400 truncate">
                  {connectedWallet?.type === 'ethereum' ? connectedWallet.address : 'Not connected'}
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${connectedWallet?.type === 'ethereum'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-gray-600 text-gray-400'
                  }`}
              >
                {connectedWallet?.type === 'ethereum' ? 'CONNECTED' : 'DISCONNECTED'}
              </span>
            </div>
            <button
              onClick={() =>
                connectedWallet?.type === 'ethereum'
                  ? disconnectWallet()
                  : connectWallet('MetaMask')
              }
              className={`w-full py-2 rounded-lg ${connectedWallet?.type === 'ethereum'
                ? 'bg-gray-800 hover:bg-red-500/20 text-red-400'
                : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400'
                }`}
            >
              {connectedWallet?.type === 'ethereum' ? 'Disconnect Wallet' : 'Connect Wallet'}
            </button>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="font-medium">Phantom Wallet</div>
                <div className="text-sm text-gray-400 truncate">
                  {connectedWallet?.type === 'solana' ? connectedWallet.address : 'Not connected'}
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold ${connectedWallet?.type === 'solana'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-gray-600 text-gray-400'
                  }`}
              >
                {connectedWallet?.type === 'solana' ? 'CONNECTED' : 'DISCONNECTED'}
              </span>
            </div>
            <button
              onClick={() =>
                connectedWallet?.type === 'solana'
                  ? disconnectWallet()
                  : connectWallet('Phantom')
              }
              className={`w-full py-2 rounded-lg ${connectedWallet?.type === 'solana'
                ? 'bg-gray-800 hover:bg-red-500/20 text-red-400'
                : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400'
                }`}
            >
              {connectedWallet?.type === 'solana' ? 'Disconnect Wallet' : 'Connect Wallet'}
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 text-cyan-400">Account Security</h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
              <div className="bg-cyan-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                <span>✉️</span>
              </div>
              <div>
                <div className="font-medium">Email Verification</div>
                <div className="text-sm text-gray-400">cyberqueen@example.com</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
              <div className="bg-cyan-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                <span>🔑</span>
              </div>
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-gray-400">{twoFaEnabled ? 'Enabled' : 'Not enabled'}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-auto">
                <input
                  type="checkbox"
                  checked={twoFaEnabled}
                  onChange={(e) => setTwoFaEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      {toast && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Settings;