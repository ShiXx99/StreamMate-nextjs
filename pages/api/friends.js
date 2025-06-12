import { getSession } from 'next-auth/react';
import { prisma } from '../../lib/prisma';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).end();
  const userId = session.user.id;

  switch(req.method) {
    case 'GET':
      const friends = await prisma.friendship.findMany({
        where: { OR: [{ userId, status:'accepted' }, { friendId: userId, status:'accepted' }] }
      });
      return res.json(friends);
    case 'POST':
      const { friendEmail } = req.body;
      const friend = await prisma.user.findUnique({ where: { email: friendEmail } });
      if (!friend) return res.status(404).json({ error: 'User nicht gefunden' });
      const request = await prisma.friendship.create({ data: { userId, friendId: friend.id, status: 'pending' } });
      return res.json(request);
    case 'PATCH':
      const { id, status } = req.body;
      const update = await prisma.friendship.update({ where: { id }, data: { status } });
      return res.json(update);
    default:
      res.setHeader('Allow',['GET','POST','PATCH']).status(405).end();
  }
}
