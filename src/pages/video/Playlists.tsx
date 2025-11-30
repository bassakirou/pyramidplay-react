import { useVideos } from "../../hooks/useVideos";
import VideoGrid from "../../components/VideoGrid";

export default function Playlists() {
  const { videos } = useVideos();
  const playlistKey = "pp_video_playlist_default";
  let ids: number[] = [];
  try {
    const raw = localStorage.getItem(playlistKey);
    ids = raw ? (JSON.parse(raw) as number[]) : [];
  } catch {}

  const list = videos.filter((v) => ids.includes(v.id));

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#162a42" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Ma Playlist</h1>
          <p className="text-gray-300">Ajoutée depuis les cartes vidéo.</p>
        </div>
        <VideoGrid videos={list} />
      </div>
    </div>
  );
}
