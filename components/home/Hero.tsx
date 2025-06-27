import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '../Button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !heroRef.current) return;

    // Hero animations
    gsap.fromTo(
      '.hero-title',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );
    gsap.fromTo(
      '.hero-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.4 }
    );
    gsap.fromTo(
      '.hero-button',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6 }
    );

    // Animated chess pieces
    const pieces = ['♔', '♕', '♖', '♗', '♘', '♙'];
    const container = heroRef.current;

    for (let i = 0; i < 20; i++) {
      const piece = document.createElement('div');
      piece.className = 'absolute text-2xl opacity-70';
      piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.top = `${Math.random() * 100}%`;
      piece.style.color = Math.random() > 0.5 ? '#00FFC2' : '#7B61FF';
      container.appendChild(piece);

      gsap.to(piece, {
        y: (Math.random() - 0.5) * 100,
        x: (Math.random() - 0.5) * 100,
        duration: 3 + Math.random() * 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      gsap.killTweensOf('.hero-title, .hero-subtitle, .hero-button');
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-[100px]"></div>

      <div className="relative z-10 text-center max-w-4xl">
        <h1 className="hero-title text-5xl md:text-7xl font-extrabold mb-6">
          <span className="text-cyan-400">Chess</span>
          <span className="text-purple-500">Punk</span>
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
          The ultimate <span className="text-cyan-400">Web3 chess experience</span> — play, compete, and earn{' '}
          <span className="text-purple-400">crypto rewards</span>
        </p>
        <div className="hero-button flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => alert('Start Playing!')} variant="glow" className="text-lg">
            Play Now
          </Button>
          <Button onClick={() => console.log('Explore Tournaments')} variant="secondary" className="text-lg">
            Join Tournament
          </Button>
        </div>
      </div>

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
  );
};

export default Hero;