import { NextPage } from 'next';
import BackgroundGrid from '../components/home/BackgroundGrid';
import Hero from '../components/home/Hero';
import ChessBoard from '../components/home/ChessBoard';
import Features from '../components/home/Features';
import PlayerSpotlight from '../components/home/PlayerSpotlight';
import TournamentCountdown from '../components/home/TournamentCountdown';
import { PlayControls } from '../components/PlayControls';
import { useState } from 'react';

const Home: NextPage = () => {
  const [showPlayModal, setShowPlayModal] = useState(false);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <BackgroundGrid />
      <Hero onPlayNowClick={() => setShowPlayModal(true)} />
      <PlayControls showModal={showPlayModal} onClose={() => setShowPlayModal(false)} />      <ChessBoard />
      <Features />
      <PlayerSpotlight />
      <TournamentCountdown />
    </div>
  );
};

export default Home;