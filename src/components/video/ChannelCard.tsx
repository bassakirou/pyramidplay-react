import { Bell, UserPlus } from 'lucide-react';
import type { Channel } from '@/types/video';
import { useVideo } from '@/contexts/VideoContext';
import { useAuth } from '@/contexts/AuthContext';

interface ChannelCardProps {
  channel: Channel;
  layout?: 'horizontal' | 'vertical';
  onClick?: () => void;
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

export function ChannelCard({ channel, layout = 'horizontal', onClick }: ChannelCardProps) {
  const { subscribeToChannel, unsubscribeFromChannel, isSubscribed } = useVideo();
  const { isAuthenticated } = useAuth();

  const subscribed = isSubscribed(channel.id);

  const handleSubscribe = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (subscribed) {
      unsubscribeFromChannel(channel.id);
    } else {
      subscribeToChannel(channel.id);
    }
  };

  if (layout === 'vertical') {
    return (
      <div
        className="group cursor-pointer"
        onClick={onClick}
      >
        {/* Banner */}
        <div className="relative h-24 md:h-32 rounded-xl overflow-hidden mb-4">
          <img
            src={channel.bannerUrl}
            alt={channel.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Info */}
        <div className="flex items-center gap-3">
          <img
            src={channel.avatarUrl}
            alt={channel.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-[#0F172A]"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium truncate group-hover:text-[#F59E0B] transition-colors">
              {channel.name}
            </h3>
            <p className="text-gray-400 text-sm">
              {formatSubscriberCount(channel.subscriberCount)} abonnés
            </p>
          </div>
          {isAuthenticated && (
            <button
              onClick={handleSubscribe}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-colors ${
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
    );
  }

  return (
    <div
      className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
      onClick={onClick}
    >
      {/* Avatar */}
      <img
        src={channel.avatarUrl}
        alt={channel.name}
        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-medium text-lg group-hover:text-[#F59E0B] transition-colors">
          {channel.name}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-1">
          {channel.description}
        </p>
        <p className="text-gray-500 text-sm mt-1">
          {formatSubscriberCount(channel.subscriberCount)} abonnés • {channel.videoCount} vidéos
        </p>
      </div>

      {/* Subscribe Button */}
      {isAuthenticated && (
        <button
          onClick={handleSubscribe}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-colors ${
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
  );
}
