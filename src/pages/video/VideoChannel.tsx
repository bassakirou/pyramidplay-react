import { useState } from 'react';
import { Bell, UserPlus, Film, Info, Grid3X3 } from 'lucide-react';
import { useVideo } from '@/contexts/VideoContext';
import { useAuth } from '@/contexts/AuthContext';
import { getChannelVideos } from '@/data/videoMockData';
import { VideoCard } from '@/components/video/VideoCard';
import { channels } from '@/data/videoMockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VideoChannelProps {
  channelId?: string;
  onVideoClick: (videoId: string) => void;
}

function formatSubscriberCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

export function VideoChannel({ channelId, onVideoClick }: VideoChannelProps) {
  const { userChannel, subscribeToChannel, unsubscribeFromChannel, isSubscribed } = useVideo();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('videos');

  // Use provided channelId or fall back to user's channel
  const channel = channelId 
    ? channels.find(c => c.id === channelId)
    : userChannel;

  const channelVideos = channel ? getChannelVideos(channel.id) : [];
  const subscribed = channel ? isSubscribed(channel.id) : false;

  if (!channel) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="w-20 h-20 bg-[#1E293B] rounded-full flex items-center justify-center mb-4">
          <Film className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-white text-xl font-medium mb-2">Aucune chaîne</h2>
        <p className="text-gray-400 text-center max-w-md">
          Vous n'avez pas encore créé de chaîne. Créez une chaîne pour commencer à partager vos vidéos.
        </p>
      </div>
    );
  }

  const handleSubscribe = () => {
    if (subscribed) {
      unsubscribeFromChannel(channel.id);
    } else {
      subscribeToChannel(channel.id);
    }
  };

  return (
    <div className="overflow-y-auto h-full">
      {/* Banner */}
      <div className="relative h-32 md:h-48 lg:h-64">
        <img
          src={channel.bannerUrl}
          alt={channel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
      </div>

      {/* Channel Info */}
      <div className="px-4 md:px-8 -mt-12 md:-mt-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#0F172A] bg-[#1E293B]">
            <img
              src={channel.avatarUrl}
              alt={channel.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 pb-2">
            <h1 className="text-white text-2xl md:text-3xl font-bold">{channel.name}</h1>
            <div className="flex flex-wrap items-center gap-2 text-gray-400 text-sm mt-1">
              <span>{formatSubscriberCount(channel.subscriberCount)} abonnés</span>
              <span>•</span>
              <span>{channel.videoCount} vidéos</span>
            </div>
          </div>

          {/* Subscribe Button */}
          {isAuthenticated && (
            <button
              onClick={handleSubscribe}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-colors mb-2 ${
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
                <>
                  <UserPlus className="w-4 h-4" />
                  S'abonner
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 md:px-8 mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-transparent border-b border-white/10 w-full justify-start rounded-none h-auto p-0">
            <TabsTrigger
              value="videos"
              className="data-[state=active]:bg-transparent data-[state=active]:text-[#F59E0B] data-[state=active]:border-b-2 data-[state=active]:border-[#F59E0B] rounded-none px-4 py-3 text-gray-400 hover:text-white"
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              Vidéos
            </TabsTrigger>
            <TabsTrigger
              value="playlists"
              className="data-[state=active]:bg-transparent data-[state=active]:text-[#F59E0B] data-[state=active]:border-b-2 data-[state=active]:border-[#F59E0B] rounded-none px-4 py-3 text-gray-400 hover:text-white"
            >
              <Film className="w-4 h-4 mr-2" />
              Playlists
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="data-[state=active]:bg-transparent data-[state=active]:text-[#F59E0B] data-[state=active]:border-b-2 data-[state=active]:border-[#F59E0B] rounded-none px-4 py-3 text-gray-400 hover:text-white"
            >
              <Info className="w-4 h-4 mr-2" />
              À propos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="mt-6">
            {channelVideos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {channelVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={() => onVideoClick(video.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Aucune vidéo pour le moment</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="playlists" className="mt-6">
            <div className="text-center py-12">
              <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Aucune playlist publique</p>
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <div className="max-w-2xl">
              <h3 className="text-white font-medium mb-3">Description</h3>
              <p className="text-gray-300 whitespace-pre-wrap mb-6">
                {channel.description}
              </p>

              <h3 className="text-white font-medium mb-3">Statistiques</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1E293B] rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Abonnés</p>
                  <p className="text-white text-xl font-bold">{formatSubscriberCount(channel.subscriberCount)}</p>
                </div>
                <div className="bg-[#1E293B] rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Vidéos</p>
                  <p className="text-white text-xl font-bold">{channel.videoCount}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-gray-400 text-sm">
                  Chaîne créée le {channel.createdAt.toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
