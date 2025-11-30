import { useParams, Link } from "react-router-dom";
import { useAlbums } from "../hooks/useAlbums";
import { useMusic } from "../hooks/useMusic";
import { TrackPlayer } from "../components/TrackPlayer";

export function AlbumView() {
  const { id } = useParams();
  const albumId = Number(id);
  const { albums, loading: loadingAlbums } = useAlbums();
  const { music } = useMusic();

  const album = albums.find((a) => a.id === albumId);

  if (loadingAlbums) {
    return (
      <div className="text-gray-300 p-6" data-oid="eriaxjs">
        Chargement de l'album...
      </div>
    );
  }
  if (!album) {
    return (
      <div className="text-red-400 p-6" data-oid="js95o8c">
        Album introuvable
      </div>
    );
  }

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
    : "";

  // Tracks for this album: prefer trackIds, otherwise use album title match
  const tracks = music.filter((m) => {
    if (album.trackIds && album.trackIds.length) {
      const ids =
        typeof album.trackIds[0] === "number"
          ? (album.trackIds as number[])
          : (album.trackIds as import("../types").Music[]).map((t) => t.id);
      return ids.includes(m.id);
    }
    return m.album?.title === album.title;
  });

  // Compute total duration
  const totalSec = tracks.reduce((acc, t) => acc + (t.duration || 0), 0);
  const totalMin = Math.round(totalSec / 60);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#162a42" }}
      data-oid="f67mfji"
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        data-oid="lkp7o1e"
      >
        {/* Header */}
        <div className="flex items-start gap-6 mb-8" data-oid="jkzz7h6">
          <div className="w-36 md:w-44 aspect-square" data-oid="k1xqlbx">
            <img
              src={imgSrc}
              alt={album.title}
              className="w-full h-full rounded-xl object-cover"
              data-oid="qek8-o2"
            />
          </div>
          <div className="flex-1" data-oid="i50x_h8">
            <div
              className="text-sm"
              style={{ color: "#fdac0d" }}
              data-oid=".12.8.4"
            >
              ALBUM
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-white mb-2"
              data-oid=":8o0h_-"
            >
              {album.title}
            </h1>
            <p className="text-gray-300 max-w-2xl mb-4" data-oid="0gqplqp">
              {album.releaseDate
                ? new Date(album.releaseDate).getFullYear()
                : ""}
              {artistLabel && ` • ${artistLabel}`}
              {tracks.length ? ` • ${tracks.length} songs` : ""}
              {totalMin ? ` • ${totalMin} mn` : ""}
            </p>
            <div className="flex items-center gap-4" data-oid="_.xyjne">
              <Link
                to={
                  Array.isArray(album.artist) && album.artist[0]?.id
                    ? `/artists/${album.artist[0].id}`
                    : "/artists"
                }
                className="text-sm"
                style={{ color: "#fdac0d" }}
                data-oid="kbe:1c7"
              >
                {artistLabel || "Artist"}
              </Link>
              <span className="text-sm text-gray-300" data-oid="86uujst">
                Sauvegarder
              </span>
            </div>
          </div>
        </div>

        {/* Track list */}
        <TrackPlayer tracks={tracks} data-oid="qk-azme" />
      </div>
    </div>
  );
}
