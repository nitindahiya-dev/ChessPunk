import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../prisma/prisma'; // Adjust the path to your Prisma client setup

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { walletAddress } = req.query;

  if (typeof walletAddress !== 'string') {
    return res.status(400).json({ error: 'Invalid wallet address' });
  }

  try {
    let user = await prisma.users.findUnique({
      where: { wallet_address: walletAddress },
    });

    if (!user) {
      // Create a new user if not found
      user = await prisma.users.create({
        data: {
          username: `User_${walletAddress.slice(0, 6)}`,
          wallet_address: walletAddress,
          join_date: new Date(),
          last_active: new Date(),
        },
      });
    } else {
      // Update last_active timestamp
      user = await prisma.users.update({
        where: { wallet_address: walletAddress },
        data: { last_active: new Date() },
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}