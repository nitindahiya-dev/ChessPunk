import { NextPage } from 'next';
import BackgroundGrid from '../components/home/BackgroundGrid';
import Hero from '../components/home/Hero';
import HomeChessBoard from '../components/home/HomeChessBoard';
import Features from '../components/home/Features';
import PlayerSpotlight from '../components/home/PlayerSpotlight';
import TournamentCountdown from '../components/home/TournamentCountdown';
import PlayControls from '../components/PlayControls';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <BackgroundGrid />
      <Hero onPlayNowClick={() => {}} /> {/* Update if Hero needs to trigger PlayControls */}
      <PlayControls />
      <HomeChessBoard />
      <Features />
      <PlayerSpotlight />
      <TournamentCountdown />
    </div>
  );
};

export default Home;