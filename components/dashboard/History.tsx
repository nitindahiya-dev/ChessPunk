//componets/dashboard/History.tsx

import { useState, useEffect } from 'react';
import { useWallet } from '../../context/WalletContext';

interface Match {
  id: number;
  opponent: string;
  result: string;
  duration: string; // e.g., '00:05:00'
  played_at: string; // ISO string
  elo_change: number;
}

const History = () => {
  const { connectedWallet } = useWallet();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchHistory = async () => {
      if (!connectedWallet) return;

      try {
        const response = await fetch(`/api/user/match-history?walletAddress=${connectedWallet.address}`);
        if (!response.ok) {
          throw new Error('Failed to fetch match history');
        }
        const data = await response.json();
        setMatches(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchHistory();
  }, [connectedWallet]);

  if (loading) return <div>Loading match history...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-cyan-500/20">
        <h2 className="text-2xl font-bold">📈 Match History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-cyan-500/20">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Opponent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Result</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ELO Change</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-500/20">
            {matches.map((match) => (
              <tr key={match.id} className="hover:bg-gray-700/30">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-br from-cyan-500/20 to-purple-600/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm">♛</span>
                    </div>
                    <div className="font-medium">{match.opponent}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {match.result === "Win" ? (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">WIN</span>
                  ) : match.result === "Loss" ? (
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold">LOSS</span>
                  ) : (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold">DRAW</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{match.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{new Date(match.played_at).toLocaleDateString()}</td>
                <td className={`px-6 py-4 whitespace-nowrap font-bold ${match.elo_change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {match.elo_change > 0 ? '+' : ''}{match.elo_change}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-cyan-400 hover:text-cyan-300 mr-3">Review</button>
                  <button className="text-purple-400 hover:text-purple-300">Share</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-cyan-500/20 flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Showing {matches.length} matches
        </div>
      </div>
    </div>
  );
};

export default History;