export interface Song {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  albumId: string;
  albumName: string;
  duration: number; // en secondes
  coverUrl: string;
  audioUrl?: string;
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  year: number;
  coverUrl: string;
  songs: Song[];
  description?: string;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  bio?: string;
  albums: Album[];
  songsCount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isSubscribed: boolean;
  favorites: string[]; // song ids
  playlists: Playlist[];
}

export interface Playlist {
  id: string;
  name: string;
  userId: string;
  songs: Song[];
  coverUrl?: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export type View = 
  | 'home' 
  | 'album' 
  | 'artist' 
  | 'search' 
  | 'login' 
  | 'register' 
  | 'library' 
  | 'favorites' 
  | 'playlists' 
  | 'podcasts'
  // Video views
  | 'video_home'
  | 'video_watch'
  | 'video_channel'
  | 'video_library'
  | 'video_playlists'
  | 'video_favorites'
  | 'video_subscriptions'
  | 'video_trending'
  | 'video_history'
  | 'video_upload'
  | 'video_create_channel';
