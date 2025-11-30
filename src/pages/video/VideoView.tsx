import { useVideos } from "../../hooks/useVideos";
import { useParams, useNavigate } from "react-router-dom";

export default function VideoView() {
  const { id } = useParams();
  const { videos } = useVideos();
  const video = videos.find((v) => v.id === Number(id));
  const navigate = useNavigate();

  const others = videos.filter((v) => v.id !== Number(id)).slice(0, 10);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#162a42" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {video ? (
              <div>
                <div
                  className="rounded-lg overflow-hidden mb-4"
                  style={{ backgroundColor: "#091d35" }}
                >
                  <video
                    src={video.src || ""}
                    controls
                    className="w-full aspect-video"
                  />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  {video.title}
                </h1>
                <div className="text-sm text-gray-300 mb-4">
                  {video.channel} • {video.views || 0} vues
                </div>
                <div
                  className="p-4 rounded-lg"
                  style={{
                    backgroundColor: "#0e2440",
                    border: "1px solid #374151",
                  }}
                >
                  <h2 className="text-white font-semibold mb-2">Description</h2>
                  <p className="text-gray-300 text-sm">
                    {video.description || ""}
                  </p>
                </div>
                <div className="mt-6">
                  <h2 className="text-white font-semibold mb-2">
                    Commentaires
                  </h2>
                  <div className="space-y-3">
                    {(video.comments || []).map((c) => (
                      <div
                        key={c.id}
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: "#091d35" }}
                      >
                        <div className="text-white text-sm font-medium">
                          {c.author}
                        </div>
                        <div className="text-gray-400 text-xs">{c.date}</div>
                        <div className="text-gray-300 text-sm mt-1">
                          {c.text}
                        </div>
                      </div>
                    ))}
                    {(!video.comments || video.comments.length === 0) && (
                      <div className="text-gray-400 text-sm">
                        Aucun commentaire
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-white">Vidéo introuvable</div>
            )}
          </div>
          <div className="lg:col-span-1">
            <h2 className="text-white font-semibold mb-3">
              À regarder ensuite
            </h2>
            <div className="space-y-3">
              {others.map((v) => (
                <button
                  key={v.id}
                  className="w-full flex items-center gap-3 p-2 rounded-lg"
                  style={{ backgroundColor: "#091d35" }}
                  onClick={() => navigate(`/videos/view/${v.id}`)}
                >
                  <img
                    src={
                      v.thumbnail
                        ? `/${v.thumbnail}`
                        : "/assets/user-placeholder-avatar.svg"
                    }
                    alt={v.title}
                    className="w-24 h-16 object-cover rounded"
                  />

                  <div className="flex-1 text-left">
                    <div className="text-white text-sm line-clamp-2">
                      {v.title}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {v.channel || ""}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
