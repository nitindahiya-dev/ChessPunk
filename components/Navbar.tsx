// components/Navbar.tsx
import Link from 'next/link';
import { Button } from './Button';

export const Navbar: React.FC = () => (
  <nav className="bg-gray-900/80 backdrop-blur-md border-b border-cyan-500/20 py-4 sticky top-0 z-50">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold flex items-center">
        <span className="text-cyan-400">Chess</span>
        <span className="text-purple-500">Punk</span>
        <div className="ml-2 h-2 w-2 bg-cyan-500 rounded-full animate-pulse"></div>
      </Link>
      
      <div className="flex space-x-4 items-center">
        <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors hidden md:block">Home</Link>
        <Link href="#" className="text-gray-300 hover:text-cyan-400 transition-colors hidden md:block">Tournaments</Link>
        <Link href="#" className="text-gray-300 hover:text-cyan-400 transition-colors hidden md:block">NFTs</Link>
        <Link href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Leaderboard</Link>
        
        <div className="relative group">
          <Button 
            onClick={() => console.log('Connect Wallet')} 
            variant="secondary"
            className="flex items-center"
          >
            <span className="mr-2">🔗</span> Connect Wallet
          </Button>
          <div className="absolute hidden group-hover:block bg-gray-800 p-2 rounded mt-1 w-48 right-0 border border-cyan-500/30">
            <p className="text-xs text-gray-400 p-2">Connect Phantom, MetaMask, or other Web3 wallets</p>
          </div>
        </div>
      </div>
    </div>
  </nav>
);