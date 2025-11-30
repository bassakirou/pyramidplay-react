import { Heart } from "lucide-react";
import type { Artist } from "../types";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";

interface ArtistCardProps {
  artist: Artist;
  onToggleFavorite?: (artist: Artist) => void;
}

export function ArtistCard({ artist, onToggleFavorite }: ArtistCardProps) {
  const withBase = (p?: string) => {
    if (!p) return "/assets/user-placeholder-avatar.svg";
    const clean = p.startsWith("/") ? p.slice(1) : p;
    const base = (import.meta as any).env?.BASE_URL || "/";
    return `${base}${clean}`;
  };
  const imgSrc = withBase(artist.image);
  if ((import.meta as any).env?.DEV) {
    console.log(`[ArtistCard] Image URL for ${artist.name}:`, imgSrc);
  }
  useEffect(() => {
    if (!(import.meta as any).env?.DEV) return;
    const probe = async () => {
      try {
        const res = await fetch(imgSrc, { method: "HEAD" });
        console.log(
          `[ArtistCard] Probe image for ${artist.name}:`,
          imgSrc,
          res.status
        );
      } catch (e) {
        console.error(
          `[ArtistCard] Probe image failed for ${artist.name}:`,
          imgSrc,
          e
        );
      }
    };
    probe();
  }, [imgSrc, artist.name]);

  return (
    <Link
      to={`/artists/${artist.id}`}
      className="relative group w-48 sm:w-52 md:w-56"
      style={{ backgroundColor: "#0f2036" }}
      data-oid="_89kz6c"
    >
      {/* Image */}
      <div className="flex items-center justify-center p-4" data-oid="s-s8r71">
        <div className="w-28 sm:w-32 aspect-square" data-oid="hgyy3yq">
          <img
            src={imgSrc}
            alt={artist.name}
            className="w-full h-full rounded-full object-cover ring-1 ring-[#193652]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${artist.id}/300/300.webp`;
              console.error(
                `[ArtistCard] Image failed for ${artist.name}:`,
                imgSrc
              );
            }}
            data-oid="0cnkywn"
          />
        </div>
      </div>

      {/* Hover card overlay */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          backgroundColor: "rgba(9,29,53,0.85)",
          border: "1px solid #203c5a",
        }}
        data-oid="1y2b:hc"
      >
        <div className="absolute bottom-3 right-3" data-oid="fxiutpa">
          <Button
            size="icon"
            variant="secondary"
            style={{ backgroundColor: "#fdac0d", color: "#0a1d35" }}
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite?.(artist);
            }}
            aria-label="Favoris"
            data-oid="zt-smmq"
          >
            <Heart data-oid="q2n_8qn" />
          </Button>
        </div>
        <div
          className="absolute top-3 left-3 right-3 text-center"
          data-oid="br::7xx"
        >
          <div className="text-white font-semibold truncate" data-oid="co7mlx7">
            {artist.name}
          </div>
          <div
            className="text-xs"
            style={{ color: "#fdac0d" }}
            data-oid="vgp6dky"
          >
            Artiste
          </div>
        </div>
      </div>

      {/* Below label when not hovering */}
      <div className="px-3 pb-4 text-center" data-oid="ryz_4a_">
        <div className="text-white font-medium truncate" data-oid="39i-a1j">
          {artist.name}
        </div>
        <div
          className="text-xs"
          style={{ color: "#fdac0d" }}
          data-oid="8tqe:3p"
        >
          Artiste
        </div>
      </div>
    </Link>
  );
}
