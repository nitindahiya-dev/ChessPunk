// components/WalletConnector.tsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

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
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        throw new Error('MetaMask not detected');
      }
      const accounts = (await window.ethereum.request({ method: 'eth_requestAccounts' })) as string[];
      if (accounts.length > 0) {
        onConnect('metamask', accounts[0]);
      } else {
        throw new Error('No accounts found');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to connect MetaMask');
    } finally {
      setConnecting(null);
    }
  };

  const connectPhantom = async () => {
    setConnecting('phantom');
    setError(null);
    try {
      if (!window.solana || !window.solana.isPhantom) {
        throw new Error('Phantom wallet not detected');
      }
      const resp = await window.solana.connect();
      if (resp.publicKey) {
        onConnect('phantom', resp.publicKey.toString());
      } else {
        throw new Error('No public key found');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to connect Phantom');
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
      {/* … header and buttons … */}
      <div className="space-y-4">
        <Button
          onClick={connectMetamask}
          disabled={!isDetected.metamask || connecting === 'metamask'}
          variant={isDetected.metamask ? 'glow' : 'secondary'}
          className="w-full"
        >
          {connecting === 'metamask' ? 'Connecting…' : `MetaMask${!isDetected.metamask ? ' (Not Detected)' : ''}`}
        </Button>

        <Button
          onClick={connectPhantom}
          disabled={!isDetected.phantom || connecting === 'phantom'}
          variant={isDetected.phantom ? 'glow' : 'secondary'}
          className="w-full"
        >
          {connecting === 'phantom' ? 'Connecting…' : `Phantom${!isDetected.phantom ? ' (Not Detected)' : ''}`}
        </Button>
      </div>

      {error && <div className="mt-4 text-red-400">{error}</div>}

      {/* … explanatory footer … */}
    </motion.div>
  );
};

export default WalletConnector;
