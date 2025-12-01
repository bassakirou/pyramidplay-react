import { useState } from "react";
import type { Music } from "../types";
import { useLibrary } from "../contexts/LibraryContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toastManager } from "./ui/toast";
import { useAuth } from "../contexts/AuthContext";

interface PlaylistModalProps {
  open: boolean;
  track: Music | null;
  onClose: () => void;
}

export default function PlaylistModal({
  open,
  track,
  onClose,
}: PlaylistModalProps) {
  const { playlists, addToPlaylist, createPlaylist } = useLibrary();
  const [newName, setNewName] = useState("");
  const canAdd = Boolean(track);
  const { user } = useAuth();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      data-oid="_o_247m"
    >
      <div
        className="w-full max-w-md rounded-xl p-6"
        style={{ backgroundColor: "#0f2036", border: "1px solid #203c5a" }}
        data-oid="k:qqukk"
      >
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: "#fff" }}
          data-oid="e5moqml"
        >
          Ajouter à une playlist
        </h3>

        {/* Existing playlists */}
        <div
          className="space-y-2 max-h-48 overflow-y-auto mb-4"
          data-oid="_4myc1y"
        >
          {playlists.length === 0 && (
            <div
              className="text-sm"
              style={{ color: "#ffd384" }}
              data-oid="o9l6yf8"
            >
              Aucune playlist pour le moment
            </div>
          )}
          {playlists.map((p) => (
            <Button
              key={p.id}
              variant="ghost"
              disabled={!canAdd}
              onClick={() => {
                if (!user) {
                  toastManager.add({
                    title: "Connexion requise",
                    description:
                      "Veuillez vous connecter pour ajouter à une playlist",
                    type: "error",
                  });
                  return;
                }
                if (!track) return;
                addToPlaylist(track, p.id);
                toastManager.add({
                  title: "Ajouté à la playlist",
                  description: `${track.title} → ${p.name}`,
                  type: "success",
                });
                onClose();
              }}
              className="w-full text-left px-3 py-2 rounded-md justify-start h-auto"
              style={{ backgroundColor: "#162a42", color: "#fff" }}
              data-oid="0qrmi1:"
            >
              <span
                className="font-medium"
                style={{ color: "#fdac0d" }}
                data-oid="57e_9ic"
              >
                {p.name}
              </span>
              <span className="ml-2 text-xs text-gray-400" data-oid="a_fl34y">
                {p.tracks.length} song(s)
              </span>
            </Button>
          ))}
        </div>

        {/* Create new playlist */}
        <div className="space-y-2" data-oid=".gnj-_h">
          <label
            className="text-sm"
            style={{ color: "#ffd384" }}
            data-oid="2yq-4dp"
          >
            Créer une nouvelle playlist
          </label>
          <Input
            placeholder="Nom de la playlist"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            data-oid="qcmm2t7"
          />

          <div
            className="flex items-center justify-end gap-2 pt-2"
            data-oid="u664txp"
          >
            <Button
              variant="secondary"
              onClick={onClose}
              style={{ backgroundColor: "#203c5a", color: "#fff" }}
              data-oid="i974f9d"
            >
              Annuler
            </Button>
            <Button
              onClick={() => {
                if (!user) {
                  toastManager.add({
                    title: "Connexion requise",
                    description:
                      "Veuillez vous connecter pour créer une playlist",
                    type: "error",
                  });
                  return;
                }
                const created = createPlaylist(newName.trim());
                setNewName("");
                if (track) addToPlaylist(track, created.id);
                toastManager.add({
                  title: "Playlist créée",
                  description: created.name,
                  type: "success",
                });
                onClose();
              }}
              style={{ backgroundColor: "#fdac0d", color: "#0a1d35" }}
              data-oid="kww-_tu"
            >
              Créer et Ajouter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
