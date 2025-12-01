import type { Music } from "../types";
import MusicCard from "./MusicCard";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface MusicGridProps {
  music: Music[];
  loading?: boolean;
  error?: string | null;
  searchQuery?: string;
  className?: string;
}

export default function MusicGrid({
  music,
  loading,
  error,
  searchQuery,
  className = "",
}: MusicGridProps) {
  // Filtrer pour ne garder que les pistes avec des fichiers audio
  const availableMusic = music.filter((track) => track.src !== null);
  if (loading) {
    return (
      <div
        className={`flex items-center justify-center py-12 ${className}`}
        data-oid="qr1qc5c"
      >
        <div className="text-center" data-oid="tcspact">
          <Loader2
            className="h-8 w-8 animate-spin mx-auto mb-4"
            style={{ color: "#fdac0d" }}
            data-oid="ptti7om"
          />

          <p className="text-gray-300" data-oid="7.v_jrs">
            Chargement de la musique...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center py-12 ${className}`}
        data-oid="19-p0mk"
      >
        <div className="text-center" data-oid="10b55q6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "rgba(239, 68, 68, 0.2)" }}
            data-oid="t2nicn-"
          >
            <span
              className="text-2xl"
              style={{ color: "#ef4444" }}
              data-oid="xcrv9ai"
            >
              ⚠
            </span>
          </div>
          <h3
            className="text-lg font-medium text-white mb-2"
            data-oid="krc20j5"
          >
            Erreur de chargement
          </h3>
          <p className="text-gray-300 mb-4" data-oid="_yzs3mh">
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
            data-oid="s3y.ro0"
          >
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  if (music.length === 0) {
    return (
      <div
        className={`flex items-center justify-center py-12 ${className}`}
        data-oid="zb5dl0a"
      >
        <div className="text-center" data-oid="_2-as4f">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#091d35" }}
            data-oid="gaqodtf"
          >
            <span className="text-gray-400 text-2xl" data-oid="ecz.ymo">
              🎵
            </span>
          </div>
          <h3
            className="text-lg font-medium text-white mb-2"
            data-oid="uc.v_2c"
          >
            {searchQuery
              ? "Aucun résultat trouvé"
              : "Aucune musique disponible"}
          </h3>
          <p className="text-gray-300" data-oid="m2k5gpg">
            {searchQuery
              ? `Aucune musique ne correspond à "${searchQuery}"`
              : "La bibliothèque musicale est vide pour le moment."}
          </p>
          {searchQuery && (
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="mt-4 transition-colors hover:bg-transparent"
              style={{ color: "#fdac0d" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#e69a0a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#fdac0d";
              }}
              data-oid="92jhfd-"
            >
              Retour à la bibliothèque
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={className} data-oid="70dj9mw">
      {/* Results Header */}
      {searchQuery && (
        <div className="mb-6" data-oid="c4vajj.">
          <h2
            className="text-xl font-semibold text-white mb-2"
            data-oid="9pes7_a"
          >
            Résultats pour "{searchQuery}"
          </h2>
          <p className="text-gray-300" data-oid="62q52iw">
            {music.length}{" "}
            {music.length === 1 ? "résultat trouvé" : "résultats trouvés"}
          </p>
        </div>
      )}

      {/* Music Grid */}
      <div className="music-grid" data-oid="xwxw1bl">
        {music.map((track) => (
          <MusicCard
            key={track.id}
            music={track}
            playlist={availableMusic}
            className="transform transition-transform duration-200 hover:scale-105"
            data-oid="3f:dsb2"
          />
        ))}
      </div>

      {/* Stats */}
      <div
        className="mt-8 pt-6"
        style={{ borderTop: "1px solid #374151" }}
        data-oid="3joupjh"
      >
        <div
          className="flex flex-wrap items-center justify-between text-sm text-gray-300"
          data-oid="gnjej6i"
        >
          <div className="flex items-center space-x-4" data-oid="1vpk-ps">
            <span data-oid="m6w_rrp">
              {music.length} {music.length === 1 ? "piste" : "pistes"}
            </span>
            <span data-oid="45d-4_i">
              {music.filter((track) => track.src !== null).length} disponible
              {music.filter((track) => track.src !== null).length !== 1
                ? "s"
                : ""}
            </span>
          </div>
          <div className="text-xs" data-oid="kn:-6cs">
            Musique Africaine • PyramidPlay
          </div>
        </div>
      </div>
    </div>
  );
}
