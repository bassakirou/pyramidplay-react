import { useVideos } from "../../hooks/useVideos";
import VideoGrid from "../../components/VideoGrid";
import { useMemo } from "react";

export default function VideoSearch() {
  const { videos, loading, error, searchVideos } = useVideos();
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q") || "";

  const results = useMemo(() => searchVideos(q), [q, videos]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#162a42" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <VideoGrid
          videos={results}
          loading={loading}
          error={error}
          searchQuery={q}
        />
      </div>
    </div>
  );
}
