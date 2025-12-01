import { Play } from "lucide-react";
import type { Music } from "../types";
import { Button } from "./ui/button";
import { useAudioPlayer } from "../contexts/AudioPlayerContext";

interface TrackPlayerProps {
  tracks: Music[];
}

export function TrackPlayer({ tracks }: TrackPlayerProps) {
  const { playTrack } = useAudioPlayer();

  const handlePlayAll = () => {
    if (tracks.length === 0) return;
    playTrack(tracks[0], tracks);
  };

  const formatDuration = (sec?: number) => {
    if (!sec || isNaN(sec)) return "";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="rounded-xl"
      style={{ backgroundColor: "#0f2036" }}
      data-oid="b5x7j2."
    >
      <div
        className="flex items-center gap-3 px-4 py-3 border-b"
        style={{ borderColor: "#203c5a" }}
        data-oid="i_q:s1."
      >
        <Button
          variant="secondary"
          style={{ backgroundColor: "#fdac0d", color: "#0a1d35" }}
          onClick={handlePlayAll}
          data-oid="yop8zxx"
        >
          <Play data-oid=".xzp6ss" />
          Jouer tout
        </Button>
        <div className="text-gray-300 text-sm" data-oid="h60y1p2">
          {tracks.length} titres
        </div>
      </div>

      <ul
        className="divide-y"
        style={{ borderColor: "#203c5a" }}
        data-oid="wz8.tps"
      >
        {tracks.map((t, idx) => (
          <li
            key={t.id}
            className="flex items-center justify-between px-4 py-3 hover:bg-white/5"
            data-oid="wzp7dw_"
          >
            <div className="flex items-center gap-4" data-oid=":s8ayg:">
              <div
                className="text-xs px-2 py-1 rounded"
                style={{ backgroundColor: "#27425e", color: "#fdac0d" }}
                data-oid="yolt-y."
              >
                {idx + 1}
              </div>
              <Button
                variant="ghost"
                className="text-left h-auto p-0 hover:bg-transparent"
                onClick={() => playTrack(t, tracks)}
                aria-label={`Lire ${t.title}`}
                data-oid="3ksei-r"
              >
                <div className="text-white font-medium" data-oid="8rke9oy">
                  {t.title}
                </div>
                <div className="text-xs text-gray-400" data-oid="12jdzhx">
                  {(t.artist ?? []).map((a) => a.name).join(", ")}
                </div>
              </Button>
            </div>
            <div className="text-sm text-gray-300" data-oid="2ghgzvw">
              {formatDuration(t.duration)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
