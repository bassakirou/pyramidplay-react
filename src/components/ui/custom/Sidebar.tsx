import { useState } from "react";
import {
  Home,
  ListMusic,
  Heart,
  Plus,
  Disc,
  Mic2,
  Radio,
  Film,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@/contexts/NavigationContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  hasPlus?: boolean;
  onPlusClick?: () => void;
  requiresAuth?: boolean;
}

function SidebarItem({
  icon,
  label,
  onClick,
  isActive,
  hasPlus,
  onPlusClick,
  requiresAuth,
}: SidebarItemProps) {
  const { isAuthenticated } = useAuth();
  const { navigateTo } = useNavigation();

  const handleClick = () => {
    if (requiresAuth && !isAuthenticated) {
      navigateTo("login");
      return;
    }
    onClick?.();
  };

  const handlePlusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (requiresAuth && !isAuthenticated) {
      navigateTo("login");
      return;
    }
    onPlusClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? "bg-[#F59E0B]/20 text-[#F59E0B]"
          : "text-gray-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      {hasPlus && (
        <button
          onClick={handlePlusClick}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      )}
    </button>
  );
}

interface SidebarProps {
  isMobile?: boolean;
  onNavigate?: () => void;
}

export function Sidebar({ isMobile = false, onNavigate }: SidebarProps) {
  const { createPlaylist } = useAuth();
  const { currentView, navigateTo } = useNavigation();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
      setIsCreateDialogOpen(false);
    }
  };

  const handleNavigate = (view: Parameters<typeof navigateTo>[0]) => {
    navigateTo(view);
    onNavigate?.();
  };

  const sidebarContent = (
    <>
      {/* Decorative border at top */}
      {!isMobile && (
        <div
          className="h-[13px] w-full"
          style={{
            backgroundImage: "url(/assets/motifs_pyramid.svg)",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
          }}
        />
      )}

      <div className="flex-1 overflow-y-auto py-4 px-3">
        {/* Main Navigation */}
        <nav className="space-y-1 mb-6">
          {/* Vidéos Button */}
          <SidebarItem
            icon={<Film className="w-5 h-5" />}
            label="VIDÉOS"
            onClick={() => handleNavigate("video_home")}
            isActive={currentView.startsWith("video_")}
          />
          <SidebarItem
            icon={<Home className="w-5 h-5" />}
            label="ACCUEIL"
            onClick={() => handleNavigate("home")}
            isActive={currentView === "home"}
          />
        </nav>

        {/* Library Section */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
            VOTRE BIBLIOTHÈQUE
          </h3>
          <nav className="space-y-1">
            <SidebarItem
              icon={<ListMusic className="w-5 h-5" />}
              label="Vos Playlists"
              onClick={() => handleNavigate("playlists")}
              isActive={currentView === "playlists"}
              hasPlus
              onPlusClick={() => setIsCreateDialogOpen(true)}
              requiresAuth
            />
            <SidebarItem
              icon={<Heart className="w-5 h-5" />}
              label="Vos Favoris"
              onClick={() => handleNavigate("favorites")}
              isActive={currentView === "favorites"}
              hasPlus
              requiresAuth
            />
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <SidebarItem
                icon={<Plus className="w-5 h-5" />}
                label="Créer"
                onClick={() => setIsCreateDialogOpen(true)}
                requiresAuth
              />
              <DialogContent className="bg-[#1E293B] border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Créer une playlist
                  </DialogTitle>
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
                    className="w-full px-4 py-2 bg-[#0F172A] border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
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
          </nav>
        </div>

        {/* Browse Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
            PARCOURIR
          </h3>
          <nav className="space-y-1">
            <SidebarItem
              icon={<Disc className="w-5 h-5" />}
              label="Albums"
              onClick={() => handleNavigate("library")}
              isActive={currentView === "library"}
              requiresAuth
            />
            <SidebarItem
              icon={<Mic2 className="w-5 h-5" />}
              label="Artistes"
              onClick={() => handleNavigate("home")}
            />
            <SidebarItem
              icon={<Radio className="w-5 h-5" />}
              label="Podcasts"
              onClick={() => handleNavigate("podcasts")}
              isActive={currentView === "podcasts"}
              requiresAuth
            />
          </nav>
        </div>
      </div>

      {/* Decorative border at bottom */}
      {!isMobile && (
        <div
          className="h-[13px] w-full"
          style={{
            backgroundImage: "url(/assets/motifs_pyramid.svg)",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
          }}
        />
      )}
    </>
  );

  if (isMobile) {
    return sidebarContent;
  }

  return (
    <aside className="w-64 bg-[#0F172A] border-r border-white/10 flex flex-col h-full">
      {sidebarContent}
    </aside>
  );
}
