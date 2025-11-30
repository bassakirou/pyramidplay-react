import { useEffect, useState } from 'react';
import type { Album } from '../types';

export function useAlbums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch('/mock/album.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Album[] = await res.json();
        if (mounted) setAlbums(data);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Erreur de chargement des albums';
        if (mounted) setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return { albums, loading, error };
}
