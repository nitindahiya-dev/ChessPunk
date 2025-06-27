// components/docs/DocsRightNav.tsx
import { useEffect, useState } from "react";

export default function DocsRightNav() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll('article h2, article h3')
    );

    const parsedHeadings = headingElements.map((element) => ({
      id: element.id || element.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      text: element.textContent || '',
      level: parseInt(element.tagName.charAt(1)), // H2 -> 2, H3 -> 3
    }));

    setHeadings(parsedHeadings);
  }, []);

  return (
    <aside className="sticky top-24 bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6">
      <h3 className="font-bold text-lg mb-4 text-cyan-300 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        On this page
      </h3>
      
      <ul className="space-y-2 border-l border-cyan-500/30 pl-4">
        {headings.map((heading) => (
          <li key={heading.id} className={`${heading.level === 3 ? 'pl-4' : ''}`}>
            <a
              href={`#${heading.id}`}
              className="flex items-start text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <div className="mt-1.5 mr-2">
                {heading.level === 2 ? (
                  <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                )}
              </div>
              <span>{heading.text}</span>
            </a>
          </li>
        ))}
      </ul>
      
      {/* Quick Reference */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <h3 className="font-bold mb-3 text-purple-300">Quick Reference</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Chess Notation Guide
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Tournament Rules
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Earning Strategies
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              NFT Value Guide
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}