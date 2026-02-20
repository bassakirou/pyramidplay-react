import { useState } from "react";
import { Clock, ThumbsUp, PlaySquare, History, Film } from "lucide-react";
import { useVideo } from "@/contexts/VideoContext";
import { useAuth } from "@/contexts/AuthContext";
import { VideoCard } from "@/components/video/VideoCard";
import { videos } from "@/data/videoMockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VideoLibraryProps {
  onVideoClick: (videoId: string) => void;
}

export function VideoLibrary({ onVideoClick }: VideoLibraryProps) {
  const { videoFavorites, videoPlaylists } = useVideo();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("history");

  // Get favorite videos
  const favoriteVideos = videos.filter((v) => videoFavorites.includes(v.id));

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="w-20 h-20 bg-[#1E293B] rounded-full flex items-center justify-center mb-4">
          <Film className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-white text-xl font-medium mb-2">Connectez-vous</h2>
        <p className="text-gray-400 text-center max-w-md">
          Connectez-vous pour accéder à votre bibliothèque vidéo, vos favoris et
          vos playlists.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold mb-2">Bibliothèque</h1>
        <p className="text-gray-400">
          Retrouvez toutes vos vidéos en un seul endroit
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#1E293B] border border-white/10">
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-[#F59E0B] data-[state=active]:text-[#0F172A]"
          >
            <History className="w-4 h-4 mr-2" />
            Historique
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="data-[state=active]:bg-[#F59E0B] data-[state=active]:text-[#0F172A]"
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Aimées
          </TabsTrigger>
          <TabsTrigger
            value="playlists"
            className="data-[state=active]:bg-[#F59E0B] data-[state=active]:text-[#0F172A]"
          >
            <PlaySquare className="w-4 h-4 mr-2" />
            Playlists
          </TabsTrigger>
          <TabsTrigger
            value="watchlater"
            className="data-[state=active]:bg-[#F59E0B] data-[state=active]:text-[#0F172A]"
          >
            <Clock className="w-4 h-4 mr-2" />
            Plus tard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="mt-6">
          <div className="text-center py-12">
            <History className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Aucun historique pour le moment</p>
            <p className="text-gray-500 text-sm mt-1">
              Les vidéos que vous regardez apparaîtront ici
            </p>
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
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
            <div className="text-center py-12">
              <ThumbsUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Aucune vidéo aimée</p>
              <p className="text-gray-500 text-sm mt-1">
                Likez des vidéos pour les retrouver ici
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="playlists" className="mt-6">
          {videoPlaylists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {videoPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="bg-[#1E293B] rounded-xl overflow-hidden hover:bg-[#2D3748] transition-colors cursor-pointer group"
                >
                  <div className="relative aspect-video">
                    {playlist.videos[0] ? (
                      <img
                        src={playlist.videos[0].thumbnailUrl}
                        alt={playlist.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <PlaySquare className="w-12 h-12 text-gray-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <PlaySquare className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {playlist.videos.length} vidéos
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-medium">{playlist.name}</h3>
                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                      {playlist.description || "Aucune description"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <PlaySquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Aucune playlist</p>
              <p className="text-gray-500 text-sm mt-1">
                Créez des playlists pour organiser vos vidéos
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="watchlater" className="mt-6">
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Aucune vidéo à regarder plus tard</p>
            <p className="text-gray-500 text-sm mt-1">
              Ajoutez des vidéos à votre liste "À regarder plus tard"
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
