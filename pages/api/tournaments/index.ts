import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const list = await prisma.tournament.findMany({ orderBy: { startsAt: 'asc' } });
    return res.status(200).json(list);
  }

  if (req.method === 'POST') {
    const { name, entryFee, prize, maxPlayers, startsAt } = req.body;
    const created = await prisma.tournament.create({
      data: { name, entryFee, prize, maxPlayers, startsAt: new Date(startsAt) },
    });
    return res.status(201).json(created);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
