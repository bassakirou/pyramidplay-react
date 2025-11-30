import { Heart, Plus } from "lucide-react";
import type { Album } from "../types";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface AlbumCardProps {
  album: Album;
  onAddToPlaylist?: (album: Album) => void;
  onToggleFavorite?: (album: Album) => void;
}

export function AlbumCard({
  album,
  onAddToPlaylist,
  onToggleFavorite,
}: AlbumCardProps) {
  let imgSrc = "/assets/user-placeholder-avatar.svg";
  if (Array.isArray(album.coverImage) && album.coverImage.length > 0) {
    imgSrc = album.coverImage[0].startsWith("/")
      ? album.coverImage[0]
      : `/${album.coverImage[0]}`;
  } else if (typeof album.coverImage === "string") {
    imgSrc = album.coverImage.startsWith("/")
      ? album.coverImage
      : `/${album.coverImage}`;
  } else if (typeof album.cover === "string") {
    imgSrc = album.cover.startsWith("/") ? album.cover : `/${album.cover}`;
  }
  const artistLabel = Array.isArray(album.artist)
    ? album.artist
        .map((a) => a?.name ?? "")
        .filter(Boolean)
        .join(", ")
    : typeof album.artist === "string"
    ? album.artist
    : "Artiste";

  return (
    <Link
      to={`/albums/${album.id}`}
      className="relative group w-48 sm:w-52 md:w-56"
      style={{ backgroundColor: "#0f2036" }}
      data-oid="fhgem2g"
    >
      <div className="p-4" data-oid="wasqty2">
        <div className="w-full aspect-square" data-oid="6n4y99c">
          <img
            src={imgSrc}
            alt={album.title}
            className="w-full h-full rounded-xl object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/user-placeholder-avatar.svg";
            }}
            data-oid="jh:882x"
          />
        </div>
      </div>

      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          backgroundColor: "rgba(9,29,53,0.85)",
          border: "1px solid #203c5a",
        }}
        data-oid="i5fu9pk"
      >
        <div
          className="absolute bottom-3 left-3 flex items-center gap-3"
          data-oid="ul.mhdq"
        >
          <Button
            size="icon"
            variant="secondary"
            style={{ backgroundColor: "#fdac0d", color: "#0a1d35" }}
            onClick={() => onAddToPlaylist?.(album)}
            aria-label="Ajouter à une playlist"
            data-oid="s1k70wq"
          >
            <Plus data-oid="6ab-h0e" />
          </Button>
        </div>
        <div className="absolute bottom-3 right-3" data-oid="cmw8mh4">
          <Button
            size="icon"
            variant="secondary"
            style={{ backgroundColor: "#fdac0d", color: "#0a1d35" }}
            onClick={() => onToggleFavorite?.(album)}
            aria-label="Favoris"
            data-oid="ku.zt:-"
          >
            <Heart data-oid="uxfp-c." />
          </Button>
        </div>
        <div
          className="absolute top-3 left-3 right-3 text-center"
          data-oid="r:im0nz"
        >
          <div className="text-white font-semibold truncate" data-oid="1axeimj">
            {album.title}
          </div>
          <div
            className="text-xs"
            style={{ color: "#fdac0d" }}
            data-oid="5u6r:7b"
          >
            {artistLabel}
          </div>
        </div>
      </div>

      <div className="px-3 pb-4 text-center" data-oid="bp-1iex">
        <div className="text-white font-medium truncate" data-oid="n8_l8st">
          {album.title}
        </div>
        <div
          className="text-xs"
          style={{ color: "#fdac0d" }}
          data-oid="vdh29ti"
        >
          {artistLabel}
        </div>
      </div>
    </Link>
  );
}
