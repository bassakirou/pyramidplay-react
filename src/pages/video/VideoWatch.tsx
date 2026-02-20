import { useState } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Plus, 
  Bell, 
  Check,
  Copy,
  Facebook,
  Twitter,
  Link as LinkIcon
} from 'lucide-react';
import { videos, channels } from '@/data/videoMockData';
import { VideoCard } from '@/components/video/VideoCard';
import { CommentSection } from '@/components/video/CommentSection';
import { useVideo } from '@/contexts/VideoContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface VideoWatchProps {
  videoId: string;
  onVideoClick: (videoId: string) => void;
  onChannelClick: (channelId: string) => void;
}

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Aujourd\'hui';
  if (days === 1) return 'Hier';
  if (days < 7) return `Il y a ${days} jours`;
  if (days < 30) return `Il y a ${Math.floor(days / 7)} semaines`;
  if (days < 365) return `Il y a ${Math.floor(days / 30)} mois`;
  return `Il y a ${Math.floor(days / 365)} ans`;
}

export function VideoWatch({ videoId, onVideoClick, onChannelClick }: VideoWatchProps) {
  const video = videos.find(v => v.id === videoId);
  const channel = video ? channels.find(c => c.id === video.channelId) : null;
  const relatedVideos = video ? videos.filter(v => v.id !== videoId && v.channelId === video.channelId).slice(0, 4) : [];
  
  const { 
    isVideoFavorite, 
    addVideoToFavorites, 
    removeVideoFromFavorites,
    subscribeToChannel,
    unsubscribeFromChannel,
    isSubscribed,
    addVideoToPlaylist,
    videoPlaylists
  } = useVideo();
  const { isAuthenticated } = useAuth();
  
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isPlaylistDialogOpen, setIsPlaylistDialogOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!video || !channel) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-400">Vidéo non trouvée</p>
      </div>
    );
  }

  const isFavorite = isVideoFavorite(video.id);
  const subscribed = isSubscribed(channel.id);

  const handleLike = () => {
    if (isFavorite) {
      removeVideoFromFavorites(video.id);
    } else {
      addVideoToFavorites(video.id);
    }
  };

  const handleSubscribe = () => {
    if (subscribed) {
      unsubscribeFromChannel(channel.id);
    } else {
      subscribeToChannel(channel.id);
    }
  };

  const handleShare = () => {
    setIsShareDialogOpen(true);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToPlaylist = (playlistId: string) => {
    addVideoToPlaylist(playlistId, video.id);
    setIsPlaylistDialogOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black">
          <video
            src={video.videoUrl}
            poster={video.thumbnailUrl}
            controls
            autoPlay
            className="w-full h-full"
          >
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        </div>

        {/* Video Info */}
        <div className="p-4 md:p-6">
          {/* Title */}
          <h1 className="text-white text-xl font-medium mb-2">
            {video.title}
          </h1>

          {/* Stats & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="text-gray-400 text-sm">
              {formatViews(video.views)} vues • {formatDate(video.uploadDate)}
            </div>

            <div className="flex items-center gap-2">
              {/* Like */}
              {isAuthenticated && (
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    isFavorite
                      ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                      : 'bg-[#1E293B] text-white hover:bg-[#2D3748]'
                  }`}
                >
                  <ThumbsUp className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  <span className="font-medium">{formatViews(video.likes)}</span>
                </button>
              )}

              {/* Dislike */}
              {isAuthenticated && (
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E293B] text-white hover:bg-[#2D3748] transition-colors">
                  <ThumbsDown className="w-5 h-5" />
                </button>
              )}

              {/* Share */}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E293B] text-white hover:bg-[#2D3748] transition-colors"
              >
                <Share2 className="w-5 h-5" />
                <span className="font-medium hidden sm:inline">Partager</span>
              </button>

              {/* Add to Playlist */}
              {isAuthenticated && (
                <button
                  onClick={() => setIsPlaylistDialogOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E293B] text-white hover:bg-[#2D3748] transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium hidden sm:inline">Enregistrer</span>
                </button>
              )}
            </div>
          </div>

          {/* Channel Info */}
          <div className="flex items-center justify-between py-4 border-t border-b border-white/10 mb-4">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => onChannelClick(channel.id)}
            >
              <img
                src={channel.avatarUrl}
                alt={channel.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-white font-medium hover:text-[#F59E0B] transition-colors">
                  {channel.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {formatViews(channel.subscriberCount)} abonnés
                </p>
              </div>
            </div>

            {isAuthenticated && (
              <button
                onClick={handleSubscribe}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors ${
                  subscribed
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-[#F59E0B] text-[#0F172A] hover:bg-[#D97706]'
                }`}
              >
                {subscribed ? (
                  <>
                    <Bell className="w-4 h-4" />
                    Abonné
                  </>
                ) : (
                  'S\'abonner'
                )}
              </button>
            )}
          </div>

          {/* Description */}
          <div className="bg-[#1E293B] rounded-xl p-4 mb-6">
            <div className={`text-gray-300 whitespace-pre-wrap ${showFullDescription ? '' : 'line-clamp-3'}`}>
              {video.description}
            </div>
            {video.description.length > 200 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-[#F59E0B] text-sm font-medium mt-2 hover:underline"
              >
                {showFullDescription ? 'Afficher moins' : 'Afficher plus'}
              </button>
            )}
          </div>

          {/* Comments */}
          <CommentSection videoId={videoId} />
        </div>
      </div>

      {/* Sidebar - Related Videos */}
      <div className="lg:w-96 lg:border-l lg:border-white/10 p-4 overflow-y-auto">
        <h3 className="text-white font-medium mb-4">Vidéos recommandées</h3>
        <div className="space-y-4">
          {relatedVideos.map((relatedVideo) => (
            <VideoCard
              key={relatedVideo.id}
              video={relatedVideo}
              layout="list"
              onClick={() => onVideoClick(relatedVideo.id)}
            />
          ))}
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="bg-[#1E293B] border-white/10 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white">Partager</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {/* Copy Link */}
            <div className="flex items-center gap-2 p-3 bg-[#0F172A] rounded-lg">
              <input
                type="text"
                value={typeof window !== 'undefined' ? window.location.href : ''}
                readOnly
                className="flex-1 bg-transparent text-white text-sm outline-none"
              />
              <button
                onClick={copyLink}
                className="p-2 text-[#F59E0B] hover:bg-white/10 rounded transition-colors"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            {/* Social Share */}
            <div className="grid grid-cols-4 gap-2">
              <button className="flex flex-col items-center gap-2 p-3 hover:bg-white/10 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-400 text-xs">Facebook</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 hover:bg-white/10 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                  <Twitter className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-400 text-xs">Twitter</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 hover:bg-white/10 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <LinkIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-400 text-xs">WhatsApp</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Playlist Dialog */}
      <Dialog open={isPlaylistDialogOpen} onOpenChange={setIsPlaylistDialogOpen}>
        <DialogContent className="bg-[#1E293B] border-white/10 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white">Enregistrer dans</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-4 max-h-60 overflow-y-auto">
            {videoPlaylists.length === 0 ? (
              <p className="text-gray-400 text-center py-4">
                Vous n'avez pas encore de playlist
              </p>
            ) : (
              videoPlaylists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => handleAddToPlaylist(playlist.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-[#0F172A] hover:bg-[#F59E0B]/20 text-white transition-colors text-left"
                >
                  <div className="w-12 h-12 bg-[#1E293B] rounded flex items-center justify-center">
                    {playlist.videos[0] ? (
                      <img 
                        src={playlist.videos[0].thumbnailUrl} 
                        alt="" 
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 rounded" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{playlist.name}</p>
                    <p className="text-gray-400 text-sm">{playlist.videos.length} vidéos</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
