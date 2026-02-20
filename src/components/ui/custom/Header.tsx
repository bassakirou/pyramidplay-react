import { useState } from "react";
import {
  Search,
  Bell,
  LogOut,
  UserPlus,
  LogIn,
  Menu,
  Film,
  Music,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigation } from "@/contexts/NavigationContext";
import { useVideo } from "@/contexts/VideoContext";
import { Sidebar } from "./Sidebar";
import { VideoSidebar } from "@/components/video/VideoSidebar";

interface HeaderProps {
  isVideoMode?: boolean;
  onToggleMode?: () => void;
  onMenuClick?: () => void;
}

export function Header({
  isVideoMode = false,
  onToggleMode,
  onMenuClick,
}: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const { navigateTo, navigateToSearch } = useNavigation();
  const { unreadNotificationsCount } = useVideo();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateToSearch(searchQuery.trim());
    }
  };

  return (
    <header className="h-16 bg-[#0F172A] border-b border-white/10 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-50">
      {/* Left Section - Logo & Mobile Menu */}
      <div className="flex items-center gap-2">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick || (() => setIsSidebarOpen(true))}
          className="md:hidden p-2 text-white hover:text-[#F59E0B] transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Mobile Sidebar Sheet */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent
            side="left"
            className="w-72 bg-[#0F172A] border-r border-white/10 p-0"
          >
            <SheetHeader className="p-4 border-b border-white/10">
              <SheetTitle className="text-white flex items-center gap-2">
                <img
                  src="/pyramid-play.svg"
                  alt="Pyramid Play"
                  className="h-8 w-auto"
                />
                {/* <span className="font-bold">
                  PYRAMID <span className="text-[#F59E0B]">Play</span>
                </span> */}
              </SheetTitle>
            </SheetHeader>
            <div className="py-4">
              {isVideoMode ? (
                <VideoSidebar
                  currentView="video_home"
                  onNavigate={(view) => {
                    navigateTo(view as Parameters<typeof navigateTo>[0]);
                    setIsSidebarOpen(false);
                  }}
                  isMobile
                />
              ) : (
                <Sidebar isMobile onNavigate={() => setIsSidebarOpen(false)} />
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <button
          onClick={() => navigateTo(isVideoMode ? "video_home" : "home")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img
            src="/pyramid-play-white.svg"
            alt="Pyramid Play"
            className="h-8 w-auto"
          />
          {/* <span className="text-white font-bold text-lg hidden sm:block">
            PYRAMID <span className="text-[#F59E0B]">Play</span>
          </span> */}
        </button>

        {/* Mode Toggle Button */}
        {onToggleMode && (
          <button
            onClick={onToggleMode}
            className="hidden md:flex items-center gap-2 ml-4 px-3 py-1.5 rounded-full bg-[#1E293B] hover:bg-[#2D3748] transition-colors"
          >
            {isVideoMode ? (
              <>
                <Music className="w-4 h-4 text-[#F59E0B]" />
                <span className="text-white text-sm font-medium">Audios</span>
              </>
            ) : (
              <>
                <Film className="w-4 h-4 text-[#F59E0B]" />
                <span className="text-white text-sm font-medium">Vidéos</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-2 md:mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F59E0B]" />
          <Input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1E293B] border-none rounded-full text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#F59E0B] focus:outline-none text-sm md:text-base"
          />
        </div>
      </form>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-3">
        {isAuthenticated ? (
          <>
            {/* Notification Bell - Desktop */}
            <button className="hidden md:block relative p-2 text-white hover:text-[#F59E0B] transition-colors">
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#F59E0B] rounded-full"></span>
              )}
            </button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center text-[#0F172A] font-bold text-sm">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-[#1E293B] border-white/10"
              >
                <DropdownMenuItem
                  onClick={() =>
                    navigateTo(isVideoMode ? "video_library" : "library")
                  }
                  className="text-white hover:bg-white/10 cursor-pointer"
                >
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={logout}
                  className="text-white hover:bg-white/10 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            {/* Mobile Icons */}
            <button
              onClick={() => navigateTo("register")}
              className="md:hidden p-2 text-white hover:text-[#F59E0B] transition-colors"
              title="S'inscrire"
            >
              <UserPlus className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateTo("login")}
              className="md:hidden p-2 text-[#F59E0B] hover:text-[#FBBF24] transition-colors"
              title="Se connecter"
            >
              <LogIn className="w-5 h-5" />
            </button>

            {/* Desktop Buttons */}
            <Button
              variant="ghost"
              onClick={() => navigateTo("register")}
              className="hidden md:flex text-white hover:text-[#F59E0B] hover:bg-transparent"
            >
              S'inscrire
            </Button>
            <Button
              onClick={() => navigateTo("login")}
              className="hidden md:flex bg-[#F59E0B] hover:bg-[#D97706] text-[#0F172A] font-semibold rounded-full px-6"
            >
              Se connecter
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
