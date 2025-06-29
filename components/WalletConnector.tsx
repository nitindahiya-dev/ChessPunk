// components/WalletConnector.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
// Remove: import { EthereumProvider, SolanaProvider } from '../types/wallet';

export const WalletConnector: React.FC<{
  onConnect: (wallet: 'metamask' | 'phantom', address: string) => void;
}> = ({ onConnect }) => {
  const [connecting, setConnecting] = useState<'metamask' | 'phantom' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDetected, setIsDetected] = useState({
    metamask: false,
    phantom: false,
  });

  useEffect(() => {
    setIsDetected({
      metamask: !!window.ethereum?.isMetaMask,
      phantom: !!window.solana?.isPhantom,
    });
  }, []);

  const connectMetamask = async () => {
    setConnecting('metamask');
    setError(null);
    try {
      if (!window.ethereum) throw new Error('MetaMask not detected');
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const typedAccounts = accounts as string[];
      if (typedAccounts.length > 0) {
        onConnect('metamask', typedAccounts[0]);
      } else {
        throw new Error('No accounts found');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to connect MetaMask';
      setError(message);
    } finally {
      setConnecting(null);
    }
  };

  const connectPhantom = async () => {
    setConnecting('phantom');
    setError(null);
    try {
      if (!window.solana?.isPhantom) throw new Error('Phantom wallet not detected');
      const resp = await window.solana.connect();
      if (resp.publicKey) {
        onConnect('phantom', resp.publicKey.toString());
      } else {
        throw new Error('No public key found');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to connect Phantom';
      setError(message);
    } finally {
      setConnecting(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-8 max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none">
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 15V9M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Connect Web3 Wallet
        </h2>
        <p className="mt-2 text-gray-400">
          Connect to play staked matches, earn rewards, and collect NFTs
        </p>
      </div>

      <div className="space-y-4">
        <Button
          onClick={connectMetamask}
          disabled={!isDetected.metamask || connecting === 'metamask'}
          variant={isDetected.metamask ? 'glow' : 'secondary'}
          className="w-full flex items-center justify-center"
        >
          {connecting === 'metamask' ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin mr-2"></div>
              Connecting...
            </div>
          ) : (
            <div className="flex items-center">
              <div className="w-6 h-6 mr-3 bg-[#f6851b] rounded flex items-center justify-center">
                <span className="text-xs font-bold text-white">M</span>
              </div>
              MetaMask {!isDetected.metamask && '(Not Detected)'}
            </div>
          )}
        </Button>

        <Button
          onClick={connectPhantom}
          disabled={!isDetected.phantom || connecting === 'phantom'}
          variant={isDetected.phantom ? 'glow' : 'secondary'}
          className="w-full flex items-center justify-center"
        >
          {connecting === 'phantom' ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin mr-2"></div>
              Connecting...
            </div>
          ) : (
            <div className="flex items-center">
              <div className="w-6 h-6 mr-3 bg-gradient-to-br from-purple-500 to-indigo-800 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">P</span>
              </div>
              Phantom {!isDetected.phantom && '(Not Detected)'}
            </div>
          )}
        </Button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm"
        >
          {error}
        </motion.div>
      )}

      <div className="mt-8 pt-6 border-t border-cyan-500/20">
        <h3 className="font-semibold text-cyan-300 mb-3">Why Connect Wallet?</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-start">
            <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center mr-2 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-300"></div>
            </div>
            <span>Play staked matches with crypto prizes</span>
          </li>
          <li className="flex items-start">
            <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center mr-2 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-300"></div>
            </div>
            <span>Earn and collect exclusive NFT trophies</span>
          </li>
          <li className="flex items-start">
            <div className="w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center mr-2 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-300"></div>
            </div>
            <span>Participate in DAO governance</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default WalletConnector;