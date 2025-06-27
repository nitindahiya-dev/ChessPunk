import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-repeat bg-[length:50px_50px] opacity-5 z-0"></div>
      
      {/* Glowing Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-[100px] opacity-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-[100px] opacity-10"></div>
      
      {/* Circuit Board Patterns */}
      <div className="absolute top-0 left-0 w-full h-16 bg-circuit-pattern bg-repeat-x opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-circuit-pattern bg-repeat-x opacity-5 rotate-180"></div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center">
          {/* Glitch Effect Title */}
          <div className="relative">
            <h1 className="text-[180px] md:text-[240px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-0 leading-none">
              4<span className="text-yellow-400">0</span>4
            </h1>
            <div className="absolute top-0 left-0 w-full h-full">
              <h1 className="text-[180px] md:text-[240px] font-bold text-transparent opacity-20 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-0 leading-none animate-glitch1">
                4<span className="text-yellow-400">0</span>4
              </h1>
            </div>
            <div className="absolute top-0 left-0 w-full h-full">
              <h1 className="text-[180px] md:text-[240px] font-bold text-transparent opacity-30 bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-0 leading-none animate-glitch2">
                4<span className="text-yellow-400">0</span>4
              </h1>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-300">
            <span className="text-yellow-400">ERROR</span> 404: BOARD NOT FOUND
          </h2>
          
          <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto">
            The chessboard {`you're`} looking for has been captured or moved to another dimension. 
            Check the coordinates and try again, or return to the main arena.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/" 
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg font-bold text-lg hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              RETURN TO HOMEPAGE
            </Link>
            
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-gray-800 border border-cyan-500/30 rounded-lg font-bold text-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.35-.03-.69-.084-1.016A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
              GO TO DASHBOARD
            </Link>
          </div>
        </div>
        
        {/* Chess Pieces Floating */}
        <div className="absolute top-1/4 left-10 w-16 h-16 opacity-30 animate-float1">
          <div className="w-full h-full bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-3xl">♛</span>
          </div>
        </div>
        <div className="absolute top-1/3 right-20 w-12 h-12 opacity-40 animate-float2">
          <div className="w-full h-full bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-2xl">♜</span>
          </div>
        </div>
        <div className="absolute bottom-1/4 left-1/3 w-10 h-10 opacity-50 animate-float3">
          <div className="w-full h-full bg-gray-500 rounded-full flex items-center justify-center">
            <span className="text-xl">♝</span>
          </div>
        </div>
        <div className="absolute bottom-1/3 right-1/4 w-14 h-14 opacity-30 animate-float4">
          <div className="w-full h-full bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-2xl">♞</span>
          </div>
        </div>
      </div>
      
      {/* Terminal-like Footer */}
      <div className="absolute bottom-0 left-0 w-full bg-black/30 border-t border-cyan-500/20 p-4 text-sm text-cyan-400 font-mono flex items-center">
        <div className="animate-pulse mr-2">$</div>
        <div className="terminal-text">
          ERROR: Page not found. Possible causes: invalid URL, broken quantum link, or interdimensional interference. 
          Recommend returning to known coordinates...
        </div>
      </div>
      
      {/* CSS styles */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0, 255, 194, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 194, 0.1) 1px, transparent 1px);
        }
        
        .bg-circuit-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 16.298 1.222 26.286 5.306.843.343 1.669.624 2.477.852.71.2 1.408.37 2.094.507.614.124 1.217.227 1.809.309l.516.062.265.029c.01 0 .019.002.029.004L86 21l-.048-.002c-.01-.001-.019-.004-.029-.004l-.265-.029-.516-.062c-.592-.082-1.195-.185-1.809-.309-.686-.137-1.384-.307-2.094-.507-.808-.228-1.634-.509-2.477-.852C66.298 15.222 60.271 14 50 14c-10.353 0-16.36 1.347-25.952 4.937l-1.768.661c-.368.138-.731.272-1.088.402l.001-.001.001.001z' fill='%2300FFC2' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
        
        .terminal-text {
          overflow: hidden;
          border-right: .15em solid #00FFC2;
          white-space: nowrap;
          animation: 
            typing 6s steps(100, end) infinite,
            blink-caret .75s step-end infinite;
        }
        
        @keyframes typing {
          0% { width: 0 }
          50% { width: 100% }
          100% { width: 100% }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #00FFC2; }
        }
        
        @keyframes glitch1 {
          0% { transform: translateX(0); opacity: 0.2; }
          5% { transform: translateX(-3px); opacity: 0.3; }
          10% { transform: translateX(3px); opacity: 0.4; }
          15% { transform: translateX(0); opacity: 0.2; }
          20% { transform: translateX(-5px); opacity: 0.3; }
          25% { transform: translateX(5px); opacity: 0.4; }
          30% { transform: translateX(0); opacity: 0.2; }
          100% { transform: translateX(0); opacity: 0.2; }
        }
        
        @keyframes glitch2 {
          0% { transform: translateX(0); opacity: 0.3; }
          7% { transform: translateX(2px); opacity: 0.4; }
          12% { transform: translateX(-2px); opacity: 0.5; }
          17% { transform: translateX(0); opacity: 0.3; }
          22% { transform: translateX(4px); opacity: 0.4; }
          27% { transform: translateX(-4px); opacity: 0.5; }
          32% { transform: translateX(0); opacity: 0.3; }
          100% { transform: translateX(0); opacity: 0.3; }
        }
        
        .animate-glitch1 {
          animation: glitch1 4s infinite;
        }
        
        .animate-glitch2 {
          animation: glitch2 5s infinite;
        }
        
        .animate-float1 {
          animation: float 12s ease-in-out infinite;
        }
        
        .animate-float2 {
          animation: float 15s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float3 {
          animation: float 10s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float4 {
          animation: float 14s ease-in-out infinite;
          animation-delay: 3s;
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;