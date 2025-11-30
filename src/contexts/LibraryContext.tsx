import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Music } from "../types";

export type UserPlaylist = {
  id: string;
  name: string;
  tracks: Music[];
  createdAt: string;
  updatedAt: string;
};

type LibraryContextType = {
  favorites: Music[];
  playlists: UserPlaylist[];
  recents: Music[];
  toggleFavorite: (track: Music) => void;
  addToPlaylist: (track: Music, playlistId: string) => void;
  createPlaylist: (name: string, initialTrack?: Music) => UserPlaylist;
  recordListen: (track: Music) => void;
};

const STORAGE_KEYS = {
  favorites: "pp_library_favorites",
  playlists: "pp_library_playlists",
  recents: "pp_library_recents",
};

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Music[]>([]);
  const [playlists, setPlaylists] = useState<UserPlaylist[]>([]);
  const [recents, setRecents] = useState<Music[]>([]);

  useEffect(() => {
    try {
      const fav = localStorage.getItem(STORAGE_KEYS.favorites);
      const pls = localStorage.getItem(STORAGE_KEYS.playlists);
      const rcs = localStorage.getItem(STORAGE_KEYS.recents);
      setFavorites(fav ? (JSON.parse(fav) as Music[]) : []);
      setPlaylists(pls ? (JSON.parse(pls) as UserPlaylist[]) : []);
      setRecents(rcs ? (JSON.parse(rcs) as Music[]) : []);
    } catch {
      setFavorites([]);
      setPlaylists([]);
      setRecents([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.playlists, JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.recents, JSON.stringify(recents));
  }, [recents]);

  const toggleFavorite = (track: Music) => {
    setFavorites((prev) => {
      const exists = prev.some((t) => t.id === track.id);
      return exists ? prev.filter((t) => t.id !== track.id) : [track, ...prev];
    });
  };

  const addToPlaylist = (track: Music, playlistId: string) => {
    setPlaylists((prev) => {
      const idx = prev.findIndex((p) => p.id === playlistId);
      if (idx === -1) return prev;
      const p = prev[idx];
      const exists = p.tracks.some((t) => t.id === track.id);
      const next: UserPlaylist = {
        ...p,
        tracks: exists ? p.tracks : [track, ...p.tracks],
        updatedAt: new Date().toISOString(),
      };
      const copy = prev.slice();
      copy[idx] = next;
      return copy;
    });
  };

  const createPlaylist = (name: string, initialTrack?: Music): UserPlaylist => {
    const playlist: UserPlaylist = {
      id: crypto.randomUUID(),
      name: name.trim() || "Nouvelle playlist",
      tracks: initialTrack ? [initialTrack] : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPlaylists((prev) => [playlist, ...prev]);
    return playlist;
  };

  const recordListen = (track: Music) => {
    setRecents((prev) => {
      const filtered = prev.filter((t) => t.id !== track.id);
      const next = [track, ...filtered];
      return next.slice(0, 50);
    });
  };

  const value = useMemo(
    () => ({
      favorites,
      playlists,
      recents,
      toggleFavorite,
      addToPlaylist,
      createPlaylist,
      recordListen,
    }),
    [favorites, playlists, recents],
  );

  return (
    <LibraryContext.Provider value={value} data-oid="7fttpc0">
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used within LibraryProvider");
  return ctx;
}
