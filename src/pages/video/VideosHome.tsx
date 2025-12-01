import { useVideoGenres } from "../../hooks/useVideoGenres";
import { useVideos } from "../../hooks/useVideos";
import { useShorts } from "../../hooks/useShorts";
import VideoGrid from "../../components/VideoGrid";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function VideosHome() {
  const { genres } = useVideoGenres();
  const { videos, loading, error } = useVideos();
  const { shorts } = useShorts();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#162a42" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Streaming Vidéo
          </h1>
          <p className="text-gray-300">
            Découvrez les meilleures vidéos, catégories et shorts.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Catégories</h2>
          <div className="flex flex-wrap gap-3">
            {genres.map((g) => (
              <Button
                key={g.id}
                variant="secondary"
                className="rounded-full px-4 py-2 text-sm"
                style={{
                  backgroundColor: "#0e2440",
                  borderColor: "#374151",
                  color: "#ffd384",
                  borderWidth: 1,
                }}
                onClick={() =>
                  navigate(`/videos/search?q=${encodeURIComponent(g.name)}`)
                }
              >
                <span className="font-semibold" style={{ color: "#fdac0d" }}>
                  {g.name}
                </span>
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Shorts</h2>
            <Button
              variant="ghost"
              className="text-sm h-auto p-0 hover:bg-transparent"
              style={{ color: "#fdac0d" }}
              onClick={() => navigate("/videos/shorts")}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#e69a0a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#fdac0d";
              }}
            >
              Voir tout
            </Button>
          </div>
          <div
            className="flex gap-4 overflow-x-auto pb-2"
            style={{ borderBottom: "1px solid #374151" }}
          >
            {shorts.map((s) => (
              <div key={s.id} className="min-w-[180px]">
                <div
                  className="rounded-lg overflow-hidden"
                  style={{ backgroundColor: "#091d35" }}
                >
                  <img
                    src={
                      s.thumbnail
                        ? `/${s.thumbnail}`
                        : "/assets/user-placeholder-avatar.svg"
                    }
                    alt={s.title}
                    className="w-full h-40 object-cover"
                    onClick={() => navigate("/videos/shorts")}
                  />
                </div>
                <div className="mt-2 text-white text-sm line-clamp-2">
                  {s.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Toutes les vidéos</h2>
            <div className="text-sm text-gray-300">{videos.length} vidéos</div>
          </div>
          <VideoGrid videos={videos} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}
