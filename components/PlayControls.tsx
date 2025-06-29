import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/navigation';
import { Modal } from './Modal';
import { Button } from './ui/Button';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

interface PlayControlsProps {
  showModal: boolean;
  onClose: () => void;
}

export const PlayControls: React.FC<PlayControlsProps> = ({ showModal, onClose }) => {
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (waiting || inviteLink) {
      const newSocket = io(SOCKET_URL);
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        setSocket(null);
      };
    }
  }, [waiting, inviteLink]);

  const quickMatch = () => {
    if (!socket) {
      setWaiting(true);
      return;
    }
    setWaiting(true);
    socket.emit('quick_match');
    socket.on('match_found', ({ roomId }: { roomId: string }) => {
      router.push(`/game/${roomId}?mode=quick`);
      setWaiting(false);
    });
  };

  const playWithFriend = () => {
    const roomId = uuid();
    setInviteLink(`${window.location.origin}/game/${roomId}?mode=private`);
    if (socket) {
      socket.emit('create_room', { roomId });
      socket.on('player_joined', () => {
        router.push(`/game/${roomId}?mode=private`);
      });
    }
  };

  const playVsAI = (level: 'easy' | 'medium' | 'hard') => {
    router.push(`/game/ai?level=${level}`);
  };

  return (
    <>
      {showModal && (
        <Modal title="How would you like to play?" onClose={onClose} show={showModal}>
          <div className="space-y-4">
            <Button onClick={quickMatch} variant="primary" className="w-full">
              Quick Match {waiting && ' (Searching...)'}
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
            {inviteLink && (
              <div className="mt-4 p-4 bg-gray-700 rounded text-sm">
                <p className="mb-2 text-gray-300">Share this link with a friend:</p>
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
      )}
    </>
  );
};