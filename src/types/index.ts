export interface Music {
  id: number;
  title: string;
  image: string;
  src: string | null;
  artist?: Artist[]; // Référence vers Artist
  album?: Album; // Référence vers Album
  duration?: number; // en secondes
  releaseDate?: string; // ISO date string
  genres?: Genres[];
  createAt: string; // ISO date string
  updateAt: string; // ISO date string
}

export interface Artist {
  id: number;
  name: string;
  bio?: string;
  image?: string;
  country?: string;
  genres?: Genres[];
  social?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  createAt: string; // ISO date string
  updateAt: string; // ISO date string
}

export interface Album {
  id: number;
  title: string;
  artist?: Artist[] | string;
  coverImage?: string[] | string;
  cover?: string;
  releaseDate?: string;
  genres?: Genres[];
  trackIds?: number[] | Music[];
  createAt: string;
  updateAt: string;
}

export interface Genres {
  id: number;
  name: string;
}

export interface VideoGenre {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  title: string;
  thumbnail: string;
  src: string | null;
  channel?: string;
  views?: number;
  duration?: number;
  uploadDate?: string;
  genres?: VideoGenre[];
  description?: string;
  comments?: { id: number; author: string; text: string; date: string }[];
}

export interface ShortVideo {
  id: number;
  title: string;
  src: string | null;
  thumbnail?: string;
  duration?: number;
}

export interface PlayerState {
  currentTrack: Music | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  shuffle: boolean;
  repeat: "none" | "all" | "one";
  playlist: Music[];
  currentIndex: number;
  audioRef: React.RefObject<HTMLAudioElement> | null;
}

export interface AudioPlayerContextType {
  playerState: PlayerState;
  playTrack: (track: Music, playlist?: Music[]) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  seekTo: (time: number) => void;
  setPlaylist: (playlist: Music[]) => void;
}
