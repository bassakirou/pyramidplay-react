import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import type { Song } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  songsPlayed: number;
  maxFreeSongs: number;
  playlist: Song[];
  currentIndex: number;
  isShuffle: boolean;
  isRepeat: boolean;
  totalSongs: number;
  playSong: (song: Song) => void;
  playPlaylist: (songs: Song[], startIndex?: number) => void;
  pause: () => void;
  resume: () => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  canPlayMore: boolean;
  resetPlayCount: () => void;
  queue: Song[];
  addToQueue: (song: Song) => void;
  clearQueue: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [songsPlayed, setSongsPlayed] = useState(0);
  const [queue, setQueue] = useState<Song[]>([]);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const maxFreeSongs = 3;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasCountedCurrentSong = useRef(false);

  const canPlayMore = isAuthenticated || songsPlayed < maxFreeSongs;
  const totalSongs = playlist.length;

  // Initialiser l'audio element une seule fois
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
  }, []);

  const playSong = useCallback((song: Song) => {
    if (!isAuthenticated && songsPlayed >= maxFreeSongs && !hasCountedCurrentSong.current) {
      return;
    }
    
    setCurrentSong(song);
    setDuration(song.duration);
    setProgress(0);
    
    if (audioRef.current) {
      audioRef.current.src = song.audioUrl || '';
      audioRef.current.load();
    }
    
    setIsPlaying(true);
    
    if (!hasCountedCurrentSong.current) {
      setSongsPlayed(prev => prev + 1);
      hasCountedCurrentSong.current = true;
    }
  }, [songsPlayed, maxFreeSongs, isAuthenticated]);

  const playPlaylist = useCallback((songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return;
    
    setPlaylist(songs);
    setCurrentIndex(startIndex);
    hasCountedCurrentSong.current = false;
    playSong(songs[startIndex]);
  }, [playSong]);

  const playNextSong = useCallback(() => {
    if (playlist.length === 0) return;

    let nextIndex: number;

    if (isShuffle) {
      // Mode aléatoire
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      // Mode normal
      nextIndex = (currentIndex + 1) % playlist.length;
    }

    // Si on est à la fin et pas en mode repeat, on s'arrête
    if (!isRepeat && currentIndex === playlist.length - 1 && !isShuffle) {
      setIsPlaying(false);
      setProgress(0);
      return;
    }

    setCurrentIndex(nextIndex);
    hasCountedCurrentSong.current = false;
    playSong(playlist[nextIndex]);
  }, [playlist, currentIndex, isShuffle, isRepeat, playSong]);

  // Gérer les listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      // Lecture automatique de la chanson suivante
      if (playlist.length > 0) {
        playNextSong();
      } else {
        setIsPlaying(false);
        setProgress(0);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playlist, isShuffle, isRepeat, currentIndex, playNextSong]);

  // Mettre à jour le volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Jouer/pause l'audio
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Playback failed:", error);
            // Don't necessarily stop playing state if it's just a load race, 
            // but for user interaction policies usually we need to be careful.
            // If the error is NotAllowedError, we definitely need to stop.
            if (error.name === 'NotAllowedError' || error.name === 'NotSupportedError') {
               setIsPlaying(false);
            }
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    if (currentSong && canPlayMore) {
      setIsPlaying(true);
    }
  }, [currentSong, canPlayMore]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  }, [isPlaying, pause, resume]);

  const next = useCallback(() => {
    if (playlist.length > 0) {
      playNextSong();
    } else if (queue.length > 0 && canPlayMore) {
      const nextSong = queue[0];
      setQueue(prev => prev.slice(1));
      playSong(nextSong);
    }
  }, [playlist, queue, canPlayMore, playSong, playNextSong]);

  const previous = useCallback(() => {
    if (playlist.length === 0) {
      setProgress(0);
      return;
    }

    let prevIndex: number;

    if (isShuffle) {
      prevIndex = Math.floor(Math.random() * playlist.length);
    } else {
      prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    }

    setCurrentIndex(prevIndex);
    hasCountedCurrentSong.current = false;
    playSong(playlist[prevIndex]);
  }, [playlist, currentIndex, isShuffle, playSong]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  }, []);

  const setVolume = useCallback((vol: number) => {
    setVolumeState(Math.max(0, Math.min(1, vol)));
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffle(prev => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setIsRepeat(prev => !prev);
  }, []);

  const resetPlayCount = useCallback(() => {
    setSongsPlayed(0);
    hasCountedCurrentSong.current = false;
  }, []);

  const addToQueue = useCallback((song: Song) => {
    setQueue(prev => [...prev, song]);
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        progress,
        duration,
        volume,
        songsPlayed,
        maxFreeSongs,
        playlist,
        currentIndex,
        isShuffle,
        isRepeat,
        totalSongs,
        playSong,
        playPlaylist,
        pause,
        resume,
        togglePlay,
        next,
        previous,
        seek,
        setVolume,
        toggleShuffle,
        toggleRepeat,
        canPlayMore,
        resetPlayCount,
        queue,
        addToQueue,
        clearQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
