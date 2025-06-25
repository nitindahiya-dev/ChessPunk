import type { NextPage } from 'next';
import { Button } from '../components/Button';

const Home: NextPage = () => {
  return (
    <div className="text-center text-white">
      <h1 className="text-4xl font-bold mb-4 ">Welcome to ChessPunk</h1>
      <p className="mb-6 text-lg">
        Discover the ultimate Web3 chess experience—play, compete, and earn rewards!
      </p>
      <h2 className='mb-10 text-6xl h-96 pt-24 font-bold'>Under Contruction</h2>
      <Button onClick={() => alert('Start Playing!')}>Get Started</Button>
    </div>
  );
};

export default Home;