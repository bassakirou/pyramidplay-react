import { Play, Pause, Heart, Users } from 'lucide-react';
import { artists } from '@/data/mockData';
import { usePlayer } from '@/contexts/PlayerContext';
import { useAuth } from '@/contexts/AuthContext';
import { AlbumCard } from '@/components/ui/custom/AlbumCard';

interface ArtistPageProps {
  artistId: string;
}

export function ArtistPage({ artistId }: ArtistPageProps) {
  const artist = artists.find(a => a.id === artistId);
  const { playPlaylist, isPlaying, currentSong, canPlayMore, playlist } = usePlayer();
  const { isAuthenticated, isFavorite, addToFavorites, removeFromFavorites } = useAuth();

  if (!artist) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-400">Artiste non trouvé</p>
      </div>
    );
  }

  // Get all songs from all albums
  const allSongs = artist.albums.flatMap(album => album.songs);

  // Vérifier si cet artiste est en cours de lecture
  const isThisArtistPlaying = playlist.length > 0 && playlist[0]?.artistId === artist.id;

  const handlePlay = () => {
    if (allSongs.length > 0 && canPlayMore) {
      playPlaylist(allSongs, 0);
    }
  };

  const handlePlaySong = (songIndex: number) => {
    if (canPlayMore) {
      playPlaylist(allSongs, songIndex);
    }
  };

  const isArtistFavorite = isAuthenticated && allSongs.length > 0 && allSongs.every(song => isFavorite(song.id));

  return (
    <div className="overflow-y-auto h-full">
      {/* Artist Header */}
      <div className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F59E0B]/30 to-[#0F172A] h-80"></div>
        
        <div className="relative p-6 pt-16">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            {/* Artist Image */}
            <div className="flex-shrink-0">
              <img
                src={artist.imageUrl}
                alt={artist.name}
                className="w-40 h-40 md:w-52 md:h-52 rounded-full shadow-2xl object-cover border-4 border-[#0F172A]"
              />
            </div>

            {/* Artist Info */}
            <div className="flex-1">
              <span className="text-gray-400 text-sm uppercase tracking-wider">ARTISTE</span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{artist.name}</h1>
              
              {artist.bio && (
                <p className="text-gray-300 mb-4 max-w-2xl line-clamp-2">{artist.bio}</p>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>{artist.songsCount.toLocaleString()} chansons</span>
                <span>•</span>
                <span>{artist.albums.length} albums</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={handlePlay}
                  disabled={!canPlayMore}
                  className="flex items-center gap-2 px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-50 disabled:cursor-not-allowed text-[#0F172A] font-semibold rounded-full transition-colors"
                >
                  {isThisArtistPlaying && isPlaying ? (
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
                      allSongs.forEach(song => {
                        if (isFavorite(song.id)) {
                          removeFromFavorites(song.id);
                        } else {
                          addToFavorites(song.id);
                        }
                      });
                    }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-full border transition-colors ${
                      isArtistFavorite
                        ? 'border-[#F59E0B] text-[#F59E0B]'
                        : 'border-white/20 text-white hover:border-[#F59E0B] hover:text-[#F59E0B]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isArtistFavorite ? 'fill-current' : ''}`} />
                    Sauvegarder
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Popular Songs */}
        {allSongs.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Populaires</h2>
            <div className="space-y-1">
              {allSongs.slice(0, 5).map((song, index) => {
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
                      <p className="text-gray-400 text-sm truncate">{song.albumName}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Albums */}
        {artist.albums.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                Albums de "{artist.name}"
              </h2>
              <button className="text-[#F59E0B] text-sm hover:underline">
                Tout afficher
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {artist.albums.map((album) => (
                <div key={album.id} className="flex-shrink-0 w-40">
                  <AlbumCard album={album} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
