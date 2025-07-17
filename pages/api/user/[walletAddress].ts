//pages/api/user/[walletAddress].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Starting walletAddress handler');
  console.log('DATABASE_URL:', process.env.DATABASE_URL); // Debug environment variable

  const { walletAddress } = req.query;
  console.log('Query params:', { walletAddress }); // Debug query params

  if (typeof walletAddress !== 'string') {
    console.log('Invalid wallet address type');
    return res.status(400).json({ error: 'Invalid wallet address' });
  }

  try {
    console.log('Fetching user with wallet:', walletAddress);
    let user = await prisma.users.findUnique({
      where: { wallet_address: walletAddress },
    });

    if (!user) {
      console.log('User not found, creating new user for wallet:', walletAddress);
      user = await prisma.users.create({
        data: {
          username: `User_${walletAddress.slice(0, 6)}`,
          wallet_address: walletAddress,
          join_date: new Date(),
          last_active: new Date(),
        },
      });
      console.log('New user created:', user);
      console.log('DATABASE_URL:', process.env.DATABASE_URL);
    } else {
      console.log('Updating last_active for existing user');
      user = await prisma.users.update({
        where: { wallet_address: walletAddress },
        data: { last_active: new Date() },
      });
      console.log('User updated:', user);
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  } finally {
    await prisma.$disconnect(); // Ensure disconnection
    console.log('Prisma client disconnected');
  }
}