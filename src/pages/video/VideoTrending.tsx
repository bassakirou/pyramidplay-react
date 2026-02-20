import { useState } from 'react';
import { TrendingUp, Flame, Music, Radio, Newspaper } from 'lucide-react';
import { videos } from '@/data/videoMockData';
import { VideoCard } from '@/components/video/VideoCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VideoTrendingProps {
  onVideoClick: (videoId: string) => void;
}

export function VideoTrending({ onVideoClick }: VideoTrendingProps) {
  const [activeTab, setActiveTab] = useState('all');

  // Sort videos by views for trending
  const trendingVideos = [...videos].sort((a, b) => b.views - a.views);

  // Filter by category
  const musicVideos = trendingVideos.filter(v => v.category === 'Musique');
  const concertVideos = trendingVideos.filter(v => v.category === 'Concert');
  const documentaryVideos = trendingVideos.filter(v => v.category === 'Documentaire');

  return (
    <div className="p-4 md:p-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-full flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-[#F59E0B]" />
        </div>
        <div>
          <h1 className="text-white text-2xl font-bold">Tendances</h1>
          <p className="text-gray-400">Les vidéos les plus populaires en ce moment</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#1E293B] border border-white/10 mb-6">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-[#F59E0B] data-[state=active]:text-[#0F172A]"
          >
            <Flame className="w-4 h-4 mr-2" />
            Tout
          </TabsTrigger>
          <TabsTrigger
            value="music"
            className="data-[state=active]:bg-[#F59E0B] data-[state=active]:text-[#0F172A]"
          >
            <Music className="w-4 h-4 mr-2" />
            Musique
          </TabsTrigger>
          <TabsTrigger
            value="concerts"
            className="data-[state=active]:bg-[#F59E0B] data-[state=active]:text-[#0F172A]"
          >
            <Radio className="w-4 h-4 mr-2" />
            Concerts
          </TabsTrigger>
          <TabsTrigger
            value="documentaries"
            className="data-[state=active]:bg-[#F59E0B] data-[state=active]:text-[#0F172A]"
          >
            <Newspaper className="w-4 h-4 mr-2" />
            Documentaires
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="space-y-4">
            {trendingVideos.map((video, index) => (
              <div
                key={video.id}
                onClick={() => onVideoClick(video.id)}
                className="flex gap-4 p-3 rounded-xl hover:bg-[#1E293B] transition-colors cursor-pointer group"
              >
                <span className="text-2xl font-bold text-gray-500 w-8 text-center flex-shrink-0">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <VideoCard video={video} layout="list" onClick={() => onVideoClick(video.id)} />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="music" className="mt-0">
          <div className="space-y-4">
            {musicVideos.length > 0 ? (
              musicVideos.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => onVideoClick(video.id)}
                  className="flex gap-4 p-3 rounded-xl hover:bg-[#1E293B] transition-colors cursor-pointer group"
                >
                  <span className="text-2xl font-bold text-gray-500 w-8 text-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <VideoCard video={video} layout="list" onClick={() => onVideoClick(video.id)} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Aucune vidéo musicale en tendance</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="concerts" className="mt-0">
          <div className="space-y-4">
            {concertVideos.length > 0 ? (
              concertVideos.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => onVideoClick(video.id)}
                  className="flex gap-4 p-3 rounded-xl hover:bg-[#1E293B] transition-colors cursor-pointer group"
                >
                  <span className="text-2xl font-bold text-gray-500 w-8 text-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <VideoCard video={video} layout="list" onClick={() => onVideoClick(video.id)} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Radio className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Aucun concert en tendance</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="documentaries" className="mt-0">
          <div className="space-y-4">
            {documentaryVideos.length > 0 ? (
              documentaryVideos.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => onVideoClick(video.id)}
                  className="flex gap-4 p-3 rounded-xl hover:bg-[#1E293B] transition-colors cursor-pointer group"
                >
                  <span className="text-2xl font-bold text-gray-500 w-8 text-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <VideoCard video={video} layout="list" onClick={() => onVideoClick(video.id)} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Newspaper className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Aucun documentaire en tendance</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
