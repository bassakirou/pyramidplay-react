import { Volume2, Volume1, VolumeX, Repeat, Shuffle, Heart } from 'lucide-react';
import { usePlayer } from '@/contexts/PlayerContext';
import { useAuth } from '@/contexts/AuthContext';
import { Slider } from '@/components/ui/slider';
import { SkipBack, Play, Pause, SkipForward } from 'lucide-react';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function Player() {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    volume,
    songsPlayed,
    maxFreeSongs,

    currentIndex,
    totalSongs,
    isShuffle,
    isRepeat,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    canPlayMore,
  } = usePlayer();
  const { isAuthenticated, isFavorite, addToFavorites, removeFromFavorites } = useAuth();

  if (!currentSong) {
    return (
      <div className="h-16 md:h-20 bg-[#0F172A] border-t border-white/10 flex items-center justify-center px-4">
        <p className="text-gray-400 text-xs md:text-sm text-center">
          {!isAuthenticated && songsPlayed >= maxFreeSongs 
            ? `Limite atteinte. Connectez-vous pour continuer.` 
            : 'Sélectionnez une chanson pour commencer'}
        </p>
      </div>
    );
  }

  const isSongFavorite = isFavorite(currentSong.id);
  const currentTrackNumber = totalSongs > 0 ? `${currentIndex + 1}/${totalSongs}` : '';

  return (
    <div className="bg-[#0F172A] border-t border-white/10">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Top Row - Controls */}
        <div className="flex items-center justify-between px-3 py-2">
          {/* Song Info */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <img
              src={currentSong.coverUrl}
              alt={currentSong.title}
              className="w-10 h-10 rounded object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">{currentSong.title}</p>
              <p className="text-gray-400 text-xs truncate">{currentSong.artistName}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            {/* Shuffle */}
            <button 
              onClick={toggleShuffle}
              className={`p-2 rounded-full transition-colors ${isShuffle ? 'text-[#F59E0B]' : 'text-gray-400 hover:text-white'}`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            {/* Previous */}
            <button 
              onClick={previous}
              className="p-2 text-white hover:text-[#F59E0B] transition-colors"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              disabled={!canPlayMore && !isPlaying}
              className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center hover:bg-[#D97706] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-[#0F172A] fill-current" />
              ) : (
                <Play className="w-5 h-5 text-[#0F172A] fill-current ml-0.5" />
              )}
            </button>

            {/* Next */}
            <button 
              onClick={next}
              className="p-2 text-white hover:text-[#F59E0B] transition-colors"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>

            {/* Repeat */}
            <button 
              onClick={toggleRepeat}
              className={`p-2 rounded-full transition-colors ${isRepeat ? 'text-[#F59E0B]' : 'text-gray-400 hover:text-white'}`}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Row - Progress & Volume */}
        <div className="flex items-center gap-2 px-3 pb-2">
          <span className="text-xs text-gray-400 w-8">
            {formatTime(progress)}
          </span>
          <div className="flex-1">
            <Slider
              value={[progress]}
              max={duration || 100}
              step={1}
              onValueChange={(value) => seek(value[0])}
              className="cursor-pointer"
            />
          </div>
          <span className="text-xs text-gray-400 w-8 text-right">
            {formatTime(duration)}
          </span>
          
          {/* Track Counter */}
          {totalSongs > 0 && (
            <span className="text-xs text-[#F59E0B] ml-1">
              {currentTrackNumber}
            </span>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-24 items-center px-4 lg:px-6 gap-4">
        {/* Song Info */}
        <div className="flex items-center gap-3 w-1/4 min-w-[200px]">
          <img
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className="w-14 h-14 rounded-md object-cover"
          />
          <div className="min-w-0">
            <p className="text-white font-medium truncate">{currentSong.title}</p>
            <p className="text-gray-400 text-sm truncate">{currentSong.artistName}</p>
          </div>
          {isAuthenticated && (
            <button
              onClick={() => isSongFavorite ? removeFromFavorites(currentSong.id) : addToFavorites(currentSong.id)}
              className={`ml-2 p-1 rounded-full transition-colors ${
                isSongFavorite ? 'text-[#F59E0B]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isSongFavorite ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Player Controls */}
        <div className="flex-1 flex flex-col items-center gap-2">
          {/* Control Buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleShuffle}
              className={`transition-colors ${isShuffle ? 'text-[#F59E0B]' : 'text-gray-400 hover:text-white'}`}
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button 
              onClick={previous}
              className="text-white hover:text-[#F59E0B] transition-colors"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            <button
              onClick={togglePlay}
              disabled={!canPlayMore && !isPlaying}
              className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center hover:bg-[#D97706] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-[#0F172A] fill-current" />
              ) : (
                <Play className="w-5 h-5 text-[#0F172A] fill-current ml-0.5" />
              )}
            </button>
            <button 
              onClick={next}
              className="text-white hover:text-[#F59E0B] transition-colors"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
            <button 
              onClick={toggleRepeat}
              className={`transition-colors ${isRepeat ? 'text-[#F59E0B]' : 'text-gray-400 hover:text-white'}`}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xl flex items-center gap-3">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(progress)}
            </span>
            <div className="flex-1">
              <Slider
                value={[progress]}
                max={duration || 100}
                step={1}
                onValueChange={(value) => seek(value[0])}
                className="cursor-pointer"
              />
            </div>
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
            
            {/* Track Counter */}
            {totalSongs > 0 && (
              <span className="text-xs text-[#F59E0B] ml-1">
                {currentTrackNumber}
              </span>
            )}
          </div>
        </div>

        {/* Volume & Extra Controls */}
        <div className="flex items-center gap-3 w-1/4 min-w-[150px] justify-end">
          {/* Free songs counter for non-authenticated users */}
          {!isAuthenticated && (
            <div className="text-xs text-gray-400 mr-2">
              {songsPlayed}/{maxFreeSongs}
            </div>
          )}
          
          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : volume < 0.5 ? (
                <Volume1 className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <div className="w-24">
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0] / 100)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
