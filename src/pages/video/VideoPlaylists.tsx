import { useState } from 'react';
import { Plus, PlaySquare, Trash2, Film } from 'lucide-react';
import { useVideo } from '@/contexts/VideoContext';
import { useAuth } from '@/contexts/AuthContext';
import { VideoCard } from '@/components/video/VideoCard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface VideoPlaylistsProps {
  onVideoClick: (videoId: string) => void;
}

export function VideoPlaylists({ onVideoClick }: VideoPlaylistsProps) {
  const { videoPlaylists, createVideoPlaylist, deleteVideoPlaylist } = useVideo();
  const { isAuthenticated } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDesc, setNewPlaylistDesc] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="w-20 h-20 bg-[#1E293B] rounded-full flex items-center justify-center mb-4">
          <PlaySquare className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-white text-xl font-medium mb-2">Connectez-vous</h2>
        <p className="text-gray-400 text-center max-w-md">
          Connectez-vous pour créer et gérer vos playlists vidéo.
        </p>
      </div>
    );
  }

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createVideoPlaylist(newPlaylistName.trim(), newPlaylistDesc.trim());
      setNewPlaylistName('');
      setNewPlaylistDesc('');
      setIsCreateDialogOpen(false);
    }
  };

  const handleDeletePlaylist = (playlistId: string) => {
    deleteVideoPlaylist(playlistId);
    if (selectedPlaylist === playlistId) {
      setSelectedPlaylist(null);
    }
  };

  const playlist = selectedPlaylist 
    ? videoPlaylists.find(p => p.id === selectedPlaylist)
    : null;

  if (selectedPlaylist && playlist) {
    return (
      <div className="p-4 md:p-6 overflow-y-auto h-full">
        {/* Back button */}
        <button
          onClick={() => setSelectedPlaylist(null)}
          className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
        >
          ← Retour aux playlists
        </button>

        {/* Playlist Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="w-full md:w-64 aspect-video rounded-xl overflow-hidden bg-[#1E293B]">
            {playlist.videos[0] ? (
              <img
                src={playlist.videos[0].thumbnailUrl}
                alt={playlist.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <PlaySquare className="w-16 h-16 text-gray-600" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-white text-2xl font-bold mb-2">{playlist.name}</h1>
            <p className="text-gray-400 mb-4">
              {playlist.videos.length} vidéo{playlist.videos.length !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => playlist.videos[0] && onVideoClick(playlist.videos[0].id)}
                disabled={playlist.videos.length === 0}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold"
              >
                <PlaySquare className="w-4 h-4 mr-2" />
                Tout lire
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDeletePlaylist(playlist.id)}
                className="border-white/10 text-white hover:bg-red-900/50 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>

        {/* Videos */}
        {playlist.videos.length > 0 ? (
          <div className="space-y-4">
            {playlist.videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                layout="list"
                onClick={() => onVideoClick(video.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Cette playlist est vide</p>
            <p className="text-gray-500 text-sm mt-1">
              Ajoutez des vidéos depuis la page d'accueil
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold mb-2">Vos Playlists</h1>
          <p className="text-gray-400">Organisez vos vidéos en playlists</p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle playlist
        </Button>
      </div>

      {/* Playlists Grid */}
      {videoPlaylists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videoPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => setSelectedPlaylist(playlist.id)}
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
                  {playlist.description || 'Aucune description'}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <PlaySquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Aucune playlist</p>
          <p className="text-gray-500 text-sm mt-1 mb-6">
            Créez votre première playlist pour organiser vos vidéos
          </p>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Créer une playlist
          </Button>
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-[#1E293B] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Créer une playlist</DialogTitle>
            <DialogDescription className="text-gray-400">
              Donnez un nom à votre nouvelle playlist
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder="Nom de la playlist"
              className="w-full px-4 py-3 bg-[#0F172A] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
            <textarea
              value={newPlaylistDesc}
              onChange={(e) => setNewPlaylistDesc(e.target.value)}
              placeholder="Description (optionnel)"
              rows={3}
              className="w-full px-4 py-3 bg-[#0F172A] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] resize-none"
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                className="flex-1 border-white/10 text-white hover:bg-white/10"
              >
                Annuler
              </Button>
              <Button
                onClick={handleCreatePlaylist}
                className="flex-1 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold"
              >
                Créer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
