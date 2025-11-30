import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MusicGrid from "../components/MusicGrid";
import { useMusic } from "../hooks/useMusic";
import { Search as SearchIcon } from "lucide-react";
import type { Artist } from "../types";

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { music, loading, error, searchMusic } = useMusic();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(music);

  // Get search query from URL params
  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);
  }, [searchParams]);

  // Update search results when query or music changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchMusic(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults(music);
    }
  }, [searchQuery, music, searchMusic]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      data-oid="aboslj5"
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        data-oid="uaqow7v"
      >
        {/* Search Header */}
        <div className="mb-8" data-oid="tjh:4m1">
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
            data-oid="ofh7-rw"
          >
            Recherche
          </h1>

          {/* Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl"
            data-oid="bp-4c1v"
          >
            <div className="relative" data-oid="qd21e66">
              <SearchIcon
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                data-oid="a8w8boh"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des artistes, des titres..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                data-oid=":b7l9se"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  data-oid="5fzy09d"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2" data-oid="x.40zh3">
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors"
                data-oid="vbo5cnz"
              >
                Rechercher
              </button>
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 px-6 py-2 rounded-lg transition-colors"
                  data-oid="pt:d6ds"
                >
                  Effacer
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Search Suggestions */}
        {!searchQuery && (
          <div className="mb-8" data-oid="qe87hrr">
            <h2
              className="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              data-oid="1ca:9ef"
            >
              Suggestions de recherche
            </h2>
            <div className="flex flex-wrap gap-2" data-oid="-2fvt34">
              {[
                "Afrobeat",
                "Makossa",
                "Bikutsi",
                "Coupé-Décalé",
                "Ndombolo",
                "Zouk",
              ].map((genre) => (
                <button
                  key={genre}
                  onClick={() => {
                    setSearchQuery(genre);
                    setSearchParams({ q: genre });
                  }}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 px-4 py-2 rounded-full transition-colors"
                  data-oid="u-kynej"
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Artists */}
        {!searchQuery && (
          <div className="mb-8" data-oid="5micdex">
            <h2
              className="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              data-oid="fj6na:x"
            >
              Artistes populaires
            </h2>
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              data-oid="4va2ja6"
            >
              {music.slice(0, 8).map((track) => (
                <button
                  key={track.id}
                  onClick={() => {
                    const artistNames = Array.isArray(track.artist)
                      ? track.artist.map((a: Artist) => a.name).join(", ")
                      : "";
                    setSearchQuery(artistNames);
                    setSearchParams({ q: artistNames });
                  }}
                  className="text-left p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  data-oid="c8txq.s"
                >
                  <div
                    className="flex items-center space-x-3"
                    data-oid="_uphue_"
                  >
                    <img
                      src={(() => {
                        const base = (import.meta as any).env?.BASE_URL || "/";
                        const p = track.image || "";
                        const clean = p.startsWith("/") ? p.slice(1) : p;
                        return p
                          ? `${base}${clean}`
                          : "/assets/user-placeholder-avatar.svg";
                      })()}
                      alt={
                        Array.isArray(track.artist)
                          ? track.artist.map((a) => a.name).join(", ")
                          : ""
                      }
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/assets/user-placeholder-avatar.svg";
                      }}
                      data-oid="bbe4f9:"
                    />

                    <div className="min-w-0 flex-1" data-oid=".-v5701">
                      <p
                        className="font-medium text-gray-900 dark:text-white truncate"
                        data-oid="j4wyc_2"
                      >
                        {Array.isArray(track.artist)
                          ? track.artist.map((a) => a.name).join(", ")
                          : ""}
                      </p>
                      <p
                        className="text-sm text-gray-600 dark:text-gray-400 truncate"
                        data-oid="2pa7c5p"
                      >
                        {track.title}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        <MusicGrid
          music={searchResults}
          loading={loading}
          error={error}
          searchQuery={searchQuery}
          data-oid="8wmvaml"
        />
      </div>
    </div>
  );
}
