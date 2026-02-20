import { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { Video, Channel, VideoComment, VideoPlaylist, VideoNotification } from '@/types/video';
import { videos, channels, videoComments, videoPlaylists, videoNotifications } from '@/data/videoMockData';

interface VideoContextType {
  // Lecture vidéo
  currentVideo: Video | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  playbackSpeed: number;
  
  // Playlist lecture
  videoQueue: Video[];
  currentVideoIndex: number;
  isShuffle: boolean;
  isRepeat: boolean;
  
  // Actions lecture
  playVideo: (video: Video) => void;
  playVideoQueue: (videos: Video[], startIndex?: number) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  seek: (time: number) => void;
  nextVideo: () => void;
  previousVideo: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
  setPlaybackSpeed: (speed: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  
  // Données
  allVideos: Video[];
  allChannels: Channel[];
  
  // Favoris vidéo
  videoFavorites: string[];
  addVideoToFavorites: (videoId: string) => void;
  removeVideoFromFavorites: (videoId: string) => void;
  isVideoFavorite: (videoId: string) => boolean;
  
  // Playlists vidéo
  videoPlaylists: VideoPlaylist[];
  createVideoPlaylist: (name: string, description?: string) => void;
  deleteVideoPlaylist: (playlistId: string) => void;
  addVideoToPlaylist: (playlistId: string, videoId: string) => void;
  removeVideoFromPlaylist: (playlistId: string, videoId: string) => void;
  
  // Chaînes
  userChannel: Channel | null;
  createChannel: (name: string, description: string) => void;
  updateChannel: (updates: Partial<Channel>) => void;
  
  // Abonnements
  subscriptions: string[];
  subscribeToChannel: (channelId: string) => void;
  unsubscribeFromChannel: (channelId: string) => void;
  isSubscribed: (channelId: string) => boolean;
  
  // Commentaires
  addComment: (videoId: string, content: string) => void;
  likeComment: (commentId: string) => void;
  
  // Notifications
  notifications: VideoNotification[];
  markNotificationAsRead: (notificationId: string) => void;
  clearNotifications: () => void;
  unreadNotificationsCount: number;
  
  // Navigation
  videoViewParams: Record<string, unknown>;
  setVideoViewParams: (params: Record<string, unknown>) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: React.ReactNode }) {
  // État de lecture
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeedState] = useState(1);
  
  // Queue de lecture
  const [videoQueue, setVideoQueue] = useState<Video[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  
  // Favoris
  const [videoFavorites, setVideoFavorites] = useState<string[]>([]);
  
  // Playlists
  const [userVideoPlaylists, setUserVideoPlaylists] = useState<VideoPlaylist[]>(videoPlaylists);
  
  // Chaîne utilisateur
  const [userChannel, setUserChannel] = useState<Channel | null>(null);
  
  // Abonnements
  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  
  // Commentaires
  const [, setComments] = useState<VideoComment[]>(videoComments);
  
  // Notifications
  const [notifications, setNotifications] = useState<VideoNotification[]>(videoNotifications);
  
  // Params de vue
  const [videoViewParams, setVideoViewParams] = useState<Record<string, unknown>>({});
  
  // Référence vidéo
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Calculer le nombre de notifications non lues
  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  // Lecture vidéo
  const playVideo = useCallback((video: Video) => {
    setCurrentVideo(video);
    setDuration(video.duration);
    setProgress(0);
    setIsPlaying(true);
  }, []);

  const playVideoQueue = useCallback((videoList: Video[], startIndex = 0) => {
    setVideoQueue(videoList);
    setCurrentVideoIndex(startIndex);
    playVideo(videoList[startIndex]);
  }, [playVideo]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const seek = useCallback((time: number) => {
    setProgress(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  }, []);

  const nextVideo = useCallback(() => {
    if (videoQueue.length === 0) return;
    
    let nextIndex: number;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * videoQueue.length);
    } else {
      nextIndex = (currentVideoIndex + 1) % videoQueue.length;
    }
    
    if (!isRepeat && currentVideoIndex === videoQueue.length - 1 && !isShuffle) {
      setIsPlaying(false);
      return;
    }
    
    setCurrentVideoIndex(nextIndex);
    playVideo(videoQueue[nextIndex]);
  }, [videoQueue, currentVideoIndex, isShuffle, isRepeat, playVideo]);

  const previousVideo = useCallback(() => {
    if (videoQueue.length === 0) return;
    
    let prevIndex: number;
    if (isShuffle) {
      prevIndex = Math.floor(Math.random() * videoQueue.length);
    } else {
      prevIndex = currentVideoIndex === 0 ? videoQueue.length - 1 : currentVideoIndex - 1;
    }
    
    setCurrentVideoIndex(prevIndex);
    playVideo(videoQueue[prevIndex]);
  }, [videoQueue, currentVideoIndex, isShuffle, playVideo]);

  const setVolume = useCallback((vol: number) => {
    setVolumeState(Math.max(0, Math.min(1, vol)));
    if (vol > 0) setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const setPlaybackSpeed = useCallback((speed: number) => {
    setPlaybackSpeedState(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffle(prev => !prev);
  }, []);

  const toggleRepeat = useCallback(() => {
    setIsRepeat(prev => !prev);
  }, []);

  // Favoris
  const addVideoToFavorites = useCallback((videoId: string) => {
    setVideoFavorites(prev => [...prev, videoId]);
  }, []);

  const removeVideoFromFavorites = useCallback((videoId: string) => {
    setVideoFavorites(prev => prev.filter(id => id !== videoId));
  }, []);

  const isVideoFavorite = useCallback((videoId: string) => {
    return videoFavorites.includes(videoId);
  }, [videoFavorites]);

  // Playlists
  const createVideoPlaylist = useCallback((name: string, description = '') => {
    const newPlaylist: VideoPlaylist = {
      id: `vplaylist-${Date.now()}`,
      name,
      description,
      userId: 'current-user',
      videos: [],
      isPublic: true,
      createdAt: new Date(),
    };
    setUserVideoPlaylists(prev => [...prev, newPlaylist]);
  }, []);

  const deleteVideoPlaylist = useCallback((playlistId: string) => {
    setUserVideoPlaylists(prev => prev.filter(p => p.id !== playlistId));
  }, []);

  const addVideoToPlaylist = useCallback((playlistId: string, videoId: string) => {
    const video = videos.find(v => v.id === videoId);
    if (!video) return;
    
    setUserVideoPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId && !playlist.videos.find(v => v.id === videoId)) {
        return { ...playlist, videos: [...playlist.videos, video] };
      }
      return playlist;
    }));
  }, []);

  const removeVideoFromPlaylist = useCallback((playlistId: string, videoId: string) => {
    setUserVideoPlaylists(prev => prev.map(playlist => {
      if (playlist.id === playlistId) {
        return { ...playlist, videos: playlist.videos.filter(v => v.id !== videoId) };
      }
      return playlist;
    }));
  }, []);

  // Chaîne
  const createChannel = useCallback((name: string, description: string) => {
    const newChannel: Channel = {
      id: `channel-${Date.now()}`,
      name,
      description,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
      bannerUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=1200&h=400&fit=crop',
      subscriberCount: 0,
      videoCount: 0,
      ownerId: 'current-user',
      createdAt: new Date(),
    };
    setUserChannel(newChannel);
  }, []);

  const updateChannel = useCallback((updates: Partial<Channel>) => {
    setUserChannel(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  // Abonnements
  const subscribeToChannel = useCallback((channelId: string) => {
    setSubscriptions(prev => [...prev, channelId]);
  }, []);

  const unsubscribeFromChannel = useCallback((channelId: string) => {
    setSubscriptions(prev => prev.filter(id => id !== channelId));
  }, []);

  const isSubscribed = useCallback((channelId: string) => {
    return subscriptions.includes(channelId);
  }, [subscriptions]);

  // Commentaires
  const addComment = useCallback((videoId: string, content: string) => {
    const newComment: VideoComment = {
      id: `comment-${Date.now()}`,
      videoId,
      userId: 'current-user',
      userName: 'Utilisateur',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
      content,
      likes: 0,
      createdAt: new Date(),
    };
    setComments(prev => [...prev, newComment]);
  }, []);

  const likeComment = useCallback((commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  }, []);

  // Notifications
  const markNotificationAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <VideoContext.Provider
      value={{
        currentVideo,
        isPlaying,
        progress,
        duration,
        volume,
        isMuted,
        isFullscreen,
        playbackSpeed,
        videoQueue,
        currentVideoIndex,
        isShuffle,
        isRepeat,
        playVideo,
        playVideoQueue,
        togglePlay,
        pause,
        resume,
        seek,
        nextVideo,
        previousVideo,
        setVolume,
        toggleMute,
        toggleFullscreen,
        setPlaybackSpeed,
        toggleShuffle,
        toggleRepeat,
        allVideos: videos,
        allChannels: channels,
        videoFavorites,
        addVideoToFavorites,
        removeVideoFromFavorites,
        isVideoFavorite,
        videoPlaylists: userVideoPlaylists,
        createVideoPlaylist,
        deleteVideoPlaylist,
        addVideoToPlaylist,
        removeVideoFromPlaylist,
        userChannel,
        createChannel,
        updateChannel,
        subscriptions,
        subscribeToChannel,
        unsubscribeFromChannel,
        isSubscribed,
        addComment,
        likeComment,
        notifications,
        markNotificationAsRead,
        clearNotifications,
        unreadNotificationsCount,
        videoViewParams,
        setVideoViewParams,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}
