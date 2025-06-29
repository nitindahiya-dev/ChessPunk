// types/wallet.ts
export interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: 'accountsChanged', handler: (accounts: string[]) => void) => void;
}

export interface SolanaProvider {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  on?: (event: 'disconnect', handler: () => void) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
    solana?: SolanaProvider;
  }
}