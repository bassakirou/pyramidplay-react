import { useEffect, useState } from 'react';
import type { VideoGenre } from '../types';

export function useVideoGenres() {
  const [genres, setGenres] = useState<VideoGenre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/mock-video/genres-video.json');
        if (!res.ok) throw new Error('Failed to load video genres');
        const data: VideoGenre[] = await res.json();
        setGenres(data);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
        console.error('Error loading video genres:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { genres, loading, error };
}