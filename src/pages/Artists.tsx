import { useArtists } from "../hooks/useArtists";
import { ArtistCard } from "../components/ArtistCard";

export function Artists() {
  const { artists, loading, error } = useArtists();

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#162a42" }}
      data-oid="ulcrtyb"
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        data-oid="6za73j6"
      >
        <div
          className="flex items-center justify-between mb-6"
          data-oid="di7jglj"
        >
          <h1
            className="text-3xl md:text-4xl font-bold text-white"
            data-oid="2ch4p4o"
          >
            Artistes
          </h1>
          <div className="text-sm text-gray-300" data-oid=":9k7rxg">
            {artists.length} {artists.length === 1 ? "artiste" : "artistes"}
          </div>
        </div>

        {loading && (
          <div className="text-gray-300" data-oid="9.qyp2d">
            Chargement des artistes...
          </div>
        )}
        {error && (
          <div className="text-red-400" data-oid="6zq-uns">
            {error}
          </div>
        )}

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          data-oid="s.75iu1"
        >
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} data-oid="77e21x." />
          ))}
        </div>
      </div>
    </div>
  );
}
