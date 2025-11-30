import { useParams, Link } from "react-router-dom";
import { useArtists } from "../hooks/useArtists";
import { useAlbums } from "../hooks/useAlbums";
import { useMusic } from "../hooks/useMusic";
import { Carousel } from "../components/Carousel";
import { AlbumCard } from "../components/AlbumCard";

export function ArtistView() {
  const { id } = useParams();
  const artistId = Number(id);
  const { artists, loading: loadingArtists } = useArtists();
  const { albums, loading: loadingAlbums } = useAlbums();
  const { music } = useMusic();

  const artist = artists.find((a) => a.id === artistId);

  // Derive counts
  const targetName = (artist?.name ?? "").toLowerCase();
  const artistAlbums = albums.filter((al) => {
    if (Array.isArray(al.artist)) {
      return al.artist.some((a) => {
        const name = String(a?.name ?? "").toLowerCase();
        return a?.id === artistId || name === targetName;
      });
    }
    if (typeof al.artist === "string") {
      return al.artist.toLowerCase() === targetName;
    }
    return false;
  });
  const songsCount = music.filter((m) => {
    const names = Array.isArray(m.artist)
      ? m.artist.map((a) => a.name.toLowerCase())
      : [String(m.artist ?? "").toLowerCase()];
    const target = (artist?.name ?? "").toLowerCase();
    return names.includes(target);
  }).length;

  if (loadingArtists) {
    return (
      <div className="text-gray-300 p-6" data-oid="ra0q0mr">
        Chargement de l'artiste...
      </div>
    );
  }
  if (!artist) {
    return (
      <div className="text-red-400 p-6" data-oid="y0q6xq4">
        Artiste introuvable
      </div>
    );
  }

  const imgSrc = artist.image
    ? artist.image.startsWith("/")
      ? artist.image
      : `/${artist.image}`
    : "/assets/user-placeholder-avatar.svg";

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#162a42" }}
      data-oid="sjdl_mi"
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        data-oid="7nxc7t1"
      >
        {/* Header */}
        <div className="flex items-start gap-6 mb-8" data-oid="qas6sr4">
          <div
            className="w-28 sm:w-32 md:w-36 aspect-square"
            data-oid="jr7eowd"
          >
            <img
              src={imgSrc}
              alt={artist.name}
              className="w-full h-full rounded-full object-cover ring-1 ring-[#193652]"
              data-oid="u6cm3n6"
            />
          </div>
          <div className="flex-1" data-oid="a3c9osh">
            <div
              className="text-sm"
              style={{ color: "#fdac0d" }}
              data-oid=":.:3xzp"
            >
              ARTISTE
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-white mb-2"
              data-oid="9m:r9i:"
            >
              {artist.name}
            </h1>
            {artist.bio && (
              <p className="text-gray-300 max-w-2xl mb-4" data-oid="b27ax-s">
                {artist.bio}
              </p>
            )}
            <div
              className="flex flex-wrap items-center gap-4 text-gray-300"
              data-oid="8b-x516"
            >
              <span data-oid="49_wz-o">Artist</span>
              <span data-oid="z:mm5l4">• {songsCount} songs</span>
              <span data-oid="s8wh:l6">• {artistAlbums.length} Albums</span>
            </div>
          </div>
        </div>

        {/* Albums section */}
        <div
          className="flex items-center justify-between mb-4"
          data-oid="e2q_aaa"
        >
          <h2 className="text-2xl font-bold text-white" data-oid="-1mpv_i">
            Albums de "{artist.name}"
          </h2>
          <Link
            to="/artists"
            className="text-sm"
            style={{ color: "#fdac0d" }}
            data-oid="h28yxfb"
          >
            Tout afficher
          </Link>
        </div>

        {loadingAlbums ? (
          <div className="text-gray-300" data-oid="p6:v4fl">
            Chargement des albums...
          </div>
        ) : (
          <Carousel nbSlides={5} showDots showNav data-oid="d1gnc9.">
            {artistAlbums.map((al) => (
              <AlbumCard key={al.id} album={al} data-oid="-4you_v" />
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
}
