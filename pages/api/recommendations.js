import { getSession } from 'next-auth/react';
import { prisma } from '../lib/prisma';
import { tmdb } from '../lib/tmdb';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).end();
  const userId = session.user.id;
  const watchItems = await prisma.watchItem.findMany({ where: { userId } });
  const recMap = {};
  for (const item of watchItems) {
    const { data } = await tmdb.get(`/movie/${item.tmdbId}/recommendations`);
    data.results.forEach(r => {
      if (!recMap[r.id]) recMap[r.id] = { ...r, count: 0 };
      recMap[r.id].count++;
    });
  }
  const recs = Object.values(recMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map(r => ({ id: r.id, title: r.title || r.name, poster: r.poster_path }));
  res.status(200).json(recs);
}
