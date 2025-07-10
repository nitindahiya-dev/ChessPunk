import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Starting update handler');
  console.log('DATABASE_URL:', process.env.DATABASE_URL); // Debug environment variable

  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { walletAddress, settings } = req.body;
  console.log('Request body:', { walletAddress, settings }); // Debug request data

  if (!walletAddress || !settings) {
    console.log('Missing required fields');
    return res.status(400).json({ error: 'Missing wallet address or settings' });
  }

  try {
    console.log('Attempting to update user with wallet:', walletAddress);
    const updatedUser = await prisma.users.update({
      where: { wallet_address: walletAddress },
      data: settings,
    });
    console.log('User updated successfully:', updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user settings:', error);
    res.status(500).json({ error: 'Failed to update user settings' });
  } finally {
    await prisma.$disconnect(); // Ensure disconnection
    console.log('Prisma client disconnected');
  }
}