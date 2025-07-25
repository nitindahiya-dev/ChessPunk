// components/CreateTournamentModal.tsx
import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { useRouter } from 'next/router';

interface CreateTournamentModalProps {
  show: boolean;
  onClose: () => void;
}

export function CreateTournamentModal({ show, onClose }: CreateTournamentModalProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    entryFee: '',
    prize: '',
    maxPlayers: '64',
    startsAt: '',
  });
  const [loading, setLoading] = useState(false);

  interface TournamentForm {
    name: string;
    entryFee: string;
    prize: string;
    maxPlayers: string;
    startsAt: string;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f: TournamentForm) => ({ ...f, [e.target.name as keyof TournamentForm]: e.target.value }));

  const handleSubmit = async () => {
    setLoading(true);
    await fetch('/api/tournaments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        entryFee: parseFloat(form.entryFee),
        prize: form.prize,
        maxPlayers: parseInt(form.maxPlayers, 10),
        startsAt: form.startsAt,
      }),
    });
    setLoading(false);
    onClose();
    router.replace(router.asPath); // refresh data
  };

  return (
    <Modal title="Create Tournament" show={show} onClose={onClose}>
      <div className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700"
        />
        <input
          name="entryFee"
          placeholder="Entry Fee (ETH)"
          value={form.entryFee}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700"
        />
        <input
          name="prize"
          placeholder="Prize (e.g. 5 ETH)"
          value={form.prize}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700"
        />
        <input
          name="maxPlayers"
          placeholder="Max Players"
          value={form.maxPlayers}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700"
        />
        <input
          name="startsAt"
          type="datetime-local"
          placeholder="Start Date & Time"
          value={form.startsAt}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-white font-bold"
        >
          {loading ? 'Creating…' : 'Create Tournament'}
        </button>
      </div>
    </Modal>
  );
}
