//pages/tournaments/edit/[id].tsx

import { GetServerSideProps } from 'next';
import { prisma } from '../../../prisma/prisma';
import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

interface Tournament {
  id: number;
  name: string;
  entryFee: number;
  prize: string;
  participants: number;
  maxPlayers: number;
  status: string;
  startsAt: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  tournament: Tournament;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const id = Number(params?.id);
  const t = await prisma.tournament.findUnique({ where: { id } });
  if (!t) return { notFound: true };
  return {
    props: {
      tournament: {
        id: t.id,
        name: t.name,
        entryFee: t.entryFee,
        prize: t.prize,
        participants: t.participants,
        maxPlayers: t.maxPlayers,
        status: t.status,
        startsAt: t.startsAt.toISOString(),
        createdAt: t.createdAt.toISOString(),
        updatedAt: t.updatedAt.toISOString(),
      }
    }
  };
};

const TournamentDetail: React.FC<Props> = ({ tournament }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: tournament.name,
    entryFee: tournament.entryFee.toString(),
    prize: tournament.prize,
    maxPlayers: tournament.maxPlayers.toString(),
    status: tournament.status,
    startsAt: tournament.startsAt.slice(0, 16),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = async () => {
    await fetch(`/api/tournaments/${tournament.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        entryFee: parseFloat(form.entryFee),
        prize: form.prize,
        maxPlayers: parseInt(form.maxPlayers, 10),
        status: form.status,
        startsAt: form.startsAt,
      }),
    });
    setIsEditing(false);
    router.replace(router.asPath);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <button
        onClick={() => router.push('/tournaments')}
        className="mb-6 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
      >
        ← Back to Tournaments
      </button>

      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl">
        {isEditing ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Edit Tournament</h2>
            <div className="space-y-4">
              {['name','entryFee','prize','maxPlayers'].map(field => (
                <input
                  key={field}
                  name={field}
                  value={form[field as keyof typeof form]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                />
              ))}
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              >
                {['Upcoming','Live','Finished'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <input
                type="datetime-local"
                name="startsAt"
                value={form.startsAt}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-cyan-600 rounded hover:bg-cyan-500 font-bold"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">{tournament.name}</h1>
            {['Status','Entry Fee','Prize','Participants','Max Players','Starts At','Created At','Last Updated'].map((label, idx) => {
              const value = {
                'Status': tournament.status,
                'Entry Fee': tournament.entryFee===0? 'FREE':`${tournament.entryFee} ETH`,
                'Prize': tournament.prize,
                'Participants': `${tournament.participants} / ${tournament.maxPlayers}`,
                'Max Players': tournament.maxPlayers,
                'Starts At': new Date(tournament.startsAt).toLocaleString(),
                'Created At': new Date(tournament.createdAt).toLocaleString(),
                'Last Updated': new Date(tournament.updatedAt).toLocaleString(),
              }[label];
              return <p key={idx} className="mb-2"><strong>{label}:</strong> {value}</p>;
            })}
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-400"
            >
              Edit Tournament
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TournamentDetail;
