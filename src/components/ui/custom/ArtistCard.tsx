import { useState } from 'react';
import { Play, Heart } from 'lucide-react';
import type { Artist } from '@/types';
import { useNavigation } from '@/contexts/NavigationContext';
import { usePlayer } from '@/contexts/PlayerContext';
import { useAuth } from '@/contexts/AuthContext';

interface ArtistCardProps {
  artist: Artist;
  showAddButton?: boolean;
}

export function ArtistCard({ artist, showAddButton = true }: ArtistCardProps) {
  const { navigateToArtist } = useNavigation();
  const { playPlaylist, canPlayMore } = usePlayer();
  const { isAuthenticated, isFavorite, addToFavorites, removeFromFavorites } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  // Get all songs from all albums
  const allSongs = artist.albums.flatMap(album => album.songs);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Jouer toutes les chansons de l'artiste
    if (allSongs.length > 0 && canPlayMore) {
      playPlaylist(allSongs, 0);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated || allSongs.length === 0) {
      return;
    }
    // Ajouter/supprimer toutes les chansons de l'artiste des favoris
    const firstSong = allSongs[0];
    const isFav = isFavorite(firstSong.id);
    
    allSongs.forEach(song => {
      if (isFav) {
        removeFromFavorites(song.id);
      } else {
        addToFavorites(song.id);
      }
    });
  };

  // Vérifier si l'artiste est en favoris (première chanson)
  const isArtistFavorite = allSongs.length > 0 && isFavorite(allSongs[0].id);

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigateToArtist(artist.id)}
    >
      {/* Artist Image */}
      <div className="relative aspect-square rounded-full overflow-hidden mb-3">
        <img
          src={artist.imageUrl}
          alt={artist.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={handlePlay}
            disabled={!canPlayMore}
            className="w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center hover:bg-[#D97706] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-6 h-6 text-[#0F172A] fill-current ml-1" />
          </button>
        </div>

        {/* Favorite Button */}
        {isAuthenticated && showAddButton && (
          <button
            onClick={handleFavorite}
            className={`absolute bottom-2 right-2 w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            } ${isArtistFavorite ? 'text-[#F59E0B]' : 'text-white hover:text-[#F59E0B]'}`}
          >
            <Heart className={`w-4 h-4 ${isArtistFavorite ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      {/* Artist Info */}
      <div className="text-center">
        <h3 className="text-white font-medium truncate group-hover:text-[#F59E0B] transition-colors">
          {artist.name}
        </h3>
        <p className="text-gray-400 text-sm">Artiste</p>
      </div>
    </div>
  );
}
