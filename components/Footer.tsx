import Link from "next/link";

// components/Footer.tsx
export const Footer: React.FC = () => (
  <footer className="bg-gray-900/80 backdrop-blur-md border-t border-cyan-500/10 py-8 mt-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">
            <span className="text-cyan-400">Chess</span>
            <span className="text-purple-500">Punk</span>
          </h3>
          <p className="text-gray-400 text-sm">
            The ultimate Web3 chess experience. Play, compete, and earn crypto rewards.
          </p>
        </div>

        <div>
          <h4 className="text-cyan-400 font-semibold mb-4">Features</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-cyan-400 cursor-pointer">Real-time Matches</li>
            <li className="hover:text-cyan-400 cursor-pointer">Tournaments</li>
            <li className="hover:text-cyan-400 cursor-pointer">NFT Collectibles</li>
            <li className="hover:text-cyan-400 cursor-pointer">Crypto Rewards</li>
          </ul>
        </div>

        <div>
          <h4 className="text-cyan-400 font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-cyan-400 cursor-pointer">
              <Link href={"/docs"}>
                Documentation
              </Link>
            </li>
            <li className="hover:text-cyan-400 cursor-pointer">Smart Contracts</li>
            <li className="hover:text-cyan-400 cursor-pointer">API</li>
            <li className="hover:text-cyan-400 cursor-pointer">Tutorials</li>
          </ul>
        </div>

        <div>
          <h4 className="text-cyan-400 font-semibold mb-4">Community</h4>
          <div className="flex space-x-4">
            <div className="bg-gray-800 p-2 rounded-lg cursor-pointer hover:bg-cyan-500/10">
              <span className="text-gray-300">𝕏</span>
            </div>
            <div className="bg-gray-800 p-2 rounded-lg cursor-pointer hover:bg-cyan-500/10">
              <span className="text-gray-300">𝔻</span>
            </div>
            <div className="bg-gray-800 p-2 rounded-lg cursor-pointer hover:bg-cyan-500/10">
              <span className="text-gray-300">𝕋</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-cyan-500/10 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} ChessPunk. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);