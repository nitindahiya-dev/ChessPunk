//pages/_app.tsx
import { WalletProvider } from '../context/WalletContext';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </WalletProvider>
  );
}

export default MyApp;