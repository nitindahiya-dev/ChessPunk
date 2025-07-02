// context/WalletContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ConnectedWallet =
  | { type: 'ethereum'; address: string }
  | { type: 'solana'; address: string }
  | null;

const WalletContext = createContext<{
  connectedWallet: ConnectedWallet;
  setConnectedWallet: (wallet: ConnectedWallet) => void;
}>({
  connectedWallet: null,
  setConnectedWallet: () => {},
});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  // Initialize from localStorage if present
  const [connectedWallet, setConnectedWalletState] = useState<ConnectedWallet>(() => {
    try {
      const stored = localStorage.getItem('connectedWallet');
      return stored ? (JSON.parse(stored) as ConnectedWallet) : null;
    } catch {
      return null;
    }
  });

  // Wrap state setter to also persist to localStorage
  const setConnectedWallet = (wallet: ConnectedWallet) => {
    setConnectedWalletState(wallet);
    try {
      if (wallet) {
        localStorage.setItem('connectedWallet', JSON.stringify(wallet));
      } else {
        localStorage.removeItem('connectedWallet');
      }
    } catch {
      // ignore storage errors
    }
  };

  // Ethereum (MetaMask) handling
  useEffect(() => {
    const ethereum = window.ethereum;
    if (!ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setConnectedWallet({ type: 'ethereum', address: accounts[0] });
      } else {
        setConnectedWallet(null);
      }
    };

    ethereum.on?.('accountsChanged', handleAccountsChanged);

    ethereum
      .request({ method: 'eth_accounts' })
      .then((res) => {
        if (Array.isArray(res)) {
          handleAccountsChanged(res as string[]);
        }
      })
      .catch(console.error);

    return () => {
      ethereum.off?.('accountsChanged', handleAccountsChanged);
    };
  }, []);

  // Solana (Phantom) handling
  useEffect(() => {
    const solana = window.solana;
    if (!solana) return;

    const handleDisconnect = () => {
      setConnectedWallet(null);
    };

    solana.on?.('disconnect', handleDisconnect);

    solana
      .connect()
      .then((result) => {
        if (result.publicKey) {
          setConnectedWallet({ type: 'solana', address: result.publicKey.toString() });
        }
      })
      .catch(console.error);

    return () => {
      solana.off?.('disconnect', handleDisconnect);
    };
  }, []);

  return (
    <WalletContext.Provider value={{ connectedWallet, setConnectedWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
