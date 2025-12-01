import { Routes, Route } from "react-router-dom";
import { AudioPlayerProvider } from "./contexts/AudioPlayerContext";
import { LibraryProvider } from "./contexts/LibraryContext";
import { ToastProvider } from "./components/ui/toast";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import Library from "./pages/Library";
import { Search } from "./pages/Search";
import { Artists } from "./pages/Artists";
import { ArtistView } from "./pages/ArtistView";
import { AlbumView } from "./pages/AlbumView";
import { Albums } from "./pages/Albums";
import VideosHome from "./pages/video/VideosHome";
import Shorts from "./pages/video/Shorts";
import VideoSearch from "./pages/video/VideoSearch";
import Playlists from "./pages/video/Playlists";
import VideoView from "./pages/video/VideoView";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { Profile } from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <LibraryProvider>
          <AudioPlayerProvider>
            <Routes>
              {/* Route parent avec Layout (Sidebar, header, Outlet, etc.) */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />

                <Route path="search" element={<Search />} />
                <Route path="library" element={<Library />} />
                <Route path="favorites" element={<Library />} />

                <Route path="artists" element={<Artists />} />
                <Route path="artists/:id" element={<ArtistView />} />

                <Route path="albums" element={<Albums />} />
                <Route path="albums/:id" element={<AlbumView />} />

                <Route path="settings" element={<Home />} />

                {/* Auth */}
                <Route path="auth/login" element={<Login />} />
                <Route path="auth/signup" element={<Signup />} />

                {/* Profile */}
                <Route path="profile" element={<Profile />} />

                {/* Vidéos (nested sous /videos) */}
                <Route path="videos">
                  <Route index element={<VideosHome />} />
                  <Route path="shorts" element={<Shorts />} />
                  <Route path="search" element={<VideoSearch />} />
                  <Route path="playlists" element={<Playlists />} />
                  <Route path="view/:id" element={<VideoView />} />
                </Route>
              </Route>
            </Routes>
          </AudioPlayerProvider>
        </LibraryProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
