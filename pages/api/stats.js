import { getSession } from 'next-auth/react';
import { prisma } from '../../lib/prisma';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).end();
  const userId = session.user.id;
  const count = await prisma.watchItem.count({ where: { userId } });
  const friends = await prisma.friendship.findMany({
    where: { OR: [{ userId, status:'accepted' }, { friendId: userId, status:'accepted' }] }
  });
  const friendStats = await Promise.all(friends.map(async f => {
    const otherId = f.userId === userId ? f.friendId : f.userId;
    const c = await prisma.watchItem.count({ where: { userId: otherId } });
    return { friendId: otherId, count: c };
  }));
  res.json({ myCount: count, friendStats });
}
