import { useState, useEffect } from "react";
import type { Music } from "../types";

export function useMusic() {
  const [music, setMusic] = useState<Music[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMusic = async () => {
      try {
        setLoading(true);
        const response = await fetch("/mock/music.json");
        if (!response.ok) {
          throw new Error("Failed to load music data");
        }
        const data: Music[] = await response.json();
        const pool = [
          "/music/soa.mp3",
          "/music/clavie.mp3",
          "/music/ndolo.mp3",
          "/music/sawa.mp3",
          "/music/trouverlavie.mp3",
          "/music/kalabancoro.mp3",
        ];
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        let i = 0;
        const prelim = data.map((t) => {
          if (t.src && String(t.src).trim() !== "") return t;
          const src = shuffled[i % shuffled.length];
          i += 1;
          return { ...t, src };
        });
        const validated = await Promise.all(
          prelim.map(async (t) => {
            let img = t.image || "";
            let src = t.src || null;
            try {
              if (img) {
                const r = await fetch(img.startsWith("/") ? img : `/${img}`, {
                  method: "HEAD",
                });
                const len = Number(r.headers.get("content-length") || "0");
                if (!r.ok || len < 1000) {
                  img = `https://picsum.photos/seed/${t.id}/600/600.webp`;
                }
              } else {
                img = `https://picsum.photos/seed/${t.id}/600/600.webp`;
              }
            } catch {
              img = `https://picsum.photos/seed/${t.id}/600/600.webp`;
            }
            try {
              if (src) {
                const r = await fetch(src, { method: "HEAD" });
                const len = Number(r.headers.get("content-length") || "0");
                if (!r.ok || len < 10000) {
                  src = "https://www.w3schools.com/html/horse.mp3";
                }
              } else {
                src = "https://www.w3schools.com/html/horse.mp3";
              }
            } catch {
              src = "https://www.w3schools.com/html/horse.mp3";
            }
            return { ...t, image: img, src } as Music;
          })
        );
        if ((import.meta as any).env?.DEV) {
          console.log("[useMusic] Chargement de la musique:", {
            count: validated.length,
            sample: validated
              .slice(0, 5)
              .map((m) => ({
                id: m.id,
                title: m.title,
                image: m.image,
                src: m.src,
              })),
          });
        }
        setMusic(validated);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error loading music:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMusic();
  }, []);

  const searchMusic = (query: string): Music[] => {
    if (!query.trim()) return music;

    const q = query.toLowerCase();
    return music.filter((track) => {
      const inTitle = track.title?.toLowerCase().includes(q);
      const inArtists = Array.isArray(track.artist)
        ? track.artist.some((a) => a.name.toLowerCase().includes(q))
        : false;
      const inGenres = Array.isArray(track.genres)
        ? track.genres.some((g) => g.name.toLowerCase().includes(q))
        : false;
      return inTitle || inArtists || inGenres;
    });
  };

  const getMusicById = (id: number): Music | undefined => {
    return music.find((track) => track.id === id);
  };

  const getAvailableMusic = (): Music[] => {
    return music.filter((track) => track.src !== null);
  };

  return {
    music,
    loading,
    error,
    searchMusic,
    getMusicById,
    getAvailableMusic,
  };
}
