// pages/game/[roomId].tsx
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { Chess } from 'chess.js';
import CustomChessBoard from '../../components/ChessBoard';
import PlayerPanel from '../../components/PlayerPanel';
import ChatPanel from '../../components/ChatPanel';
import GameControls from '../../components/GameControls';
import { motion } from 'framer-motion';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

interface Player {
  name: string;
  elo: number;
  color: 'white' | 'black';
}

export default function GameRoom() {
  const { query } = useRouter();
  const roomId = Array.isArray(query.roomId) ? query.roomId[0] : query.roomId;
  const mode = typeof query.mode === 'string' ? query.mode : 'quick';

  const [socket, setSocket] = useState<Socket | null>(null);
  const [game, setGame] = useState(() => new Chess());
  const [playerColor, setPlayerColor] = useState<'white' | 'black'>('white');
  const [opponent, setOpponent] = useState<Player | null>(null);
  const [messages, setMessages] = useState<Array<{ user: string; text: string }>>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'checkmate' | 'draw'>('playing');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roomId) return;

    const sock = io(SOCKET_URL, {
      query: { roomId, mode },
      transports: ['websocket']
    });

    setSocket(sock);

    sock.on('connect', () => {
      console.log('Connected to socket');
    });

    sock.on('assign_color', (color: 'white' | 'black') => {
      setPlayerColor(color);
      setIsPlayerTurn(color === 'white');
    });

    sock.on('opponent_joined', (data: { name: string; elo: number }) => {
      if (!playerColor) {
        console.warn('Player color not assigned before opponent joined; defaulting to opposite of white');
      }
      const opponentColor = playerColor === 'white' ? 'black' : 'white';
      setOpponent({
        name: data.name,
        elo: data.elo,
        color: opponentColor
      });
    });

    sock.on('move', ({ from, to }: { from: string; to: string }) => {
      const gameCopy = new Chess(game.fen());
      gameCopy.move({ from, to, promotion: 'q' });
      setGame(gameCopy);
      setIsPlayerTurn(true);

      if (gameCopy.isGameOver()) {
        setGameStatus(gameCopy.isCheckmate() ? 'checkmate' : 'draw');
      }
    });

    sock.on('chat_message', (message: { user: string; text: string }) => {
      setMessages(prev => [...prev, message]);
      setTimeout(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
      }, 100);
    });

    return () => {
      sock.disconnect();
    };
  }, [roomId, game, mode, playerColor]);

  const onDrop = (source: string, target: string): boolean => {
    const gameCopy = new Chess(game.fen());
    const move = gameCopy.move({ from: source, to: target, promotion: 'q' });

    if (move) {
      setGame(gameCopy);
      socket?.emit('move', { roomId, from: source, to: target });
      setIsPlayerTurn(false);

      if (gameCopy.isGameOver()) {
        setGameStatus(gameCopy.isCheckmate() ? 'checkmate' : 'draw');
      }
      return true;
    }
    return false;
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    socket?.emit('chat_message', { roomId, text });
    setMessages(prev => [...prev, { user: 'You', text }]);
  };

  if (!roomId) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-cyan-500 border-t-transparent rounded-full"></div>
          <p className="text-cyan-300 font-bold">Connecting to ChessPunk...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      {/* Glowing background effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 z-0"></div>
      <div className="fixed inset-0 bg-[url('/grid-pattern.svg')] bg-[length:40px_40px] opacity-10 z-0"></div>

      <div className="max-w-full mx-auto relative z-10">
        {/* Game header */}
        <header className="flex justify-between items-center mb-6 md:mb-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center"
          >
            <div className="bg-cyan-500 w-3 h-8 rounded-r-lg mr-2"></div>
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              ChessPunk
            </h1>
          </motion.div>

          <div className="text-sm bg-gray-800 px-3 py-1 rounded-full border border-cyan-500/30">
            Room: <span className="text-cyan-300">{roomId}</span>
          </div>
        </header>

        {/* Main game area */}
        <div className="flex justify-between flex-wrap gap-6 md:gap-8">
          {/* Left panel - Player info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <PlayerPanel
              player={{ name: "You", elo: 1520, color: playerColor }}
              opponent={opponent}
              roomId={roomId}
            />
          </motion.div>

          {/* Center panel - Chess board */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 flex flex-col items-center"
          >
            <CustomChessBoard
              position={game.fen()}
              onDrop={onDrop}
              boardOrientation={playerColor}
              isPlayerTurn={isPlayerTurn}
            />

            <GameControls
              gameStatus={gameStatus}
              onRematch={() => window.location.reload()}
              onResign={() => socket?.emit('resign', roomId)}
            />
          </motion.div>

          {/* Right panel - Chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <ChatPanel
              messages={messages}
              onSend={sendMessage}
              chatRef={chatRef}
            />
          </motion.div>
        </div>

        {/* Web3 Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
              <span className="text-sm">Web3 Connected</span>
            </div>
            <div className="flex space-x-4">
              <div className="text-sm">
                <span className="text-gray-400">Balance:</span>
                <span className="ml-2 text-cyan-300">0.52 ETH</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Entry Fee:</span>
                <span className="ml-2 text-cyan-300">0.01 ETH</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Prize Pool:</span>
                <span className="ml-2 text-cyan-300">0.02 ETH</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}