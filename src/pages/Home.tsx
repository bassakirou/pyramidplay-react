import MusicGrid from "../components/MusicGrid";
import { useMusic } from "../hooks/useMusic";
import { useArtists } from "../hooks/useArtists";
import { ArtistGrid } from "../components/ArtistGrid";
import { Button } from "../components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Genres } from "../types";
import type { Artist } from "../types";
import { useLibrary } from "../contexts/LibraryContext";
import { toastManager } from "../components/ui/toast";

export function Home() {
  const { music, loading, error } = useMusic();
  const { artists, loading: loadingArtists } = useArtists();
  const navigate = useNavigate();
  const [genres, setGenres] = useState<Genres[]>([]);
  const { toggleFavorite } = useLibrary();

  // Load genres from mock
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const res = await fetch("/mock/genres.json");
        if (res.ok) {
          const data: Genres[] = await res.json();
          setGenres(data);
        }
      } catch (e) {
        console.error("Erreur de chargement des genres:", e);
      }
    };
    loadGenres();
  }, []);

  // Compute counts per genre based on music data
  const genreCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    music.forEach((track) => {
      track.genres?.forEach((g) => {
        counts[g.id] = (counts[g.id] || 0) + 1;
      });
    });
    return counts;
  }, [music]);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#162a42" }}
      data-oid="c47g0du"
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        data-oid="6nqukcw"
      >
        {/* Hero Section */}
        <div className="mb-8" data-oid="e14etc9">
          <h1
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            data-oid="y9nopdu"
          >
            Découvrez la Musique Africaine
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl" data-oid="g_.:_ov">
            PyramidPlay vous propose une sélection exclusive d'artistes
            africains, avec un focus particulier sur la scène musicale
            camerounaise.
          </p>
        </div>

        {/* Catégories populaires */}
        <div className="mb-8" data-oid="bgle0ev">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            data-oid="9:h7iq9"
          >
            Catégories populaires
          </h2>
          <div className="flex flex-wrap gap-3" data-oid="ydkchf0">
            {genres.map((genre) => {
              const count = genreCounts[genre.id] || 0;
              // Simple color mapping per genre for visual distinction
              const hue = (genre.id * 37) % 360;
              const bg = `hsl(${hue} 70% 35% / 0.25)`;
              const border = `hsl(${hue} 85% 50%)`;
              return (
                <Button
                  key={genre.id}
                  variant="secondary"
                  className="rounded-full px-4 py-2 text-sm"
                  style={{
                    backgroundColor: bg,
                    borderColor: border,
                    color: "#ffd384",
                    borderWidth: 1,
                  }}
                  onClick={() =>
                    navigate(`/search?q=${encodeURIComponent(genre.name)}`)
                  }
                  data-oid="qmb_06d"
                >
                  <span
                    className="font-semibold"
                    style={{ color: "#fdac0d" }}
                    data-oid="ayjh6d-"
                  >
                    {genre.name}
                  </span>
                  <span
                    className="ml-2 text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#fdac0d", color: "#091d35" }}
                    data-oid="ah9n8xh"
                  >
                    {count}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Artistes populaires */}
        {!loadingArtists && artists.length > 0 && (
          <ArtistGrid
            artists={artists.slice(0, 12)}
            onToggleFavorite={(artist: Artist) => {
              const track = music.find(
                (t) =>
                  Array.isArray(t.artist) &&
                  t.artist.some((a) => a.id === artist.id)
              );
              if (track) {
                toggleFavorite(track);
                toastManager.add({
                  title: "Ajouté aux favoris",
                  description: track.title,
                  type: "success",
                });
              }
            }}
            data-oid=".3c3e_f"
          />
        )}

        {/* Music Section */}
        <div data-oid="u81.ox3">
          <div
            className="flex items-center justify-between mb-6"
            data-oid="k4a2vt8"
          >
            <h2 className="text-2xl font-bold text-white" data-oid="l-e.uzt">
              Toute la Musique
            </h2>
            <div className="text-sm text-gray-300" data-oid="d2tvsx-">
              {music.length} {music.length === 1 ? "artiste" : "artistes"}
            </div>
          </div>

          <MusicGrid
            music={music}
            loading={loading}
            error={error}
            data-oid="47takc_"
          />
        </div>
      </div>
    </div>
  );
}
