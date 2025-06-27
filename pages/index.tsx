import { NextPage } from 'next';
import BackgroundGrid from '../components/home/BackgroundGrid';
import Hero from '../components/home/Hero';
import ChessBoard from '../components/home/ChessBoard';
import Features from '../components/home/Features';
import PlayerSpotlight from '../components/home/PlayerSpotlight';
import TournamentCountdown from '../components/home/TournamentCountdown';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <BackgroundGrid />
      <Hero />
      <ChessBoard />
      <Features />
      <PlayerSpotlight />
      <TournamentCountdown />
    </div>
  );
};

export default Home;