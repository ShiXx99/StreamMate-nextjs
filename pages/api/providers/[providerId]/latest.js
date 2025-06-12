import { tmdb } from '../../../../lib/tmdb';

export default async function handler(req, res) {
  const { providerId } = req.query;
  const page = 1;
  const [movies, tv] = await Promise.all([
    tmdb.get('/discover/movie', { params: { with_watch_providers: providerId, sort_by: 'release_date.desc', page }}),
    tmdb.get('/discover/tv', { params: { with_watch_providers: providerId, sort_by: 'first_air_date.desc', page }})
  ]);
  const items = [...movies.data.results, ...tv.data.results]
    .sort((a,b) => new Date(b.release_date||b.first_air_date) - new Date(a.release_date||a.first_air_date))
    .slice(0,10)
    .map(item => ({ id: item.id, title: item.title||item.name, poster: item.poster_path }));
  res.status(200).json(items);
}
