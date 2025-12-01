import type { Video } from "../types";
import VideoCard from "./VideoCard";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface VideoGridProps {
  videos: Video[];
  loading?: boolean;
  error?: string | null;
  searchQuery?: string;
  className?: string;
}

export default function VideoGrid({
  videos,
  loading,
  error,
  searchQuery,
  className = "",
}: VideoGridProps) {
  if (loading) {
    return (
      <div
        className={`flex items-center justify-center py-12 ${className}`}
        data-oid="m37blmi"
      >
        <div className="text-center" data-oid="xx.h57r">
          <Loader2
            className="h-8 w-8 animate-spin mx-auto mb-4"
            style={{ color: "#fdac0d" }}
            data-oid="8:4o5-i"
          />

          <p className="text-gray-300" data-oid="162.j75">
            Chargement des vidéos...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center py-12 ${className}`}
        data-oid="hlldnwk"
      >
        <div className="text-center" data-oid=".q0q7cx">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "rgba(239, 68, 68, 0.2)" }}
            data-oid="5afmikn"
          >
            <span
              className="text-2xl"
              style={{ color: "#ef4444" }}
              data-oid="eagowf1"
            >
              ⚠
            </span>
          </div>
          <h3
            className="text-lg font-medium text-white mb-2"
            data-oid=":8wt2fl"
          >
            Erreur de chargement
          </h3>
          <p className="text-gray-300 mb-4" data-oid="10q7u6e">
            {error}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="text-white px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: "#fdac0d" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e69a0a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fdac0d";
            }}
            data-oid="uavdcf7"
          >
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div
        className={`flex items-center justify-center py-12 ${className}`}
        data-oid="z1kz-xr"
      >
        <div className="text-center" data-oid="ewfs34z">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#091d35" }}
            data-oid="sl5ky68"
          >
            <span className="text-gray-400 text-2xl" data-oid="dnu.hz8">
              🎬
            </span>
          </div>
          <h3
            className="text-lg font-medium text-white mb-2"
            data-oid="hdic:c5"
          >
            {searchQuery ? "Aucun résultat trouvé" : "Aucune vidéo disponible"}
          </h3>
          <p className="text-gray-300" data-oid="n97wcp5">
            {searchQuery
              ? `Aucune vidéo ne correspond à "${searchQuery}"`
              : "La bibliothèque vidéo est vide pour le moment."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className} data-oid="e_x6t4h">
      {searchQuery && (
        <div className="mb-6" data-oid="rqwg85o">
          <h2
            className="text-xl font-semibold text-white mb-2"
            data-oid="trqjvtw"
          >
            Résultats pour "{searchQuery}"
          </h2>
          <p className="text-gray-300" data-oid="9p-84_u">
            {videos.length}{" "}
            {videos.length === 1 ? "résultat trouvé" : "résultats trouvés"}
          </p>
        </div>
      )}
      <div className="music-grid" data-oid="nrr-_6v">
        {videos.map((v) => (
          <VideoCard
            key={v.id}
            video={v}
            className="transform transition-transform duration-200 hover:scale-105"
            data-oid=".kcn70z"
          />
        ))}
      </div>
    </div>
  );
}
