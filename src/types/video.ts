// Types pour la section vidéo (clone YouTube)

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number; // en secondes
  channelId: string;
  channelName: string;
  channelAvatar: string;
  views: number;
  likes: number;
  uploadDate: Date;
  tags: string[];
  category: string;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
  bannerUrl: string;
  subscriberCount: number;
  videoCount: number;
  ownerId: string;
  createdAt: Date;
}

export interface VideoComment {
  id: string;
  videoId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  likes: number;
  createdAt: Date;
  replies?: VideoComment[];
}

export interface VideoPlaylist {
  id: string;
  name: string;
  description: string;
  userId: string;
  videos: Video[];
  thumbnailUrl?: string;
  isPublic: boolean;
  createdAt: Date;
}

export interface Subscription {
  channelId: string;
  userId: string;
  subscribedAt: Date;
}

export interface VideoNotification {
  id: string;
  type: 'new_video' | 'new_subscriber' | 'new_comment' | 'new_like';
  title: string;
  message: string;
  channelId?: string;
  videoId?: string;
  userId?: string;
  isRead: boolean;
  createdAt: Date;
}

export type VideoView = 
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
