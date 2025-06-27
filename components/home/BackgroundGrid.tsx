import { useEffect } from 'react';
import gsap from 'gsap';

const BackgroundGrid = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
      gsap.to(item, {
        opacity: 0.03,
        duration: 2 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => {
      gsap.killTweensOf('.grid-item');
    };
  }, []);

  return (
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
  );
};

export default BackgroundGrid;