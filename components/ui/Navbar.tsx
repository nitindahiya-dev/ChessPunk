// components/Navbar.tsx
import Link from 'next/link'
import { Button } from './Button'
import { useState, useEffect } from 'react'
import Web3 from 'web3'

// ---------- 1) Wallet type & state -------------
type ConnectedWallet =
  | { type: 'ethereum'; address: string }
  | { type: 'solana'; address: string }
  | null

export const Navbar: React.FC = () => {
  const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet>(null)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [availableWallets, setAvailableWallets] = useState<Array<'MetaMask' | 'Phantom'>>([])
  const [toast, setToast] = useState<string | null>(null)

  // ---------- 2) Detect installed wallets -------------
  useEffect(() => {
    const wallets: Array<'MetaMask' | 'Phantom'> = []
    if (window.ethereum?.isMetaMask) wallets.push('MetaMask')
    if (window.solana?.isPhantom) wallets.push('Phantom')
    setAvailableWallets(wallets)
  }, [])

  // ---------- 3) Connect logic -------------
  const connectWallet = async (walletType: 'MetaMask' | 'Phantom') => {
    try {
      if (walletType === 'MetaMask' && window.ethereum) {
        // Request accounts
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const web3Instance = new Web3(window.ethereum)
        const accounts = (await web3Instance.eth.getAccounts()) as string[]
        if (accounts[0]) {
          setConnectedWallet({ type: 'ethereum', address: accounts[0] })
        }
        // Listen for changes
        window.ethereum.on?.('accountsChanged', (accounts: string[]) => {
          if (accounts[0]) {
            setConnectedWallet({ type: 'ethereum', address: accounts[0] })
          } else {
            setConnectedWallet(null)
          }
        })

      } else if (walletType === 'Phantom' && window.solana?.isPhantom) {
        const resp = await window.solana.connect()
        const addr = resp.publicKey.toString()
        setConnectedWallet({ type: 'solana', address: addr })
        window.solana.on?.('disconnect', () => setConnectedWallet(null))

      } else {
        throw new Error('Selected wallet not available')
      }

      setShowWalletModal(false)
    } catch (err) {
      console.error('Wallet connection failed:', err)
      setToast('Failed to connect wallet. Please try again.')
      setTimeout(() => setToast(null), 3000)
    }
  }

  // ---------- 4) Disconnect logic -------------
  const disconnectWallet = () => {
    if (connectedWallet?.type === 'solana') {
      window.solana?.disconnect()
    }
    setConnectedWallet(null)
  }

  // ---------- 5) UI handlers & formatting -------------
  const handleConnectClick = () => {
    if (availableWallets.length === 0) {
      setToast('Please install MetaMask or Phantom Wallet')
      setTimeout(() => setToast(null), 3000)
    } else {
      setShowWalletModal(true)
    }
  }

  const formatAddress = (address: string) =>
    `${address.slice(0, 6)}…${address.slice(-4)}`

  // ---------- 7) Render -------------
  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-cyan-500/20 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <span className="text-cyan-400">Chess</span>
          <span className="text-purple-500">Punk</span>
        </Link>

        <div className="flex space-x-4 items-center">
          <Link href="/" className="hidden md:block text-gray-300 hover:text-cyan-400">
            Home
          </Link>
          <Link href="/tournaments" className="hidden md:block text-gray-300 hover:text-cyan-400">
            Tournaments
          </Link>
          <Link href="/nfts" className="hidden md:block text-gray-300 hover:text-cyan-400">
            NFTs
          </Link>
          <Link href="/leaderboard" className="text-gray-300 hover:text-cyan-400">
            Leaderboard
          </Link>
          {connectedWallet && (
            <Link href="/dashboard" className="text-gray-300 hover:text-cyan-400">
              Dashboard
            </Link>
          )}
          <div className="relative group">
            {connectedWallet ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">{formatAddress(connectedWallet.address)}</span>
                <Button onClick={disconnectWallet} variant="secondary">
                  Disconnect
                </Button>
              </div>
            ) : (
              <>
                <Button onClick={handleConnectClick} variant="secondary">
                  <span className="mr-2">🔗</span> Connect Wallet
                </Button>
                <div className="absolute hidden group-hover:block bg-gray-800 p-2 rounded mt-1 w-48 right-0 border border-cyan-500/30">
                  <p className="text-xs text-gray-400 p-2">
                    Connect Phantom, MetaMask, or other Web3 wallets
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showWalletModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500/30 max-w-sm w-full">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">Select Wallet</h3>
            {availableWallets.length > 0 ? (
              <div className="space-y-2">
                {availableWallets.map((wallet) => (
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
            <Button onClick={() => setShowWalletModal(false)} variant="secondary" className="mt-4 w-full">
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
  )
}
