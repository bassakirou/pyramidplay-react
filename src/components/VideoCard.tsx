import { Heart, ListPlus, Play } from "lucide-react";
import type { Video } from "../types";
import { useNavigate } from "react-router-dom";

interface VideoCardProps {
  video: Video;
  className?: string;
}

export default function VideoCard({ video, className = "" }: VideoCardProps) {
  const navigate = useNavigate();
  const isPlayable = video.src !== null;

  const favoritesKey = "pp_video_favorites";
  const playlistKey = "pp_video_playlist_default";

  const favorites = (() => {
    try {
      const raw = localStorage.getItem(favoritesKey);
      return raw ? (JSON.parse(raw) as number[]) : [];
    } catch {
      return [];
    }
  })();

  const inFavorites = favorites.includes(video.id);

  const toggleFavorite = () => {
    const next = inFavorites
      ? favorites.filter((id) => id !== video.id)
      : [...favorites, video.id];
    localStorage.setItem(favoritesKey, JSON.stringify(next));
  };

  const addToPlaylist = () => {
    try {
      const raw = localStorage.getItem(playlistKey);
      const list = raw ? (JSON.parse(raw) as number[]) : [];
      if (!list.includes(video.id)) {
        const next = [...list, video.id];
        localStorage.setItem(playlistKey, JSON.stringify(next));
      }
    } catch {
      void 0;
    }
  };

  const getThumb = () => {
    if (video.thumbnail) return `/${video.thumbnail}`;
    return "/assets/user-placeholder-avatar.svg";
  };

  return (
    <div
      className={`group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${className}`}
      style={{ backgroundColor: "#091d35" }}
      data-oid="t:5giyn"
    >
      <div className="relative" data-oid="5sitj5b">
        <img
          src={getThumb()}
          alt={video.title}
          className="w-full aspect-video object-cover"
          onError={(e) => {
            const t = e.target as HTMLImageElement;
            t.src = "/assets/user-placeholder-avatar.svg";
          }}
          data-oid="v9g28hr"
        />

        <button
          className="absolute inset-0 flex items-center justify-center"
          onClick={() => navigate(`/videos/view/${video.id}`)}
          data-oid="h985t4r"
        >
          <span
            className="w-14 h-14 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform"
            style={{
              backgroundColor: isPlayable ? "#fdac0d" : "#6b7280",
              color: isPlayable ? "#091d35" : "#ffffff",
            }}
            data-oid="c5esem8"
          >
            <Play className="ml-1" data-oid="ilj8gp_" />
          </span>
        </button>
        <div
          className="absolute bottom-2 left-2 px-2 py-1 rounded text-xs"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "#ffffff" }}
          data-oid="5ut1fs_"
        >
          {Math.max(0, video.duration || 0)}s
        </div>
      </div>
      <div className="p-4" data-oid="4fj0nj0">
        <div className="flex justify-between items-start" data-oid="vxc_swh">
          <div data-oid="gkkpdt3">
            <h3
              className="text-white font-semibold text-sm line-clamp-2"
              data-oid="c4y.0m0"
            >
              {video.title}
            </h3>
            <p className="text-gray-300 text-xs mt-1" data-oid="7ov7g21">
              {video.channel || ""}
            </p>
          </div>
          <div className="flex items-center gap-2" data-oid="h3lhm1j">
            <button
              className="p-2 rounded-md transition-colors"
              style={{
                backgroundColor: inFavorites ? "#fdac0d" : "#162a42",
                color: inFavorites ? "#091d35" : "#ffffff",
              }}
              onClick={toggleFavorite}
              aria-label="Ajouter aux favoris"
              data-oid="_7e-njp"
            >
              <Heart size={16} data-oid="s0sg4w7" />
            </button>
            <button
              className="p-2 rounded-md transition-colors"
              style={{ backgroundColor: "#162a42", color: "#ffffff" }}
              onClick={addToPlaylist}
              aria-label="Ajouter à la playlist"
              data-oid=".84h.3x"
            >
              <ListPlus size={16} data-oid="7o4l35x" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
