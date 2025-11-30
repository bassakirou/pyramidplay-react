import { useState, useMemo } from "react";
import { List, Heart, Music } from "lucide-react";
import { useLibrary } from "../contexts/LibraryContext";
import MusicGrid from "../components/MusicGrid";
import { Button } from "../components/ui/button";

export default function Library() {
  const { playlists, favorites, recents } = useLibrary();
  const [tab, setTab] = useState<"playlists" | "favorites" | "recents">(
    "playlists",
  );

  const tabItems = [
    {
      key: "playlists" as const,
      label: "Playlist",
      icon: <List size={18} data-oid="ukt99_x" />,
    },
    {
      key: "favorites" as const,
      label: "Favoris",
      icon: <Heart size={18} data-oid="kqz2oom" />,
    },
    {
      key: "recents" as const,
      label: "Écoutés récemment",
      icon: <Music size={18} data-oid="16o9m-u" />,
    },
  ];

  const playlistCards = useMemo(() => playlists, [playlists]);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#162a42" }}
      data-oid="z_ga6-o"
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        data-oid="_20kyne"
      >
        <h1
          className="text-3xl md:text-4xl font-bold text-white mb-6"
          data-oid="3_2o-1m"
        >
          Ma bibliothèque
        </h1>

        {/* Tabs */}
        <div className="flex items-center gap-3 mb-8" data-oid="5-k3fsw">
          {tabItems.map((t) => (
            <Button
              key={t.key}
              variant="secondary"
              onClick={() => setTab(t.key)}
              style={{
                backgroundColor: tab === t.key ? "#fdac0d" : "#203c5a",
                color: tab === t.key ? "#0a1d35" : "#ffd384",
              }}
              data-oid="0u7zihq"
            >
              <span className="mr-2" data-oid="qcwtyyl">
                {t.icon}
              </span>
              {t.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        {tab === "playlists" && (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            data-oid="1:8t2c0"
          >
            {playlistCards.length === 0 && (
              <div
                className="text-sm"
                style={{ color: "#ffd384" }}
                data-oid=".acl8.z"
              >
                Aucune playlist créée
              </div>
            )}
            {playlistCards.map((p) => (
              <div
                key={p.id}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: "#0f2036",
                  border: "1px solid #203c5a",
                }}
                data-oid="3wauct7"
              >
                <div
                  className="h-32 rounded-lg mb-3"
                  style={{ backgroundColor: "#203c5a" }}
                  data-oid="21oht7t"
                />

                <div
                  className="text-white font-semibold truncate"
                  data-oid="uk3-9:w"
                >
                  {p.name}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "#fdac0d" }}
                  data-oid="7007b-y"
                >
                  {p.tracks.length} song(s)
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "favorites" && (
          <MusicGrid music={favorites} className="mt-2" data-oid="14hhepo" />
        )}

        {tab === "recents" && (
          <MusicGrid music={recents} className="mt-2" data-oid="37gm78j" />
        )}
      </div>
    </div>
  );
}
