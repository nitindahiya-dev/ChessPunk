// pages/index.tsx
import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../components/Button';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Home: NextPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const tournamentRef = useRef<HTMLDivElement>(null);
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Only run animations in the browser
    if (typeof window === 'undefined') return;

    // Set up tournament countdown
    const tournamentDate = new Date();
    tournamentDate.setDate(tournamentDate.getDate() + 3); // 3 days from now
    tournamentDate.setHours(18, 0, 0); // 6 PM
    
    const updateCountdown = () => {
      const now = new Date();
      const diff = tournamentDate.getTime() - now.getTime();
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Only run animations in the browser
    if (typeof window === 'undefined') return;

    // Hero section animations
    gsap.fromTo('.hero-title', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );

    gsap.fromTo('.hero-subtitle', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.4 }
    );

    gsap.fromTo('.hero-button', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6 }
    );

    // Animated chess pieces
    const pieces = ['♔', '♕', '♖', '♗', '♘', '♙'];
    const container = heroRef.current;
    
    if (container) {
      for (let i = 0; i < 20; i++) {
        const piece = document.createElement('div');
        piece.className = 'absolute text-2xl opacity-70';
        piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.top = `${Math.random() * 100}%`;
        piece.style.color = Math.random() > 0.5 ? '#00FFC2' : '#7B61FF';
        container.appendChild(piece);
        
        // Animate each piece
        gsap.to(piece, {
          y: (Math.random() - 0.5) * 100,
          x: (Math.random() - 0.5) * 100,
          duration: 3 + Math.random() * 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    }

    // Chess board animation
    if (boardRef.current) {
      const squares = boardRef.current.querySelectorAll('.board-square');
      
      gsap.fromTo(squares, 
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          stagger: {
            each: 0.05,
            from: 'random'
          },
          scrollTrigger: {
            trigger: boardRef.current,
            start: 'top 80%',
          }
        }
      );
    }

    // Features animation
    if (featuresRef.current) {
      gsap.fromTo('.feature-item', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 85%',
          }
        }
      );
    }
    
    // Spotlight animation
    if (spotlightRef.current) {
      gsap.fromTo('.player-card', 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          stagger: 0.3,
          scrollTrigger: {
            trigger: spotlightRef.current,
            start: 'top 85%',
          }
        }
      );
      
      // Trophy animations
      gsap.fromTo('.trophy', 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: spotlightRef.current,
            start: 'top 85%',
          }
        }
      );
    }
    
    // Tournament animation
    if (tournamentRef.current) {
      gsap.fromTo('.countdown-item', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7,
          stagger: 0.1,
          scrollTrigger: {
            trigger: tournamentRef.current,
            start: 'top 85%',
          }
        }
      );
      
      gsap.fromTo('.prize-glow', 
        { opacity: 0, scale: 0.5 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        }
      );
    }

    // Background grid animation
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
      gsap.to(item, {
        opacity: 0.03,
        duration: 2 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    return () => {
      // Clean up animations
      gsap.killTweensOf('.hero-title, .hero-subtitle, .hero-button, .feature-item, .board-square, .player-card, .trophy, .countdown-item');
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background grid */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1">
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i} 
              className="grid-item border border-cyan-500/10 rounded-sm opacity-10"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 to-gray-900"></div>
      </div>
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      >
        {/* Animated chess pieces are created dynamically in useEffect */}
        
        {/* Neon glow effect */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-[100px]"></div>
        
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="hero-title text-5xl md:text-7xl font-extrabold mb-6">
            <span className="text-cyan-400">Chess</span>
            <span className="text-purple-500">Punk</span>
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            The ultimate <span className="text-cyan-400">Web3 chess experience</span> — play, compete, and earn <span className="text-purple-400">crypto rewards</span>
          </p>
          
          <div className="hero-button flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => alert('Start Playing!')} 
              variant="glow"
              className="text-lg"
            >
              Play Now
            </Button>
            <Button 
              onClick={() => console.log('Explore Tournaments')} 
              variant="secondary"
              className="text-lg"
            >
              Join Tournament
            </Button>
          </div>
        </div>
        
        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800/50 backdrop-blur-sm border-t border-cyan-500/20 py-4">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">24K+</div>
              <div className="text-gray-400 text-sm">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">$142K</div>
              <div className="text-gray-400 text-sm">In Prizes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">5.2K</div>
              <div className="text-gray-400 text-sm">NFTs Minted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">98%</div>
              <div className="text-gray-400 text-sm">Win Accuracy</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Interactive Board Preview */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-cyan-400">Next-Gen</span> Chess Experience
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Play with stunning cyberpunk-themed boards and pieces powered by Web3 technology
          </p>
          
          <div 
            ref={boardRef}
            className="mx-auto w-full max-w-lg aspect-square grid grid-cols-8 grid-rows-8 border-4 border-cyan-500/30 rounded-lg overflow-hidden shadow-2xl"
          >
            {Array.from({ length: 64 }).map((_, index) => {
              const row = Math.floor(index / 8);
              const col = index % 8;
              const isLight = (row + col) % 2 === 0;
              
              return (
                <div 
                  key={index}
                  className={`board-square flex items-center justify-center ${
                    isLight ? 'bg-gray-800' : 'bg-gray-900'
                  } border border-cyan-500/10`}
                >
                  {/* Add chess pieces to specific positions for visual effect */}
                  {index === 0 && <span className="text-3xl text-purple-400">♜</span>}
                  {index === 1 && <span className="text-3xl text-cyan-400">♞</span>}
                  {index === 6 && <span className="text-3xl text-cyan-400">♙</span>}
                  {index === 63 && <span className="text-3xl text-purple-400">♖</span>}
                  {index === 36 && <span className="text-3xl text-purple-400">♕</span>}
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button 
              onClick={() => console.log('Create Account')} 
              variant="secondary"
              className="text-lg"
            >
              Create Free Account
            </Button>
          </div>
        </div>
      </section>
      
      {/* Web3 Features */}
      <section 
        ref={featuresRef}
        className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 relative z-10"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-cyan-400">Web3-Powered</span> Chess Revolution
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience blockchain technology integrated into competitive chess
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="feature-item bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
              <div className="text-cyan-400 text-4xl mb-4">🪙</div>
              <h3 className="text-xl font-bold mb-2">Crypto Rewards</h3>
              <p className="text-gray-400">
                Win real cryptocurrency prizes in competitive matches and tournaments
              </p>
            </div>
            
            <div className="feature-item bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <div className="text-purple-400 text-4xl mb-4">🎴</div>
              <h3 className="text-xl font-bold mb-2">NFT Collectibles</h3>
              <p className="text-gray-400">
                Collect limited edition chess pieces, boards, and player avatars
              </p>
            </div>
            
            <div className="feature-item bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
              <div className="text-cyan-400 text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">Provably Fair</h3>
              <p className="text-gray-400">
                Transparent match results secured on the blockchain with smart contracts
              </p>
            </div>
            
            <div className="feature-item bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <div className="text-purple-400 text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">On-chain Stats</h3>
              <p className="text-gray-400">
                Your chess achievements permanently recorded on the blockchain
              </p>
            </div>
            
            <div className="feature-item bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
              <div className="text-cyan-400 text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Tournaments</h3>
              <p className="text-gray-400">
                Compete in high-stakes tournaments with guaranteed prize pools
              </p>
            </div>
            
            <div className="feature-item bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <div className="text-purple-400 text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">DAO Governance</h3>
              <p className="text-gray-400">
                Vote on platform features and tournament rules as a community
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Player Spotlight Section */}
      <section 
        ref={spotlightRef}
        className="py-20 bg-gradient-to-b from-gray-950 to-gray-900 relative z-10"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-cyan-400">Player</span> Spotlight
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Meet our top players and see their impressive NFT trophy collections
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Player 1 */}
            <div className="player-card bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-cyan-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">♛</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">CyberQueen</h3>
                  <div className="flex items-center">
                    <span className="text-cyan-400 mr-2">ELO 2150</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Wins</span>
                  <span className="font-bold">124</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Win Rate</span>
                  <span className="font-bold text-cyan-400">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Earnings</span>
                  <span className="font-bold text-purple-400">5.2 ETH</span>
                </div>
              </div>
              
              <h4 className="text-lg font-bold mb-3 text-cyan-400">NFT Trophies</h4>
              <div className="flex justify-between">
                <div className="trophy bg-gradient-to-br from-cyan-500/20 to-purple-600/20 w-16 h-16 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="trophy bg-gradient-to-br from-cyan-500/20 to-purple-600/20 w-16 h-16 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🥇</span>
                </div>
                <div className="trophy bg-gradient-to-br from-cyan-500/20 to-purple-600/20 w-16 h-16 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚔️</span>
                </div>
              </div>
            </div>
            
            {/* Player 2 */}
            <div className="player-card bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-cyan-600 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">♚</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">NeonKing</h3>
                  <div className="flex items-center">
                    <span className="text-purple-400 mr-2">ELO 2280</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Wins</span>
                  <span className="font-bold">187</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Win Rate</span>
                  <span className="font-bold text-cyan-400">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Earnings</span>
                  <span className="font-bold text-purple-400">8.7 ETH</span>
                </div>
              </div>
              
              <h4 className="text-lg font-bold mb-3 text-purple-400">NFT Trophies</h4>
              <div className="flex justify-between">
                <div className="trophy bg-gradient-to-br from-purple-500/20 to-cyan-600/20 w-16 h-16 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="trophy bg-gradient-to-br from-purple-500/20 to-cyan-600/20 w-16 h-16 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🥇</span>
                </div>
                <div className="trophy bg-gradient-to-br from-purple-500/20 to-cyan-600/20 w-16 h-16 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
              </div>
            </div>
            
            {/* Player 3 */}
            <div className="player-card bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/50 transition-all transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-cyan-400 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">♝</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">CryptoBishop</h3>
                  <div className="flex items-center">
                    <span className="text-cyan-400 mr-2">ELO 2050</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Wins</span>
                  <span className="font-bold">96</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Win Rate</span>
                  <span className="font-bold text-cyan-400">83%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Earnings</span>
                  <span className="font-bold text-purple-400">3.8 ETH</span>
                </div>
              </div>
              
              <h4 className="text-lg font-bold mb-3 text-cyan-400">NFT Trophies</h4>
              <div className="flex justify-between">
                <div className="trophy bg-gradient-to-br from-cyan-400/20 to-purple-500/20 w-16 h-16 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="trophy bg-gradient-to-br from-cyan-400/20 to-purple-500/20 w-16 h-16 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🥈</span>
                </div>
                <div className="trophy bg-gradient-to-br from-cyan-400/20 to-purple-500/20 w-16 h-16 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚔️</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={() => console.log('View all players')} 
              variant="glow"
              className="text-lg"
            >
              View Leaderboard
            </Button>
          </div>
        </div>
      </section>
      
      {/* Tournament Countdown Section */}
      <section 
        ref={tournamentRef}
        className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 relative z-10 overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full filter blur-[100px]"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-cyan-400">Upcoming</span> Mega Tournament
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join our biggest tournament yet with massive crypto prizes
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 relative overflow-hidden">
            {/* Prize pool glow */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-[80px] prize-glow"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                <div className="text-center md:text-left mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-2">CyberPunk Grandmaster</h3>
                  <p className="text-gray-400">July 15, 2025 @ 18:00 UTC</p>
                </div>
                
                <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-0.5 rounded-full">
                  <div className="bg-gray-900 px-6 py-2 rounded-full">
                    <div className="flex items-center">
                      <span className="text-cyan-400 mr-2">Entry Fee:</span>
                      <span className="font-bold">0.1 ETH</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-10">
                <h4 className="text-lg font-bold mb-4 text-center text-cyan-400">Prize Pool</h4>
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 px-8 py-4 rounded-xl">
                    <div className="text-4xl font-bold text-purple-400">10 ETH</div>
                    <div className="text-gray-400 mt-2">+ Exclusive NFT for top 3</div>
                  </div>
                </div>
              </div>
              
              <h4 className="text-lg font-bold mb-6 text-center">Tournament Starts In</h4>
              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="countdown-item bg-gray-900/70 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-cyan-400">{timeLeft.days}</div>
                  <div className="text-gray-400">Days</div>
                </div>
                <div className="countdown-item bg-gray-900/70 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-cyan-400">{timeLeft.hours}</div>
                  <div className="text-gray-400">Hours</div>
                </div>
                <div className="countdown-item bg-gray-900/70 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-cyan-400">{timeLeft.minutes}</div>
                  <div className="text-gray-400">Minutes</div>
                </div>
                <div className="countdown-item bg-gray-900/70 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-cyan-400">{timeLeft.seconds}</div>
                  <div className="text-gray-400">Seconds</div>
                </div>
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => console.log('Register for tournament')} 
                  variant="glow"
                  className="text-lg"
                >
                  Register Now
                </Button>
                <Button 
                  onClick={() => console.log('Learn more')} 
                  variant="secondary"
                  className="text-lg"
                >
                  Tournament Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;