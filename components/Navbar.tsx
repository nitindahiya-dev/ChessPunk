import Link from 'next/link';

export const Navbar: React.FC = () => (
    <nav className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">ChessPunk</Link>
            <div className="space-x-4">
                <Link href="/" className="hover:text-gray-300">Home</Link>
                <Link href="/" className="hover:text-gray-300">About</Link>
                <Link href="/" className="hover:text-gray-300">Profile</Link>
            </div>
        </div>
    </nav>
);