//pages/api/user/match-history.ts


import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Starting match-history handler');
  console.log('DATABASE_URL:', process.env.DATABASE_URL); // Debug environment variable

  const { walletAddress } = req.query;
  console.log('Query params:', { walletAddress }); // Debug query params

  if (!walletAddress || typeof walletAddress !== 'string') {
    console.log('Invalid wallet address');
    return res.status(400).json({ error: 'Invalid wallet address' });
  }

  try {
    console.log('Fetching match history for wallet:', walletAddress);
    const user = await prisma.users.findUnique({
      where: { wallet_address: walletAddress },
      include: { match_history: true },
    });

    if (!user) {
      console.log('User not found for wallet:', walletAddress);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Match history fetched:', user.match_history);
    res.status(200).json(user.match_history);
  } catch (error) {
    console.error('Error fetching match history:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect(); // Ensure disconnection
    console.log('Prisma client disconnected');
  }
}