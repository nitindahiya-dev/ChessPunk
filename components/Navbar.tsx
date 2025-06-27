import Link from 'next/link';
import { Button } from './Button';
import { useState, useEffect } from 'react';
import Web3 from 'web3';

// Extend the Window interface to include ethereum for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}

type ConnectedWallet = {
  type: 'ethereum' | 'solana';
  address: string;
} | null;

export const Navbar: React.FC = () => {
  const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [availableWallets, setAvailableWallets] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const detectWallets = () => {
      const wallets: string[] = [];
      if (window.ethereum?.isMetaMask) wallets.push('MetaMask');
      if ((window as any).solana?.isPhantom) wallets.push('Phantom');
      setAvailableWallets(wallets);
    };
    detectWallets();
  }, []);

  const connectWallet = async (walletType: string) => {
    try {
      if (walletType === 'MetaMask' && window.ethereum?.isMetaMask) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        const accounts = await web3Instance.eth.getAccounts();
        setConnectedWallet({ type: 'ethereum', address: accounts[0] });
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          setConnectedWallet(accounts.length > 0 ? { type: 'ethereum', address: accounts[0] } : null);
        });
      } else if (walletType === 'Phantom' && (window as any).solana?.isPhantom) {
        const solana = (window as any).solana;
        await solana.connect();
        const address = solana.publicKey.toString();
        setConnectedWallet({ type: 'solana', address });
        solana.on('disconnect', () => setConnectedWallet(null));
      } else {
        throw new Error('Selected wallet not available');
      }
      setShowWalletModal(false);
    } catch (error) {
      console.error('Wallet connection failed:', error);
      setToast('Failed to connect wallet. Please try again.');
      setTimeout(() => setToast(null), 3000);
    }
  };

  const disconnectWallet = () => {
    if (connectedWallet?.type === 'solana') {
      (window as any).solana.disconnect();
    } else {
      setConnectedWallet(null);
    }
  };

  const handleConnectClick = () => {
    if (availableWallets.length === 0) {
      setToast('Please install a wallet like MetaMask or Phantom');
      setTimeout(() => setToast(null), 3000);
    } else {
      setShowWalletModal(true);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-cyan-500/20 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <span className="text-cyan-400">Chess</span>
          <span className="text-purple-500">Punk</span>
          <div className="ml-2 h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></div>
        </Link>
        
        <div className="flex space-x-4 items-center">
          <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors hidden md:block">Home</Link>
          <Link href="/tournaments" className="text-gray-300 hover:text-cyan-400 transition-colors hidden md:block">Tournaments</Link>
          <Link href="/nfts" className="text-gray-300 hover:text-cyan-400 transition-colors hidden md:block">NFTs</Link>
          <Link href="/leaderboard" className="text-gray-300 hover:text-cyan-400 transition-colors">Leaderboard</Link>
          {connectedWallet && (
            <Link href="/dashboard" className="text-gray-300 hover:text-cyan-400 transition-colors">Dashboard</Link>
          )}
          
          <div className="relative group">
            {connectedWallet ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">{formatAddress(connectedWallet.address)}</span>
                <Button 
                  onClick={disconnectWallet}
                  variant="secondary"
                  className="flex items-center"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  onClick={handleConnectClick} 
                  variant="secondary"
                  className="flex items-center"
                >
                  <span className="mr-2">🔗</span> Connect Wallet
                </Button>
                <div className="absolute hidden group-hover:block bg-gray-800 p-2 rounded mt-1 w-48 right-0 border border-cyan-500/30">
                  <p className="text-xs text-gray-400 p-2">Connect Phantom, MetaMask, or other Web3 wallets</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showWalletModal && (
        <div className="fixed top-[45vh] inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500/30 max-w-sm w-full">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">Select Wallet</h3>
            {availableWallets.length > 0 ? (
              <div className="space-y-2">
                {availableWallets.map(wallet => (
                  <Button
                    key={wallet}
                    onClick={() => connectWallet(wallet)}
                    variant="primary"
                    className="w-full text-left"
                  >
                    Connect with {wallet}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No wallets detected</p>
            )}
            <Button
              onClick={() => setShowWalletModal(false)}
              variant="secondary"
              className="mt-4 w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
          {toast}
        </div>
      )}
    </nav>
  );
};