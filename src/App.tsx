import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    <AuthProvider data-oid="75a8qee">
      <ToastProvider>
      <LibraryProvider data-oid="r.zskcm">
        <AudioPlayerProvider data-oid="xw5qp90">
          <Router data-oid="o_9_yus">
            <Routes data-oid="p_g78q5">
              <Route
                path="/"
                element={<Layout data-oid="wnpginf" />}
                data-oid="qvo1f_r"
              >
                <Route
                  index
                  element={<Home data-oid="rbx3nnl" />}
                  data-oid="56_ad-0"
                />

                <Route
                  path="search"
                  element={<Search data-oid="ocaw_51" />}
                  data-oid="aou9mk4"
                />

                <Route
                  path="library"
                  element={<Library data-oid="-31knt3" />}
                  data-oid="azruiao"
                />

                <Route
                  path="favorites"
                  element={<Library data-oid="ft1k8c9" />}
                  data-oid="px8dc1j"
                />

                <Route
                  path="artists"
                  element={<Artists data-oid="ydud7kh" />}
                  data-oid="h:vss-u"
                />

                <Route
                  path="artists/:id"
                  element={<ArtistView data-oid="8muqn4r" />}
                  data-oid="k960cwo"
                />

                <Route
                  path="albums"
                  element={<Albums data-oid="ubhkpz0" />}
                  data-oid="bnb77b1"
                />

                <Route
                  path="albums/:id"
                  element={<AlbumView data-oid="cy3yvcj" />}
                  data-oid="r6wxbfi"
                />

                <Route
                  path="settings"
                  element={<Home data-oid="37-57i0" />}
                  data-oid="i.i-8sm"
                />

                <Route
                  path="auth/login"
                  element={<Login data-oid="1iitp16" />}
                  data-oid="01.qjk9"
                />

                <Route
                  path="auth/signup"
                  element={<Signup data-oid=":b36u:4" />}
                  data-oid="i06rokg"
                />

                <Route
                  path="profile"
                  element={<Profile data-oid="e.ss1p5" />}
                  data-oid="-.q7-pj"
                />
              </Route>
              <Route
                path="/videos"
                element={<Layout data-oid="eqwvc3u" />}
                data-oid="-varzmn"
              >
                <Route
                  index
                  element={<VideosHome data-oid="d2rcem2" />}
                  data-oid="4jaqk2m"
                />

                <Route
                  path="shorts"
                  element={<Shorts data-oid="_6kl4q4" />}
                  data-oid="1-7t:dc"
                />

                <Route
                  path="search"
                  element={<VideoSearch data-oid="xi14g8i" />}
                  data-oid="-_fu_yk"
                />

                <Route
                  path="playlists"
                  element={<Playlists data-oid="n7vpvzr" />}
                  data-oid="r2..j8n"
                />

                <Route
                  path="view/:id"
                  element={<VideoView data-oid="c:q6z3f" />}
                  data-oid="bsysflv"
                />
              </Route>
            </Routes>
          </Router>
        </AudioPlayerProvider>
      </LibraryProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
