import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Button } from '../Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TournamentCountdown = () => {
  const tournamentRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const tournamentDate = new Date();
    tournamentDate.setDate(tournamentDate.getDate() + 3);
    tournamentDate.setHours(18, 0, 0);

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

    if (tournamentRef.current) {
      gsap.fromTo(
        '.countdown-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          scrollTrigger: { trigger: tournamentRef.current, start: 'top 85%' },
        }
      );
      gsap.fromTo(
        '.prize-glow',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.5, repeat: -1, yoyo: true, ease: 'power1.inOut' }
      );
    }

    return () => {
      clearInterval(timer);
      gsap.killTweensOf('.countdown-item, .prize-glow');
    };
  }, []);

  return (
    <section ref={tournamentRef} className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 relative z-10 overflow-hidden">
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
              <Button onClick={() => console.log('Register for tournament')} variant="glow" className="text-lg">
                Register Now
              </Button>
              <Button onClick={() => console.log('Learn more')} variant="secondary" className="text-lg">
                Tournament Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentCountdown;