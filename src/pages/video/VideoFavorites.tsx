import { ThumbsUp, Film } from 'lucide-react';
import { useVideo } from '@/contexts/VideoContext';
import { useAuth } from '@/contexts/AuthContext';
import { VideoCard } from '@/components/video/VideoCard';
import { videos } from '@/data/videoMockData';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/contexts/NavigationContext';

interface VideoFavoritesProps {
  onVideoClick: (videoId: string) => void;
}

export function VideoFavorites({ onVideoClick }: VideoFavoritesProps) {
  const { videoFavorites } = useVideo();
  const { isAuthenticated } = useAuth();
  const { navigateTo } = useNavigation();

  // Get favorite videos
  const favoriteVideos = videos.filter(v => videoFavorites.includes(v.id));

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="w-20 h-20 bg-[#1E293B] rounded-full flex items-center justify-center mb-4">
          <ThumbsUp className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-white text-xl font-medium mb-2">Connectez-vous</h2>
        <p className="text-gray-400 text-center max-w-md">
          Connectez-vous pour voir vos vidéos aimées.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold mb-2">Vidéos aimées</h1>
        <p className="text-gray-400">
          {favoriteVideos.length} vidéo{favoriteVideos.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Content */}
      {favoriteVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {favoriteVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onClick={() => onVideoClick(video.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <ThumbsUp className="w-16 h-16 text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg mb-2">Aucune vidéo aimée</p>
          <p className="text-gray-500 text-sm mb-6 text-center max-w-md">
            Likez des vidéos pour les retrouver ici et les regarder plus tard
          </p>
          <Button
            onClick={() => navigateTo('video_home')}
            className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold"
          >
            <Film className="w-4 h-4 mr-2" />
            Découvrir des vidéos
          </Button>
        </div>
      )}
    </div>
  );
}
