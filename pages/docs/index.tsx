// pages/docs/index.tsx
import Link from 'next/link';
import { docsSidebar } from '../../data/docsNav';
import DocsLayout from '../../components/docs/DocsLayout';

export default function DocsIndex() {
  return (
    <DocsLayout>
      <article>
        <div className="mb-8">
          <div className="inline-block px-4 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium mb-4">
            Welcome to ChessPunk
          </div>
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            ChessPunk Documentation
          </h1>
          <p className="text-xl text-gray-300">
            Everything you need to know about playing, earning, and dominating the cyber chess arena.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docsSidebar.map((item) => (
            <Link 
              key={item.slug} 
              href={`/docs/${item.slug}`}
              className="border border-cyan-500/30 rounded-xl p-6 bg-gray-800/50 hover:bg-cyan-500/10 transition-all group"
            >
              <h2 className="text-2xl font-bold mb-3 text-cyan-400 group-hover:text-white transition-colors">
                {item.title}
              </h2>
              <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
                Learn about {item.title.toLowerCase()} and how to maximize your experience.
              </p>
              <div className="mt-4 flex items-center text-sm text-cyan-500 group-hover:text-cyan-300 transition-colors">
                Read guide
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Create Account</h3>
              <p className="text-gray-400 text-sm">Connect your wallet and create your ChessPunk identity</p>
            </div>
            
            <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Join Community</h3>
              <p className="text-gray-400 text-sm">Connect with other players and learn strategies</p>
            </div>
            
            <div className="bg-gray-800/50 border border-yellow-500/30 rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Start Earning</h3>
              <p className="text-gray-400 text-sm">Play matches, win tournaments, and collect rewards</p>
            </div>
          </div>
        </div>
      </article>
    </DocsLayout>
  );
}