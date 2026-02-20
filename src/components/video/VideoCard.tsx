import { useState } from 'react';
import { Play, Clock, MoreVertical } from 'lucide-react';
import type { Video } from '@/types/video';
import { useVideo } from '@/contexts/VideoContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface VideoCardProps {
  video: Video;
  layout?: 'grid' | 'list';
  onClick?: () => void;
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

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const hours = Math.floor(mins / 60);
  
  if (hours > 0) {
    return `${hours}:${String(mins % 60).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${mins}:${String(secs).padStart(2, '0')}`;
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

export function VideoCard({ video, layout = 'grid', onClick }: VideoCardProps) {
  const { playVideo, addVideoToPlaylist, videoPlaylists } = useVideo();
  const { isAuthenticated } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    playVideo(video);
    onClick?.();
  };

  const handleAddToPlaylist = (playlistId: string) => {
    addVideoToPlaylist(playlistId, video.id);
  };

  if (layout === 'list') {
    return (
      <div
        className="group flex gap-4 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 w-40 md:w-56 aspect-video rounded-lg overflow-hidden">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {formatDuration(video.duration)}
          </div>
          {isHovered && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Play className="w-10 h-10 text-white fill-current" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 py-1">
          <h3 className="text-white font-medium line-clamp-2 group-hover:text-[#F59E0B] transition-colors">
            {video.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            {video.channelName}
          </p>
          <p className="text-gray-500 text-sm">
            {formatViews(video.views)} vues • {formatDate(video.uploadDate)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
          {formatDuration(video.duration)}
        </div>
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Play className="w-12 h-12 text-white fill-current" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex gap-3">
        {/* Channel Avatar */}
        <img
          src={video.channelAvatar}
          alt={video.channelName}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
        />

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium line-clamp-2 group-hover:text-[#F59E0B] transition-colors">
            {video.title}
          </h3>
          <p className="text-gray-400 text-sm mt-0.5">
            {video.channelName}
          </p>
          <p className="text-gray-500 text-sm">
            {formatViews(video.views)} vues • {formatDate(video.uploadDate)}
          </p>
        </div>

        {/* Menu */}
        {isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1E293B] border-white/10">
              {videoPlaylists.map(playlist => (
                <DropdownMenuItem
                  key={playlist.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToPlaylist(playlist.id);
                  }}
                  className="text-white hover:bg-white/10 cursor-pointer"
                >
                  Ajouter à "{playlist.name}"
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  // Watch later
                }}
                className="text-white hover:bg-white/10 cursor-pointer"
              >
                <Clock className="w-4 h-4 mr-2" />
                Regarder plus tard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
