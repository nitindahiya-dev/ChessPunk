import { createContext, useContext, useState, useEffect } from 'react';

type ConnectedWallet = { type: 'ethereum' | 'solana'; address: string } | null;
type WalletContextType = {
  connectedWallet: ConnectedWallet;
  setConnectedWallet: (wallet: ConnectedWallet) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet>(null);

  return (
    <WalletContext.Provider value={{ connectedWallet, setConnectedWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within a WalletProvider');
  return context;
};