import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { v4 as uuid } from 'uuid';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

export type MatchPreferences = {
  mode: 'quick' | 'private' | 'ai';
  timeControl: { minutes: number; increment: number };
  rated: boolean;
  variant: 'standard' | 'chess960' | 'kingOfTheHill';
  aiLevel?: 'easy' | 'medium' | 'hard';
};

export default function PlayControls() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [, setSocket] = useState<Socket | null>(null);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(false);

  const [prefs, setPrefs] = useState<MatchPreferences>({
    mode: 'quick',
    timeControl: { minutes: 5, increment: 0 },
    rated: false,
    variant: 'standard',
    aiLevel: 'easy',
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const quickMatch = () => {
    setWaiting(true);
    const sock = io(SOCKET_URL, {
      transports: ['websocket'],
      query: { prefs: JSON.stringify(prefs) },
    });
    setSocket(sock);
    sock.emit('quick_match');
    sock.once('match_found', ({ roomId }: { roomId: string }) => {
      router.push(`/game/${roomId}?mode=quick`);
      setWaiting(false);
      sock.disconnect();
    });
  };

  const playWithFriend = () => {
    const roomId = uuid();
    setInviteLink(`${window.location.origin}/game/${roomId}?mode=private`);
    const sock = io(SOCKET_URL, {
      transports: ['websocket'],
    });
    sock.emit('create_room', { roomId });
    sock.once('player_joined', () => {
      router.push(`/game/${roomId}?mode=private`);
      sock.disconnect();
    });
  };

  const playVsAI = (level: 'easy' | 'medium' | 'hard') => {
    setPrefs((p) => ({ ...p, mode: 'ai', aiLevel: level }));
    router.push(`/game/ai-${level}`);
    setShowModal(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [min, inc] = e.target.value.split('|').map(Number);
    setPrefs((p) => ({ ...p, timeControl: { minutes: min, increment: inc } }));
  };

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={openModal} className="bg-cyan-500 hover:bg-cyan-600">
        Play Now
      </Button>

      <Modal title="Select Your Game Preferences" onClose={closeModal} show={showModal}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Time Control
            </label>
            <select
              value={`${prefs.timeControl.minutes}|${prefs.timeControl.increment}`}
              onChange={handleTimeChange}
              className="w-full bg-gray-700 text-white rounded px-3 py-2"
            >
              <option value="3|2">3 + 2</option>
              <option value="5|0">5 + 0</option>
              <option value="10|5">10 + 5</option>
              <option value="15|10">15 + 10</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              id="ratedToggle"
              type="checkbox"
              checked={prefs.rated}
              onChange={(e) => setPrefs((p) => ({ ...p, rated: e.target.checked }))}
              className="h-4 w-4 text-cyan-500 bg-gray-700 rounded border-gray-600"
            />
            <label htmlFor="ratedToggle" className="ml-2 text-sm text-gray-200">
              Rated Game
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Variant
            </label>
            <select
              value={prefs.variant}
              onChange={(e) =>
                setPrefs((p) => ({
                  ...p,
                  variant: e.target.value as MatchPreferences['variant'],
                }))
              }
              className="w-full bg-gray-700 text-white rounded px-3 py-2"
            >
              <option value="standard">Standard</option>
              <option value="chess960">Chess960</option>
              <option value="kingOfTheHill">King of the Hill</option>
            </select>
          </div>

          <div className="space-y-2">
            <Button
              onClick={quickMatch}
              variant="primary"
              className="w-full"
              disabled={waiting}
            >
              {waiting ? 'Searching...' : 'Quick Match'}
            </Button>
            <Button onClick={playWithFriend} variant="secondary" className="w-full">
              Play with Friend
            </Button>
            <div className="flex space-x-2">
              {(['easy', 'medium', 'hard'] as const).map((lvl) => (
                <Button
                  key={lvl}
                  onClick={() => playVsAI(lvl)}
                  variant="outline"
                  className="flex-1"
                >
                  vs AI ({lvl})
                </Button>
              ))}
            </div>
          </div>

          {inviteLink && (
            <div className="mt-4 p-3 bg-gray-700 rounded text-sm text-gray-200">
              <p className="mb-1">Share this link with a friend:</p>
              <input
                readOnly
                className="w-full bg-gray-800 px-2 py-1 rounded text-gray-100"
                value={inviteLink}
                onFocus={(e) => e.currentTarget.select()}
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}