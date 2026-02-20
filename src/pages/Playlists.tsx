import { useState } from 'react';
import { ListMusic, Play, Plus, Trash2, Music, ChevronLeft, Pause } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { usePlayer } from '@/contexts/PlayerContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Playlist } from '@/types';

export function Playlists() {
  const { isAuthenticated, user, createPlaylist, deletePlaylist } = useAuth();
  const { navigateTo } = useNavigation();
  const { } = usePlayer();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full">
        <ListMusic className="w-16 h-16 text-gray-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Vos playlists</h2>
        <p className="text-gray-400 text-center mb-6">
          Connectez-vous pour créer et gérer vos playlists
        </p>
        <button
          onClick={() => navigateTo('login')}
          className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold rounded-full transition-colors"
        >
          Se connecter
        </button>
      </div>
    );
  }

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
      setIsCreateDialogOpen(false);
    }
  };

  const playlists = user?.playlists || [];

  if (selectedPlaylist) {
    const playlist = playlists.find(p => p.id === selectedPlaylist);
    if (!playlist) {
      setSelectedPlaylist(null);
      return null;
    }

    return (
      <PlaylistDetail 
        playlist={playlist} 
        onBack={() => setSelectedPlaylist(null)} 
      />
    );
  }

  return (
    <div className="p-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Vos Playlists</h1>
        <button
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold rounded-full transition-colors"
        >
          <Plus className="w-5 h-5" />
          Créer une playlist
        </button>
      </div>

      {playlists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <ListMusic className="w-16 h-16 text-gray-600 mb-4" />
          <p className="text-gray-400 text-center mb-6">
            Vous n'avez pas encore de playlist
          </p>
          <button
            onClick={() => setIsCreateDialogOpen(true)}
            className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold rounded-full transition-colors"
          >
            Créer ma première playlist
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="group relative bg-[#1E293B] rounded-lg p-4 hover:bg-[#F59E0B]/10 transition-colors cursor-pointer"
              onClick={() => setSelectedPlaylist(playlist.id)}
            >
              {/* Playlist Cover */}
              <div className="aspect-square rounded-lg bg-gradient-to-br from-[#F59E0B]/20 to-[#F59E0B]/40 flex items-center justify-center mb-4 group-hover:from-[#F59E0B]/30 group-hover:to-[#F59E0B]/50 transition-all">
                <ListMusic className="w-16 h-16 text-[#F59E0B]" />
              </div>

              {/* Playlist Info */}
              <h3 className="text-white font-medium truncate mb-1">{playlist.name}</h3>
              <p className="text-gray-400 text-sm">
                {playlist.songs.length} chanson{playlist.songs.length !== 1 ? 's' : ''}
              </p>

              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deletePlaylist(playlist.id);
                }}
                className="absolute top-2 right-2 p-2 rounded-full bg-[#0F172A] text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Playlist Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-[#1E293B] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Créer une playlist</DialogTitle>
            <DialogDescription className="text-gray-400">
              Donnez un nom à votre nouvelle playlist
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Nom de la playlist"
              className="w-full px-4 py-3 bg-[#0F172A] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                className="flex-1 border-white/10 text-white hover:bg-white/10"
              >
                Annuler
              </Button>
              <Button
                onClick={handleCreatePlaylist}
                className="flex-1 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold"
              >
                Créer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Composant pour afficher le détail d'une playlist
interface PlaylistDetailProps {
  playlist: Playlist;
  onBack: () => void;
}

function PlaylistDetail({ playlist, onBack }: PlaylistDetailProps) {
  const { removeSongFromPlaylist } = useAuth();
  const { playPlaylist, isPlaying, currentSong, canPlayMore } = usePlayer();

  // Vérifier si cette playlist est en cours de lecture
  const isThisPlaylistPlaying = currentSong && playlist.songs.some(s => s.id === currentSong.id);

  const handlePlayAll = () => {
    if (playlist.songs.length > 0 && canPlayMore) {
      playPlaylist(playlist.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (canPlayMore) {
      playPlaylist(playlist.songs, index);
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Retour aux playlists
      </button>

      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-lg bg-gradient-to-br from-[#F59E0B]/20 to-[#F59E0B]/40 flex items-center justify-center">
          <ListMusic className="w-16 h-16 md:w-24 md:h-24 text-[#F59E0B]" />
        </div>
        <div>
          <span className="text-gray-400 text-sm uppercase tracking-wider">PLAYLIST</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{playlist.name}</h1>
          <p className="text-gray-400">
            {playlist.songs.length} chanson{playlist.songs.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Play Button */}
      {playlist.songs.length > 0 && (
        <div className="mb-6">
          <button
            onClick={handlePlayAll}
            disabled={!canPlayMore}
            className="w-14 h-14 rounded-full bg-[#F59E0B] flex items-center justify-center hover:bg-[#D97706] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isThisPlaylistPlaying && isPlaying ? (
              <Pause className="w-7 h-7 text-[#0F172A] fill-current" />
            ) : (
              <Play className="w-7 h-7 text-[#0F172A] fill-current ml-1" />
            )}
          </button>
        </div>
      )}

      {/* Songs List */}
      {playlist.songs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Music className="w-16 h-16 text-gray-600 mb-4" />
          <p className="text-gray-400 text-center">
            Cette playlist est vide
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Ajoutez des chansons depuis les albums ou la recherche
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {playlist.songs.map((song, index) => {
            const isCurrentSong = currentSong?.id === song.id;
            const isSongPlaying = isCurrentSong && isPlaying;

            return (
              <div
                key={song.id}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg group hover:bg-white/5 transition-colors ${
                  isCurrentSong ? 'bg-[#F59E0B]/10' : ''
                }`}
              >
                <span className="w-6 text-gray-400 group-hover:hidden">
                  {isSongPlaying ? (
                    <span className="text-[#F59E0B]">▶</span>
                  ) : (
                    index + 1
                  )}
                </span>
                <button
                  onClick={() => handlePlaySong(index)}
                  disabled={!canPlayMore && !isCurrentSong}
                  className="w-6 hidden group-hover:flex items-center justify-center disabled:opacity-50"
                >
                  {isSongPlaying ? (
                    <Pause className="w-4 h-4 text-[#F59E0B]" />
                  ) : (
                    <Play className="w-4 h-4 text-white" />
                  )}
                </button>

                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-10 h-10 rounded object-cover"
                />

                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${isCurrentSong ? 'text-[#F59E0B]' : 'text-white'}`}>
                    {song.title}
                  </p>
                  <p className="text-gray-400 text-sm truncate">{song.artistName}</p>
                </div>

                <button
                  onClick={() => removeSongFromPlaylist(playlist.id, song.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
