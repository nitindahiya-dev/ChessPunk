// components/docs/DocsSidebar.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { docsSidebar } from '../../data/docsNav';

export default function DocsSidebar() {
  const router = useRouter();
  const currentSlug = router.query.slug || '';

  return (
    <aside className="sticky top-24 bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Documentation
      </h2>
      
      <div className="space-y-1">
        {docsSidebar.map((item) => (
          <Link
            key={item.slug}
            href={`/docs/${item.slug}`}
            className={`flex items-center px-4 py-3 rounded-lg transition-all group ${
              currentSlug === item.slug
                ? 'bg-gradient-to-r from-cyan-600/30 to-purple-600/30 border-l-4 border-cyan-500 text-cyan-400'
                : 'hover:bg-gray-700/50 hover:border-l-4 hover:border-cyan-500/50'
            }`}
          >
            <div className={`w-3 h-3 rounded-full mr-3 ${
              currentSlug === item.slug 
                ? 'bg-cyan-500 animate-pulse' 
                : 'bg-gray-500 group-hover:bg-cyan-500'
            }`}></div>
            <span className="font-medium">{item.title}</span>
          </Link>
        ))}
      </div>
      
      {/* Quick Links */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <h3 className="font-bold mb-3 text-cyan-300">Quick Links</h3>
        <div className="space-y-2">
          <a href="#" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Security Guide
          </a>
          <a href="#" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Community Forum
          </a>
          <a href="#" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Support Chat
          </a>
        </div>
      </div>
    </aside>
  );
}