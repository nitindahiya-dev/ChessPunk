import { userData } from '../../data/data';

const Analysis = () => {
  const isPremium = userData.premiumMember;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">🧪 Game Analysis</h2>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-cyan-400">Recent Game Analysis</h3>
            <button className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 py-1 px-3 rounded-lg text-sm">
              Analyze New Game
            </button>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="font-bold">vs NeonKing</div>
                <div className="text-sm text-gray-400">2025-06-25 | Win in 32 moves</div>
              </div>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">COMPLETE</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="text-cyan-400 font-bold">Accuracy</div>
                <div className="text-2xl font-bold mt-1">87%</div>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="text-cyan-400 font-bold">Blunders</div>
                <div className="text-2xl font-bold mt-1">2</div>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="text-cyan-400 font-bold">Best Move</div>
                <div className="text-2xl font-bold mt-1">Qe7</div>
              </div>
            </div>
            <button className="mt-4 w-full py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg">
              View Full Analysis
            </button>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="font-bold">vs EtherQueen</div>
                <div className="text-sm text-gray-400">2025-06-20 | Draw in 40 moves</div>
              </div>
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold">PENDING</span>
            </div>
            <div className="text-gray-400 text-sm">
              Analysis in progress... (Premium feature)
            </div>
          </div>
        </div>
        {!isPremium && (
          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">🔒 Premium Analysis Features</h3>
            <p className="mb-4">
              Upgrade to Premium to unlock advanced analysis tools, including:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Deep game analysis with engine evaluation</li>
              <li>Mistake detection with suggested improvements</li>
              <li>Opening explorer and repertoire builder</li>
              <li>Personalized training recommendations</li>
              <li>Unlimited analysis of past games</li>
            </ul>
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-2 px-6 rounded-lg font-bold">
              Upgrade to Premium
            </button>
          </div>
        )}
      </div>
      <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">📈 Performance Insights</h2>
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-cyan-400">Accuracy by Phase</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Opening</span>
                <span>92%</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Middlegame</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Endgame</span>
                <span>78%</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4 text-cyan-400">Common Mistakes</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
              <div className="bg-red-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                <span>❗</span>
              </div>
              <div>
                <div className="font-medium">Missed Tactics</div>
                <div className="text-sm text-gray-400">8 missed opportunities in last 10 games</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
              <div className="bg-yellow-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                <span>⏱️</span>
              </div>
              <div>
                <div className="font-medium">Time Management</div>
                <div className="text-sm text-gray-400">Often low on time in critical positions</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
              <div className="bg-purple-500/20 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                <span>♟️</span>
              </div>
              <div>
                <div className="font-medium">Opening Knowledge</div>
                <div className="text-sm text-gray-400">Struggles with Sicilian Defense</div>
              </div>
            </div>
          </div>
          <button className="mt-4 w-full py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg">
            View Improvement Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analysis;