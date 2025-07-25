import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);

  if (req.method === 'GET') {
    const tour = await prisma.tournament.findUnique({ where: { id } });
    return res.status(200).json(tour);
  }
  if (req.method === 'PUT') {
    const { name, entryFee, prize, maxPlayers, status, startsAt } = req.body;
    const updated = await prisma.tournament.update({
      where: { id },
      data: { name, entryFee, prize, maxPlayers, status, startsAt: new Date(startsAt) },
    });
    return res.status(200).json(updated);
  }
  if (req.method === 'DELETE') {
    await prisma.tournament.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
