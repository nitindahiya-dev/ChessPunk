import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Button } from '../Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ChessBoard = () => {
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !boardRef.current) return;

    const squares = boardRef.current.querySelectorAll('.board-square');
    gsap.fromTo(
      squares,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: { each: 0.05, from: 'random' },
        scrollTrigger: { trigger: boardRef.current, start: 'top 80%' },
      }
    );

    return () => {
      gsap.killTweensOf('.board-square');
    };
  }, []);

  return (
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
          <Button onClick={() => console.log('Create Account')} variant="secondary" className="text-lg">
            Create Free Account
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChessBoard;