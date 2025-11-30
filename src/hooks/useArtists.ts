import { useEffect, useState } from 'react';
import type { Artist } from '../types';

export function useArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch('/mock/artist.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Artist[] = await res.json();
        if (mounted) setArtists(data);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Erreur de chargement des artistes';
        if (mounted) setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return { artists, loading, error };
}
