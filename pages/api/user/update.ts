import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { walletAddress, settings } = req.body;

  if (!walletAddress || !settings) {
    return res.status(400).json({ error: 'Missing wallet address or settings' });
  }

  try {
    const updatedUser = await prisma.users.update({
      where: { wallet_address: walletAddress },
      data: settings,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user settings:', error);
    res.status(500).json({ error: 'Failed to update user settings' });
  }
}