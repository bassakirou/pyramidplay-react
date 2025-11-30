import { useNavigate } from "react-router-dom";
import type { Artist } from "../types";
import { ArtistCard } from "./ArtistCard";
import { Button } from "./ui/button";
import { Carousel } from "./Carousel";

interface ArtistGridProps {
  artists: Artist[];
  title?: string;
  onToggleFavorite?: (artist: Artist) => void;
}

export function ArtistGrid({
  artists,
  title = "Artistes populaires",
  onToggleFavorite,
}: ArtistGridProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-10" data-oid="3pxsn2b">
      <div
        className="flex items-center justify-between mb-4"
        data-oid="xlm50lx"
      >
        <h2 className="text-2xl font-bold text-white" data-oid="qsm1qqp">
          {title}
        </h2>
        <Button
          variant="link"
          className="text-sm"
          style={{ color: "#fdac0d" }}
          onClick={() => navigate("/artists")}
          data-oid="2e:xu:0"
        >
          Tout afficher
        </Button>
      </div>

      <Carousel
        nbSlides={6}
        showDots
        showNav
        className="py-2"
        data-oid="t89nku."
      >
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            onToggleFavorite={onToggleFavorite}
            data-oid="cwfr8:h"
          />
        ))}
      </Carousel>
    </div>
  );
}
