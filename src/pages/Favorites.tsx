import { Heart, Play, Pause } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';
import { usePlayer } from '@/contexts/PlayerContext';
import { allSongs } from '@/data/mockData';

export function Favorites() {
  const { isAuthenticated, user, removeFromFavorites } = useAuth();
  const { navigateTo } = useNavigation();
  const { playPlaylist, isPlaying, currentSong, canPlayMore } = usePlayer();

  if (!isAuthenticated) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full">
        <Heart className="w-16 h-16 text-gray-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Vos favoris</h2>
        <p className="text-gray-400 text-center mb-6">
          Connectez-vous pour sauvegarder vos chansons préférées
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

  const favoriteSongs = allSongs.filter(song => user?.favorites.includes(song.id));

  if (favoriteSongs.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full">
        <Heart className="w-16 h-16 text-gray-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Vos favoris</h2>
        <p className="text-gray-400 text-center mb-6">
          Vous n'avez pas encore de chansons favorites
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold rounded-full transition-colors"
        >
          Découvrir de la musique
        </button>
      </div>
    );
  }

  // Vérifier si les favoris sont en cours de lecture
  const isFavoritesPlaying = currentSong && favoriteSongs.some(s => s.id === currentSong.id);

  const handlePlayAll = () => {
    if (favoriteSongs.length > 0 && canPlayMore) {
      playPlaylist(favoriteSongs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (canPlayMore) {
      playPlaylist(favoriteSongs, index);
    }
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
          <Heart className="w-16 h-16 md:w-24 md:h-24 text-[#0F172A] fill-current" />
        </div>
        <div>
          <span className="text-gray-400 text-sm uppercase tracking-wider">PLAYLIST</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Vos Favoris</h1>
          <p className="text-gray-400">
            {favoriteSongs.length} chanson{favoriteSongs.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Play Button */}
      <div className="mb-6">
        <button
          onClick={handlePlayAll}
          disabled={!canPlayMore}
          className="w-14 h-14 rounded-full bg-[#F59E0B] flex items-center justify-center hover:bg-[#D97706] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFavoritesPlaying && isPlaying ? (
            <Pause className="w-7 h-7 text-[#0F172A] fill-current" />
          ) : (
            <Play className="w-7 h-7 text-[#0F172A] fill-current ml-1" />
          )}
        </button>
      </div>

      {/* Songs List */}
      <div className="space-y-1">
        {favoriteSongs.map((song, index) => {
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
                onClick={() => removeFromFavorites(song.id)}
                className="p-2 text-[#F59E0B] hover:text-red-500 transition-colors"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
