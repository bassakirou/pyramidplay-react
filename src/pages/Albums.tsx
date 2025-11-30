import { useAlbums } from "../hooks/useAlbums";
import { AlbumCard } from "../components/AlbumCard";

export function Albums() {
  const { albums, loading, error } = useAlbums();

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#162a42" }}
      data-oid="b73p128"
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        data-oid="k7hcxbo"
      >
        <div
          className="flex items-center justify-between mb-6"
          data-oid="o56ijdm"
        >
          <h1 className="text-3xl font-bold text-white" data-oid="drj3541">
            Albums
          </h1>
          <div
            className="text-sm"
            style={{ color: "#fdac0d" }}
            data-oid="bjlg-hp"
          >
            {albums.length} disponibles
          </div>
        </div>

        {loading && (
          <div className="text-gray-300" data-oid="v0n9d2x">
            Chargement des albums...
          </div>
        )}
        {error && (
          <div className="text-red-400" data-oid="96e:0au">
            Erreur: {error}
          </div>
        )}

        {!loading && !error && (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
            data-oid="sdlml_s"
          >
            {albums.map((al) => (
              <AlbumCard key={al.id} album={al} data-oid="-mc6p6s" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
