import { useState } from 'react';
import { Play, Pause, Heart, Clock, MoreHorizontal } from 'lucide-react';
import { albums, artists } from '@/data/mockData';
import { useNavigation } from '@/contexts/NavigationContext';
import { usePlayer } from '@/contexts/PlayerContext';
import { useAuth } from '@/contexts/AuthContext';
import { AlbumCard } from '@/components/ui/custom/AlbumCard';
import type { Song } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

interface AlbumPageProps {
  albumId: string;
}

export function AlbumPage({ albumId }: AlbumPageProps) {
  const album = albums.find(a => a.id === albumId);
  const { navigateToArtist } = useNavigation();
  const { playPlaylist, pause, isPlaying, currentSong, canPlayMore, playlist } = usePlayer();
  const { isAuthenticated, isFavorite, addToFavorites, removeFromFavorites, user, addSongToPlaylist } = useAuth();
  const [showPlaylistDialog, setShowPlaylistDialog] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  if (!album) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-400">Album non trouvé</p>
      </div>
    );
  }

  const artist = artists.find(a => a.id === album.artistId);
  const totalDuration = album.songs.reduce((acc, song) => acc + song.duration, 0);
  const totalMinutes = Math.floor(totalDuration / 60);

  // Vérifier si cet album est en cours de lecture
  const isThisAlbumPlaying = playlist.length > 0 && playlist[0]?.albumId === album.id;

  const handlePlaySong = (song: Song, index: number) => {
    if (currentSong?.id === song.id && isPlaying) {
      pause();
    } else if (canPlayMore || currentSong?.id === song.id) {
      playPlaylist(album.songs, index);
    }
  };

  const handlePlayAll = () => {
    if (album.songs.length > 0 && canPlayMore) {
      playPlaylist(album.songs, 0);
    }
  };

  const handleAddToPlaylist = (song: Song) => {
    setSelectedSong(song);
    setShowPlaylistDialog(true);
  };

  const isAlbumFavorite = isAuthenticated && album.songs.every(song => isFavorite(song.id));

  return (
    <div className="p-6 overflow-y-auto h-full">
      {/* Album Header */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Album Cover */}
        <div className="flex-shrink-0">
          <img
            src={album.coverUrl}
            alt={album.title}
            className="w-48 h-48 md:w-64 md:h-64 rounded-lg shadow-2xl object-cover"
          />
        </div>

        {/* Album Info */}
        <div className="flex flex-col justify-end">
          <span className="text-gray-400 text-sm uppercase tracking-wider mb-2">ALBUM</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{album.title}</h1>
          
          {album.description && (
            <p className="text-gray-400 mb-4 max-w-2xl">{album.description}</p>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <button
              onClick={() => navigateToArtist(album.artistId)}
              className="text-white hover:text-[#F59E0B] transition-colors font-medium"
            >
              {album.artistName}
            </button>
            <span>•</span>
            <span>{album.year}</span>
            <span>•</span>
            <span>{album.songs.length} chansons</span>
            <span>•</span>
            <span>{totalMinutes} min</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handlePlayAll}
              disabled={!canPlayMore}
              className="flex items-center gap-2 px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-50 disabled:cursor-not-allowed text-[#0F172A] font-semibold rounded-full transition-colors"
            >
              {isThisAlbumPlaying && isPlaying ? (
                <>
                  <Pause className="w-5 h-5 fill-current" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  Lecture
                </>
              )}
            </button>

            {isAuthenticated && (
              <button
                onClick={() => {
                  album.songs.forEach(song => {
                    if (isFavorite(song.id)) {
                      removeFromFavorites(song.id);
                    } else {
                      addToFavorites(song.id);
                    }
                  });
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-full border transition-colors ${
                  isAlbumFavorite
                    ? 'border-[#F59E0B] text-[#F59E0B]'
                    : 'border-white/20 text-white hover:border-[#F59E0B] hover:text-[#F59E0B]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isAlbumFavorite ? 'fill-current' : ''}`} />
                Sauvegarder
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="mb-8">
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-4 py-2 text-gray-400 text-sm border-b border-white/10">
          <span className="w-8">#</span>
          <span>Titre</span>
          <span className="hidden md:block"></span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
          </span>
        </div>

        {album.songs.map((song, index) => {
          const isCurrentSong = currentSong?.id === song.id;
          const isSongPlaying = isCurrentSong && isPlaying;
          const songIsFavorite = isFavorite(song.id);

          return (
            <div
              key={song.id}
              className={`grid grid-cols-[auto_1fr_auto_auto] gap-4 px-4 py-3 rounded-lg items-center group hover:bg-white/5 transition-colors ${
                isCurrentSong ? 'bg-[#F59E0B]/10' : ''
              }`}
            >
              <span className="w-8 text-gray-400 group-hover:hidden">
                {isSongPlaying ? (
                  <span className="text-[#F59E0B]">▶</span>
                ) : (
                  index + 1
                )}
              </span>
              <button
                onClick={() => handlePlaySong(song, index)}
                disabled={!canPlayMore && !isCurrentSong}
                className="w-8 hidden group-hover:flex items-center justify-center disabled:opacity-50"
              >
                {isSongPlaying ? (
                  <Pause className="w-4 h-4 text-[#F59E0B]" />
                ) : (
                  <Play className="w-4 h-4 text-white" />
                )}
              </button>

              <div className="min-w-0">
                <p className={`font-medium truncate ${isCurrentSong ? 'text-[#F59E0B]' : 'text-white'}`}>
                  {song.title}
                </p>
                <p className="text-gray-400 text-sm truncate">{song.artistName}</p>
              </div>

              <div className="flex items-center gap-2">
                {isAuthenticated && (
                  <button
                    onClick={() => songIsFavorite ? removeFromFavorites(song.id) : addToFavorites(song.id)}
                    className={`p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                      songIsFavorite ? 'text-[#F59E0B]' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${songIsFavorite ? 'fill-current' : ''}`} />
                  </button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#1E293B] border-white/10">
                    {isAuthenticated && (
                      <DropdownMenuItem
                        onClick={() => handleAddToPlaylist(song)}
                        className="text-white hover:bg-white/10 cursor-pointer"
                      >
                        Ajouter à une playlist
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => navigateToArtist(album.artistId)}
                      className="text-white hover:bg-white/10 cursor-pointer"
                    >
                      Voir l'artiste
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <span className="text-gray-400 text-sm">{formatTime(song.duration)}</span>
            </div>
          );
        })}
      </div>

      {/* More from Artist */}
      {artist && artist.albums.length > 1 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            Plus d'albums de {artist.name}
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {artist.albums
              .filter(a => a.id !== album.id)
              .map((otherAlbum) => (
                <div key={otherAlbum.id} className="flex-shrink-0 w-40">
                  <AlbumCard album={otherAlbum} />
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Playlist Dialog */}
      <Dialog open={showPlaylistDialog} onOpenChange={setShowPlaylistDialog}>
        <DialogContent className="bg-[#1E293B] border-white/10 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white">Ajouter à une playlist</DialogTitle>
            <DialogDescription className="text-gray-400">
              Sélectionnez une playlist
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 mt-4 max-h-60 overflow-y-auto">
            {user?.playlists.length === 0 ? (
              <p className="text-gray-400 text-center py-4">
                Vous n'avez pas encore de playlist
              </p>
            ) : (
              user?.playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => {
                    if (selectedSong) {
                      addSongToPlaylist(playlist.id, selectedSong.id);
                    }
                    setShowPlaylistDialog(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg bg-[#0F172A] hover:bg-[#F59E0B]/20 text-white transition-colors"
                >
                  {playlist.name}
                </button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
