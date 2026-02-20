import { useEffect, useState } from "react";
import { Header } from "@/components/ui/custom/Header";
import { Sidebar } from "@/components/ui/custom/Sidebar";
import { Player } from "@/components/ui/custom/Player";
import { SubscriptionModal } from "@/components/ui/custom/SubscriptionModal";
import { Home } from "@/pages/Home";
import { AlbumPage } from "@/pages/Album";
import { ArtistPage } from "@/pages/Artist";
import { SearchPage } from "@/pages/Search";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { Library } from "@/pages/Library";
import { Favorites } from "@/pages/Favorites";
import { Playlists } from "@/pages/Playlists";
import { Podcasts } from "@/pages/Podcasts";
import { AuthProvider } from "@/contexts/AuthContext";
import { PlayerProvider, usePlayer } from "@/contexts/PlayerContext";
import {
  NavigationProvider,
  useNavigation,
} from "@/contexts/NavigationContext";
import { VideoProvider } from "@/contexts/VideoContext";
import { VideoSidebar } from "@/components/video/VideoSidebar";
import {
  VideoHome,
  VideoWatch,
  VideoChannel,
  VideoLibrary,
  VideoPlaylists,
  VideoFavorites,
  VideoSubscriptions,
  VideoTrending,
} from "@/pages/video";
import "./App.css";

// Composant pour le contenu vidéo
function VideoContent() {
  const { currentView, viewParams, navigateTo, setViewParams } =
    useNavigation();

  const handleVideoClick = (videoId: string) => {
    setViewParams({ videoId });
    navigateTo("video_watch");
  };

  const handleChannelClick = (channelId: string) => {
    setViewParams({ channelId });
    navigateTo("video_channel");
  };

  // Rendu conditionnel basé sur la vue vidéo actuelle
  switch (currentView) {
    case "video_home":
      return (
        <VideoHome
          onVideoClick={handleVideoClick}
          onChannelClick={handleChannelClick}
        />
      );
    case "video_watch":
      return (
        <VideoWatch
          videoId={(viewParams.videoId as string) || ""}
          onVideoClick={handleVideoClick}
          onChannelClick={handleChannelClick}
        />
      );
    case "video_channel":
      return (
        <VideoChannel
          channelId={viewParams.channelId as string}
          onVideoClick={handleVideoClick}
        />
      );
    case "video_library":
      return <VideoLibrary onVideoClick={handleVideoClick} />;
    case "video_playlists":
      return <VideoPlaylists onVideoClick={handleVideoClick} />;
    case "video_favorites":
      return <VideoFavorites onVideoClick={handleVideoClick} />;
    case "video_subscriptions":
      return (
        <VideoSubscriptions
          onVideoClick={handleVideoClick}
          onChannelClick={handleChannelClick}
        />
      );
    case "video_trending":
      return <VideoTrending onVideoClick={handleVideoClick} />;
    default:
      return (
        <VideoHome
          onVideoClick={handleVideoClick}
          onChannelClick={handleChannelClick}
        />
      );
  }
}

// Composant pour le contenu audio
function AudioContent() {
  const { currentView, viewParams } = useNavigation();

  // Rendu conditionnel basé sur la vue actuelle
  switch (currentView) {
    case "home":
      return <Home />;
    case "album":
      return <AlbumPage albumId={(viewParams.albumId as string) || ""} />;
    case "artist":
      return <ArtistPage artistId={(viewParams.artistId as string) || ""} />;
    case "search":
      return <SearchPage query={(viewParams.query as string) || ""} />;
    case "login":
      return <Login />;
    case "register":
      return <Register />;
    case "library":
      return <Library />;
    case "favorites":
      return <Favorites />;
    case "playlists":
      return <Playlists />;
    case "podcasts":
      return <Podcasts />;
    default:
      return <Home />;
  }
}

// Composant principal qui gère le contenu
function AppContent() {
  const { currentView, navigateTo } = useNavigation();
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Vérifier si on est sur une page d'authentification (login/register)
  const isAuthPage = currentView === "login" || currentView === "register";

  // Vérifier si on est en mode vidéo
  const isVideoView = currentView.startsWith("video_");

  // Synchroniser l'état video mode avec la vue actuelle
  useEffect(() => {
    if (isVideoView) {
      setIsVideoMode(true);
    }
  }, [isVideoView]);

  // Toggle entre mode audio et vidéo
  const toggleMode = () => {
    if (isVideoMode) {
      setIsVideoMode(false);
      navigateTo("home");
    } else {
      setIsVideoMode(true);
      navigateTo("video_home");
    }
  };

  if (isAuthPage) {
    return (
      <div className="h-screen flex flex-col bg-[#0F172A]">
        {isVideoMode ? <VideoContent /> : <AudioContent />}
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#0F172A]">
      {/* Header */}
      <Header
        isVideoMode={isVideoMode}
        onToggleMode={toggleMode}
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - différent selon le mode */}
        <div className="hidden md:block">
          {isVideoMode ? (
            <VideoSidebar
              currentView={currentView}
              onNavigate={(view) =>
                navigateTo(view as Parameters<typeof navigateTo>[0])
              }
            />
          ) : (
            <Sidebar />
          )}
        </div>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="absolute left-0 top-0 h-full w-64 bg-[#0F172A] shadow-xl animate-in slide-in-from-left"
              onClick={(e) => e.stopPropagation()}
            >
              {isVideoMode ? (
                <VideoSidebar
                  currentView={currentView}
                  onNavigate={(view) => {
                    navigateTo(view as Parameters<typeof navigateTo>[0]);
                    setIsMobileMenuOpen(false);
                  }}
                  isMobile
                />
              ) : (
                <Sidebar
                  isMobile
                  onNavigate={() => setIsMobileMenuOpen(false)}
                />
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 overflow-hidden bg-[#0F172A]">
          {isVideoMode ? <VideoContent /> : <AudioContent />}
        </main>
      </div>

      {/* Player - uniquement en mode audio */}
      {!isVideoMode && <Player />}

      {/* Subscription Modal - uniquement en mode audio */}
      {!isVideoMode && <SubscriptionModalHandler />}
    </div>
  );
}

// Handler pour le modal d'abonnement
function SubscriptionModalHandler() {
  const { canPlayMore, isPlaying } = usePlayer();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  useEffect(() => {
    if (!canPlayMore && !isPlaying) {
      setShowSubscriptionModal(true);
    }
  }, [canPlayMore, isPlaying]);

  return (
    <SubscriptionModal
      isOpen={showSubscriptionModal}
      onClose={() => setShowSubscriptionModal(false)}
    />
  );
}

// Composant racine avec les providers
function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <VideoProvider>
          <NavigationProvider>
            <AppContent />
          </NavigationProvider>
        </VideoProvider>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;
