// components/docs/DocsLayout.tsx
import React from 'react';
import DocsSidebar from './DocsSidebar';
import DocsRightNav from './DocsRightNav';
import { MDXProvider } from '@mdx-js/react';
import { Callout } from '../../components/ui/Callout'  // adjust if your alias is different


const mdxComponents = {
  Callout,
  // add more here if you have other MDX-only components (e.g. YouTube, Chart)
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
        <MDXProvider components={mdxComponents}>

    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Cyberpunk Glow Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-[150px] opacity-10"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500 rounded-full filter blur-[150px] opacity-10"></div>
      </div>
      
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <DocsSidebar />
          </div>
          
          <div className="lg:col-span-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 md:p-8">
              {children}
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <DocsRightNav />
          </div>
        </div>
      </div>
    </div>
    </MDXProvider>
  );
}