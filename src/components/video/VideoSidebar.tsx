import { useState } from 'react';
import { 
  Home, 
  Compass, 
  Clock, 
  ThumbsUp, 
  PlaySquare, 
  Plus,
  Radio,
  User,
  Settings,
  Film
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useVideo } from '@/contexts/VideoContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface VideoSidebarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  count?: number;
}

function VideoSidebarItem({ icon, label, onClick, isActive, count }: VideoSidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
        isActive 
          ? 'bg-white/10 text-white' 
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
      {count !== undefined && count > 0 && (
        <span className="ml-auto text-xs bg-[#F59E0B] text-[#0F172A] px-2 py-0.5 rounded-full font-bold">
          {count}
        </span>
      )}
    </button>
  );
}

interface VideoSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isMobile?: boolean;
}

export function VideoSidebar({ currentView, onNavigate, isMobile = false }: VideoSidebarProps) {
  const { isAuthenticated } = useAuth();
  const { 
    videoPlaylists, 
    userChannel, 
    unreadNotificationsCount,
    createVideoPlaylist,
    createChannel 
  } = useVideo();
  
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelDesc, setNewChannelDesc] = useState('');

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createVideoPlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
      setIsCreatePlaylistOpen(false);
    }
  };

  const handleCreateChannel = () => {
    if (newChannelName.trim()) {
      createChannel(newChannelName.trim(), newChannelDesc.trim());
      setNewChannelName('');
      setNewChannelDesc('');
      setIsCreateChannelOpen(false);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Section principale */}
      <div className="py-2">
        <VideoSidebarItem
          icon={<Home className="w-5 h-5" />}
          label="Accueil"
          onClick={() => onNavigate('video_home')}
          isActive={currentView === 'video_home'}
        />
        <VideoSidebarItem
          icon={<Compass className="w-5 h-5" />}
          label="Explorer"
          onClick={() => onNavigate('video_trending')}
          isActive={currentView === 'video_trending'}
        />
        <VideoSidebarItem
          icon={<Radio className="w-5 h-5" />}
          label="Abonnements"
          onClick={() => onNavigate('video_subscriptions')}
          isActive={currentView === 'video_subscriptions'}
          count={unreadNotificationsCount}
        />
      </div>

      {/* Section Bibliothèque */}
      {isAuthenticated && (
        <>
          <div className="border-t border-white/10 my-2" />
          <div className="px-4 py-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Vous
            </h3>
          </div>
          <div className="py-2">
            <VideoSidebarItem
              icon={<User className="w-5 h-5" />}
              label="Votre chaîne"
              onClick={() => userChannel ? onNavigate('video_channel') : setIsCreateChannelOpen(true)}
              isActive={currentView === 'video_channel'}
            />
            <VideoSidebarItem
              icon={<Clock className="w-5 h-5" />}
              label="Historique"
              onClick={() => onNavigate('video_history')}
              isActive={currentView === 'video_history'}
            />
            <VideoSidebarItem
              icon={<PlaySquare className="w-5 h-5" />}
              label="Vos playlists"
              onClick={() => onNavigate('video_playlists')}
              isActive={currentView === 'video_playlists'}
            />
            <VideoSidebarItem
              icon={<ThumbsUp className="w-5 h-5" />}
              label="Vidéos aimées"
              onClick={() => onNavigate('video_favorites')}
              isActive={currentView === 'video_favorites'}
            />
          </div>
        </>
      )}

      {/* Section Playlists */}
      {isAuthenticated && videoPlaylists.length > 0 && (
        <>
          <div className="border-t border-white/10 my-2" />
          <div className="px-4 py-2 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Playlists
            </h3>
            <button 
              onClick={() => setIsCreatePlaylistOpen(true)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="py-2 max-h-48 overflow-y-auto">
            {videoPlaylists.map(playlist => (
              <VideoSidebarItem
                key={playlist.id}
                icon={<Film className="w-5 h-5" />}
                label={playlist.name}
                onClick={() => onNavigate('video_playlists')}
                isActive={false}
              />
            ))}
          </div>
        </>
      )}

      {/* Section Créer */}
      {isAuthenticated && (
        <>
          <div className="border-t border-white/10 my-2" />
          <div className="py-2">
            <VideoSidebarItem
              icon={<Plus className="w-5 h-5" />}
              label="Créer une playlist"
              onClick={() => setIsCreatePlaylistOpen(true)}
            />
            {!userChannel && (
              <VideoSidebarItem
                icon={<Settings className="w-5 h-5" />}
                label="Créer une chaîne"
                onClick={() => setIsCreateChannelOpen(true)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );

  if (isMobile) {
    return sidebarContent;
  }

  return (
    <aside className="w-64 bg-[#0F172A] border-r border-white/10 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {sidebarContent}
      </div>

      {/* Dialog Créer Playlist */}
      <Dialog open={isCreatePlaylistOpen} onOpenChange={setIsCreatePlaylistOpen}>
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
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsCreatePlaylistOpen(false)}
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

      {/* Dialog Créer Chaîne */}
      <Dialog open={isCreateChannelOpen} onOpenChange={setIsCreateChannelOpen}>
        <DialogContent className="bg-[#1E293B] border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Créer une chaîne</DialogTitle>
            <DialogDescription className="text-gray-400">
              Commencez à partager vos vidéos avec le monde
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <input
              type="text"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder="Nom de la chaîne"
              className="w-full px-4 py-3 bg-[#0F172A] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
            />
            <textarea
              value={newChannelDesc}
              onChange={(e) => setNewChannelDesc(e.target.value)}
              placeholder="Description de la chaîne"
              rows={3}
              className="w-full px-4 py-3 bg-[#0F172A] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] resize-none"
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsCreateChannelOpen(false)}
                className="flex-1 border-white/10 text-white hover:bg-white/10"
              >
                Annuler
              </Button>
              <Button
                onClick={handleCreateChannel}
                className="flex-1 bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold"
              >
                Créer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
