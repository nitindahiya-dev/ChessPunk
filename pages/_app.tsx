import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;