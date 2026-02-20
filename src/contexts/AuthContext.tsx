import { createContext, useContext, useState, useCallback } from 'react';
import type { User } from '@/types';
import { mockUser, allSongs } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  addToFavorites: (songId: string) => void;
  removeFromFavorites: (songId: string) => void;
  isFavorite: (songId: string) => boolean;
  createPlaylist: (name: string) => void;
  deletePlaylist: (playlistId: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulation de connexion - accepte n'importe quelles credentials
    if (email && password) {
      const newUser: User = {
        ...mockUser,
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0],
        isSubscribed: true,
        favorites: [],
        playlists: [],
      };
      setUser(newUser);
      return true;
    }
    return false;
  }, []);

  const register = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulation d'inscription - accepte n'importe quelles données
    if (email && password && name) {
      const newUser: User = {
        ...mockUser,
        id: `user-${Date.now()}`,
        email,
        name,
        isSubscribed: true,
        favorites: [],
        playlists: [],
      };
      setUser(newUser);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const addToFavorites = useCallback((songId: string) => {
    if (user) {
      setUser({
        ...user,
        favorites: [...user.favorites, songId],
      });
    }
  }, [user]);

  const removeFromFavorites = useCallback((songId: string) => {
    if (user) {
      setUser({
        ...user,
        favorites: user.favorites.filter(id => id !== songId),
      });
    }
  }, [user]);

  const isFavorite = useCallback((songId: string): boolean => {
    return user?.favorites.includes(songId) ?? false;
  }, [user]);

  const createPlaylist = useCallback((name: string) => {
    if (user) {
      const newPlaylist = {
        id: `playlist-${Date.now()}`,
        name,
        userId: user.id,
        songs: [],
        createdAt: new Date(),
      };
      setUser({
        ...user,
        playlists: [...user.playlists, newPlaylist],
      });
    }
  }, [user]);

  const deletePlaylist = useCallback((playlistId: string) => {
    if (user) {
      setUser({
        ...user,
        playlists: user.playlists.filter(p => p.id !== playlistId),
      });
    }
  }, [user]);

  const addSongToPlaylist = useCallback((playlistId: string, songId: string) => {
    if (user) {
      setUser({
        ...user,
        playlists: user.playlists.map(playlist => {
          if (playlist.id === playlistId) {
            const song = allSongs.find(s => s.id === songId);
            if (song && !playlist.songs.find(s => s.id === songId)) {
              return { ...playlist, songs: [...playlist.songs, song] };
            }
          }
          return playlist;
        }),
      });
    }
  }, [user]);

  const removeSongFromPlaylist = useCallback((playlistId: string, songId: string) => {
    if (user) {
      setUser({
        ...user,
        playlists: user.playlists.map(playlist => {
          if (playlist.id === playlistId) {
            return { ...playlist, songs: playlist.songs.filter(s => s.id !== songId) };
          }
          return playlist;
        }),
      });
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        createPlaylist,
        deletePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
