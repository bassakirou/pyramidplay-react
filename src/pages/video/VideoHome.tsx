import { useState } from 'react';
import { Flame, Clock, TrendingUp } from 'lucide-react';
import { videos, channels } from '@/data/videoMockData';
import { VideoCard } from '@/components/video/VideoCard';
import { ChannelCard } from '@/components/video/ChannelCard';

interface VideoHomeProps {
  onVideoClick: (videoId: string) => void;
  onChannelClick: (channelId: string) => void;
}

export function VideoHome({ onVideoClick, onChannelClick }: VideoHomeProps) {
  const [activeCategory, setActiveCategory] = useState('Tout');
  
  const categories = ['Tout', 'Musique', 'Concert', 'Documentaire', 'Interview', 'Behind the Scenes'];
  
  const filteredVideos = activeCategory === 'Tout' 
    ? videos 
    : videos.filter(v => v.category === activeCategory);

  return (
    <div className="p-4 md:p-6 overflow-y-auto h-full">
      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === category
                ? 'bg-white text-[#0F172A]'
                : 'bg-[#1E293B] text-gray-300 hover:bg-[#2D3748]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Trending Section */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#F59E0B]" />
          <h2 className="text-white text-lg font-medium">Tendances</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.slice(0, 4).map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              onClick={() => onVideoClick(video.id)}
            />
          ))}
        </div>
      </section>

      {/* Channels Section */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-[#F59E0B]" />
          <h2 className="text-white text-lg font-medium">Chaînes populaires</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.slice(0, 3).map((channel) => (
            <ChannelCard 
              key={channel.id} 
              channel={channel} 
              layout="vertical"
              onClick={() => onChannelClick(channel.id)}
            />
          ))}
        </div>
      </section>

      {/* Latest Videos */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-[#F59E0B]" />
          <h2 className="text-white text-lg font-medium">Nouveautés</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...filteredVideos].reverse().slice(0, 8).map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              onClick={() => onVideoClick(video.id)}
            />
          ))}
        </div>
      </section>

      {/* All Videos */}
      <section>
        <h2 className="text-white text-lg font-medium mb-4">Toutes les vidéos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredVideos.map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              onClick={() => onVideoClick(video.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
