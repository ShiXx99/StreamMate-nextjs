import { useEffect, useState } from 'react';
import { useWatchlist } from '../hooks/useWatchlist';
import styles from '../styles/Carousel.module.css';

export default function Carousel({ providerId, title }) {
  const [items, setItems] = useState([]);
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    const endpoint =
      providerId === 'recommendations'
        ? '/api/recommendations'
        : providerId === 'watchlist'
        ? '/api/watchlist'
        : `/api/providers/${providerId}/latest`;
    fetch(endpoint)
      .then(r => r.json())
      .then(data => setItems(data));
  }, [providerId, watchlist]);

  return (
    <section className={styles.carousel}>
      <h2>{title}</h2>
      <div className={styles.row}>
        {items.map(item => (
          <div key={item.id} className={styles.card}>
            <img src={`https://image.tmdb.org/t/p/w200${item.poster}`} alt={item.title} />
            <button
              className={styles.watchlistBtn}
              onClick={() =>
                isInWatchlist(item.id) ? removeFromWatchlist(item.id) : addToWatchlist(item.id)
              }
            >
              {isInWatchlist(item.id) ? '➖' : '➕'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
