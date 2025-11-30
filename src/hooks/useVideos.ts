import { useEffect, useState } from 'react';
import type { Video } from '../types';

export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/mock-video/video.json');
        if (!res.ok) throw new Error('Failed to load videos');
        const data: Video[] = await res.json();
        setVideos(data);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
        console.error('Error loading videos:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const searchVideos = (query: string): Video[] => {
    const q = query.trim().toLowerCase();
    if (!q) return videos;
    return videos.filter(v => {
      const inTitle = v.title?.toLowerCase().includes(q);
      const inChannel = v.channel?.toLowerCase().includes(q);
      const inGenres = Array.isArray(v.genres) ? v.genres.some(g => g.name.toLowerCase().includes(q)) : false;
      return inTitle || inChannel || inGenres;
    });
  };

  const getById = (id: number): Video | undefined => videos.find(v => v.id === id);

  return { videos, loading, error, searchVideos, getById };
}