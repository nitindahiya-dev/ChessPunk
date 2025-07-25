//pages/tournaments.tsx

import { GetStaticProps } from 'next';
import { prisma } from '../prisma/prisma';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { CreateTournamentModal } from '../components/CreateTournamentModal';

interface Tournament {
  id: number;
  name: string;
  entryFee: number;
  prize: string;
  participants: number;
  maxPlayers: number;
  status: string;
  startsAt: string;
}

type Props = {
  activeTournaments: Tournament[];
  upcomingTournaments: Tournament[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const rawActive = await prisma.tournament.findMany({ where: { status: 'Live' }, orderBy: { startsAt: 'asc' } });
  const rawUpcoming = await prisma.tournament.findMany({ where: { status: 'Upcoming' }, orderBy: { startsAt: 'asc' } });

  const activeTournaments = rawActive.map(t => ({
  id: t.id,
  name: t.name,
  entryFee: t.entryFee,
  prize: t.prize,
  participants: t.participants,
  maxPlayers: t.maxPlayers,
  status: t.status,
  startsAt: t.startsAt.toISOString(),
}));
  const upcomingTournaments = rawUpcoming.map(t => ({
  id: t.id,
  name: t.name,
  entryFee: t.entryFee,
  prize: t.prize,
  participants: t.participants,
  maxPlayers: t.maxPlayers,
  status: t.status,
  startsAt: t.startsAt.toISOString(),
}));

  return { props: { activeTournaments, upcomingTournaments }, revalidate: 60 };
};

const TournamentsPage: React.FC<Props> = ({ activeTournaments, upcomingTournaments }) => {
  const router = useRouter();
  const [showCreate, setShowCreate] = useState(false);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this tournament?')) return;
    await fetch(`/api/tournaments/${id}`, { method: 'DELETE' });
    router.replace(router.asPath);
  };

  return (
    <>
      <CreateTournamentModal show={showCreate} onClose={() => setShowCreate(false)} />

      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10 border-b border-cyan-500 pb-4">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              TOURNAMENTS
            </h1>
            <button
              onClick={() => setShowCreate(true)}
              className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg font-bold text-lg"
            >
              Create Tournament
            </button>
          </div>

          {/* Active */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              LIVE TOURNAMENTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeTournaments.map(t => (
                <div key={t.id} className="relative bg-gray-800 border-2 border-cyan-500 rounded-xl p-6 transform hover:scale-105 transition">
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button onClick={() => router.push(`/tournaments/edit/${t.id}`)} className="px-2 py-1 bg-yellow-500 rounded text-xs">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(t.id)} className="px-2 py-1 bg-red-600 rounded text-xs">
                      Delete
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-cyan-300">{t.name}</h3>
                  <p className="mt-2">Entry Fee: {t.entryFee} ETH</p>
                  <p>Prize: {t.prize}</p>
                  <p>Participants: {t.participants}/{t.maxPlayers}</p>
                  <p>Starts: {new Date(t.startsAt).toLocaleString()}</p>
                  {/* <button onClick={() => router.push(`/tournaments/${t.id}`)} className="mt-4 w-full py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg text-white font-bold">
                    View Details
                  </button> */}
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              UPCOMING EVENTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingTournaments.map(t => (
                <div key={t.id} className="relative bg-gray-800 border-2 border-purple-500 rounded-xl p-6 hover:border-cyan-500 transition">
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button onClick={() => router.push(`/tournaments/edit/${t.id}`)} className="px-2 py-1 bg-yellow-500 rounded text-xs">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(t.id)} className="px-2 py-1 bg-red-600 rounded text-xs">
                      Delete
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-purple-300">{t.name}</h3>
                  <p className="mt-2">Entry Fee: {t.entryFee === 0 ? <span className="text-green-400">FREE</span> : `${t.entryFee} ETH`}</p>
                  <p>Prize: {t.prize}</p>
                  <p>Starts: {new Date(t.startsAt).toLocaleString()}</p>
                  {/* <button onClick={() => router.push(`/tournaments/${t.id}`)} className="mt-4 px-4 py-2 bg-gray-700 rounded-lg font-medium hover:bg-gray-600 transition">
                    View Details
                  </button> */}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default TournamentsPage;
