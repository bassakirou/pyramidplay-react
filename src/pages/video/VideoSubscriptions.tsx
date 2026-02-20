import { Radio, UserPlus, Film } from 'lucide-react';
import { useVideo } from '@/contexts/VideoContext';
import { useAuth } from '@/contexts/AuthContext';
import { VideoCard } from '@/components/video/VideoCard';
import { ChannelCard } from '@/components/video/ChannelCard';
import { channels, videos } from '@/data/videoMockData';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/contexts/NavigationContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

interface VideoSubscriptionsProps {
  onVideoClick: (videoId: string) => void;
  onChannelClick: (channelId: string) => void;
}

export function VideoSubscriptions({ onVideoClick, onChannelClick }: VideoSubscriptionsProps) {
  const { subscriptions, notifications, markNotificationAsRead } = useVideo();
  const { isAuthenticated } = useAuth();
  const { navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState('videos');

  // Get subscribed channels
  const subscribedChannels = channels.filter(c => subscriptions.includes(c.id));

  // Get videos from subscribed channels
  const subscriptionVideos = videos.filter(v => subscriptions.includes(v.channelId));

  // Get unread notifications
  const unreadNotifications = notifications.filter(n => !n.isRead);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="w-20 h-20 bg-[#1E293B] rounded-full flex items-center justify-center mb-4">
          <Radio className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-white text-xl font-medium mb-2">Connectez-vous</h2>
        <p className="text-gray-400 text-center max-w-md">
          Connectez-vous pour voir vos abonnements et recevoir des notifications.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold mb-2">Abonnements</h1>
        <p className="text-gray-400">
          {subscribedChannels.length} chaîne{subscribedChannels.length !== 1 ? 's' : ''} abonnée
          {subscribedChannels.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Notifications */}
      {unreadNotifications.length > 0 && (
        <div className="mb-6 bg-[#1E293B] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Notifications</h3>
            <button
              onClick={() => unreadNotifications.forEach(n => markNotificationAsRead(n.id))}
              className="text-[#F59E0B] text-sm hover:underline"
            >
              Tout marquer comme lu
            </button>
          </div>
          <div className="space-y-2">
            {unreadNotifications.slice(0, 3).map((notification) => (
              <div
                key={notification.id}
                className="flex items-center gap-3 p-3 bg-[#0F172A] rounded-lg"
              >
                <div className="w-2 h-2 bg-[#F59E0B] rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{notification.title}</p>
                  <p className="text-gray-400 text-sm">{notification.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#1E293B] border border-white/10 mb-6">
          <TabsTrigger
            value="videos"
            className="data-[state=active]:bg-[#F59E0B] data-[state=active]:text-[#0F172A]"
          >
            <Film className="w-4 h-4 mr-2" />
            Nouveautés
          </TabsTrigger>
          <TabsTrigger
            value="channels"
            className="data-[state=active]:bg-[#F59E0B] data-[state=active]:text-[#0F172A]"
          >
            <Radio className="w-4 h-4 mr-2" />
            Chaînes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos">
          {subscriptionVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {subscriptionVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => onVideoClick(video.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Film className="w-16 h-16 text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg mb-2">Aucune nouveauté</p>
              <p className="text-gray-500 text-sm mb-6 text-center max-w-md">
                Abonnez-vous à des chaînes pour voir leurs nouvelles vidéos ici
              </p>
              <Button
                onClick={() => navigateTo('video_home')}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Découvrir des chaînes
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="channels">
          {subscribedChannels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscribedChannels.map((channel) => (
                <ChannelCard
                  key={channel.id}
                  channel={channel}
                  layout="horizontal"
                  onClick={() => onChannelClick(channel.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Radio className="w-16 h-16 text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg mb-2">Aucun abonnement</p>
              <p className="text-gray-500 text-sm mb-6 text-center max-w-md">
                Abonnez-vous à des chaînes pour les retrouver ici
              </p>
              <Button
                onClick={() => navigateTo('video_home')}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Découvrir des chaînes
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
