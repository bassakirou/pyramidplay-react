import { useEffect, useState } from 'react';
import type { ShortVideo } from '../types';

export function useShorts() {
  const [shorts, setShorts] = useState<ShortVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/mock-video/short.json');
        if (!res.ok) throw new Error('Failed to load shorts');
        const data: ShortVideo[] = await res.json();
        setShorts(data);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
        console.error('Error loading shorts:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { shorts, loading, error };
}