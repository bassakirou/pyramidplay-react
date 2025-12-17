import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AudioPlayerProvider } from "./contexts/AudioPlayerContext";
import { LibraryProvider } from "./contexts/LibraryContext";
import { ToastProvider } from "./components/ui/toast";
import { AuthProvider } from "./contexts/AuthContext";
import { Layout } from "./components/Layout";

const Home = lazy(() => import("./pages/Home").then(module => ({ default: module.Home })));
const Library = lazy(() => import("./pages/Library"));
const Search = lazy(() => import("./pages/Search").then(module => ({ default: module.Search })));
const Artists = lazy(() => import("./pages/Artists").then(module => ({ default: module.Artists })));
const ArtistView = lazy(() => import("./pages/ArtistView").then(module => ({ default: module.ArtistView })));
const AlbumView = lazy(() => import("./pages/AlbumView").then(module => ({ default: module.AlbumView })));
const Albums = lazy(() => import("./pages/Albums").then(module => ({ default: module.Albums })));
const VideosHome = lazy(() => import("./pages/video/VideosHome"));
const Shorts = lazy(() => import("./pages/video/Shorts"));
const VideoSearch = lazy(() => import("./pages/video/VideoSearch"));
const Playlists = lazy(() => import("./pages/video/Playlists"));
const VideoView = lazy(() => import("./pages/video/VideoView"));
const Login = lazy(() => import("./pages/auth/Login").then(module => ({ default: module.Login })));
const Signup = lazy(() => import("./pages/auth/Signup").then(module => ({ default: module.Signup })));
const Profile = lazy(() => import("./pages/Profile").then(module => ({ default: module.Profile })));

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <LibraryProvider>
          <AudioPlayerProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* Parent route with Layout (Sidebar, header, Outlet, etc.) */}
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

                  {/* Videos (nested under /videos) */}
                  <Route path="videos">
                    <Route index element={<VideosHome />} />
                    <Route path="shorts" element={<Shorts />} />
                    <Route path="search" element={<VideoSearch />} />
                    <Route path="playlists" element={<Playlists />} />
                    <Route path="view/:id" element={<VideoView />} />
                  </Route>
                </Route>
              </Routes>
            </Suspense>
          </AudioPlayerProvider>
        </LibraryProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
