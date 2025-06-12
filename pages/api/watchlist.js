import { getSession } from 'next-auth/react';
import { prisma } from '../../lib/prisma';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).end();
  const userId = session.user.id;

  if (req.method === 'GET') {
    const items = await prisma.watchItem.findMany({ where: { userId } });
    return res.json(items);
  }
  if (req.method === 'POST') {
    const { tmdbId } = req.body;
    const item = await prisma.watchItem.create({ data: { userId, tmdbId } });
    return res.json(item);
  }
  if (req.method === 'DELETE') {
    const { tmdbId } = req.body;
    await prisma.watchItem.deleteMany({ where: { userId, tmdbId } });
    return res.status(204).end();
  }
  res.setHeader('Allow', ['GET','POST','DELETE']).status(405).end();
}
