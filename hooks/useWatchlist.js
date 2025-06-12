import { useState, useEffect } from 'react';

const STORAGE_KEY = 'streammate_watchlist';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState([]);
  useEffect(() => {
    const stored = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY);
    if (stored) setWatchlist(JSON.parse(stored));
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    }
  }, [watchlist]);
  function addToWatchlist(id) {
    if (!watchlist.includes(id)) setWatchlist([...watchlist, id]);
  }
  function removeFromWatchlist(id) {
    setWatchlist(watchlist.filter(i => i !== id));
  }
  function isInWatchlist(id) {
    return watchlist.includes(id);
  }
  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
}
