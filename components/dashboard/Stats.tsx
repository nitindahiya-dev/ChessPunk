import { userData } from '../../data/data';

const getRankBadge = (elo: number) => {
  if (elo >= 2400) return { title: "Grandmaster", color: "text-red-500", icon: "♕" };
  if (elo >= 2200) return { title: "International Master", color: "text-purple-500", icon: "♔" };
  if (elo >= 2000) return { title: "Master", color: "text-blue-400", icon: "♖" };
  if (elo >= 1800) return { title: "Expert", color: "text-green-400", icon: "♗" };
  if (elo >= 1600) return { title: "Advanced", color: "text-yellow-400", icon: "♘" };
  return { title: "Player", color: "text-gray-400", icon: "♙" };
};

const Stats = () => {
  const rankBadge = getRankBadge(userData.eloRating);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">🎖 ELO Rating</h2>
        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-6xl font-bold text-cyan-400 mb-2">{userData.eloRating}</div>
          <div className={`text-lg font-bold ${rankBadge.color}`}>
            {rankBadge.icon} {rankBadge.title}
          </div>
          <div className="mt-8 w-full max-w-md">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Progress to next rank</span>
              <span className="text-cyan-400">85%</span>
            </div>
            <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-purple-600 h-full"
                style={{ width: '85%' }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-400">Master (2000)</span>
              <span className="text-gray-400">Grandmaster (2400)</span>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">📊 Performance Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-700/50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-cyan-400">{userData.matchesPlayed}</div>
            <div className="text-gray-400">Matches</div>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-400">{userData.wins}</div>
            <div className="text-gray-400">Wins</div>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-red-400">{userData.losses}</div>
            <div className="text-gray-400">Losses</div>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-400">{userData.winRate}%</div>
            <div className="text-gray-400">Win Rate</div>
          </div>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-4 text-cyan-400">ELO History (Last 30 Days)</h3>
          <div className="h-64 flex items-end space-x-1">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-cyan-500 to-purple-600 rounded-t"
                style={{ height: `${Math.floor(Math.random() * 60) + 40}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-gray-400 text-sm">
            <span>30d ago</span>
            <span>Now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;