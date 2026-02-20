import { useState } from 'react';
import { Play, Plus, Heart, Pause } from 'lucide-react';
import type { Song } from '@/types';
import { usePlayer } from '@/contexts/PlayerContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface SongCardProps {
  song: Song;
  showAddButton?: boolean;
}

export function SongCard({ song, showAddButton = true }: SongCardProps) {
  const { playSong, pause, isPlaying, currentSong, canPlayMore } = usePlayer();
  const { isAuthenticated, user, isFavorite, addToFavorites, removeFromFavorites, addSongToPlaylist } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [showPlaylistDialog, setShowPlaylistDialog] = useState(false);

  const isCurrentSong = currentSong?.id === song.id;
  const isSongPlaying = isCurrentSong && isPlaying;
  const songIsFavorite = isFavorite(song.id);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSongPlaying) {
      pause();
    } else if (canPlayMore || isCurrentSong) {
      playSong(song);
    }
  };

  const handleAddToPlaylist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      return;
    }
    setShowPlaylistDialog(true);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      return;
    }
    if (songIsFavorite) {
      removeFromFavorites(song.id);
    } else {
      addToFavorites(song.id);
    }
  };

  return (
    <>
      <div
        className="group relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Song Cover */}
        <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
          <img
            src={song.coverUrl}
            alt={song.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered || isSongPlaying ? 'opacity-100' : 'opacity-0'
          }`}>
            <button
              onClick={handlePlay}
              disabled={!canPlayMore && !isCurrentSong}
              className="w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center hover:bg-[#D97706] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSongPlaying ? (
                <Pause className="w-6 h-6 text-[#0F172A] fill-current" />
              ) : (
                <Play className="w-6 h-6 text-[#0F172A] fill-current ml-1" />
              )}
            </button>
          </div>

          {/* Action Buttons */}
          {isAuthenticated && (
            <div className={`absolute top-2 right-2 flex flex-col gap-2 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
            }`}>
              {/* Favorite Button */}
              <button
                onClick={handleFavorite}
                className={`w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center transition-colors ${
                  songIsFavorite ? 'text-[#F59E0B]' : 'text-white hover:text-[#F59E0B]'
                }`}
              >
                <Heart className={`w-4 h-4 ${songIsFavorite ? 'fill-current' : ''}`} />
              </button>
              
              {/* Add to Playlist Button */}
              {showAddButton && (
                <button
                  onClick={handleAddToPlaylist}
                  className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center text-white hover:text-[#F59E0B] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Song Info */}
        <div>
          <h3 className="text-white font-medium truncate group-hover:text-[#F59E0B] transition-colors">
            {song.title}
          </h3>
          <p className="text-gray-400 text-sm truncate">{song.artistName}</p>
        </div>
      </div>

      {/* Playlist Selection Dialog */}
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
                    addSongToPlaylist(playlist.id, song.id);
                    setShowPlaylistDialog(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg bg-[#0F172A] hover:bg-[#F59E0B]/20 text-white transition-colors"
                >
                  {playlist.name}
                </button>
              ))
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => setShowPlaylistDialog(false)}
            className="w-full mt-4 border-white/10 text-white hover:bg-white/10"
          >
            Annuler
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
