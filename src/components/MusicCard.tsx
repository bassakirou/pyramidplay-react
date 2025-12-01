import { Play, Pause, Plus } from "lucide-react";
import type { Music } from "../types";
import { useAudioPlayer } from "../contexts/AudioPlayerContext";
import PlaylistModal from "./PlaylistModal";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toastManager } from "./ui/toast";
import { Button } from "./ui/button";

interface MusicCardProps {
  music: Music;
  playlist: Music[];
  className?: string;
}

export default function MusicCard({
  music,
  playlist,
  className = "",
}: MusicCardProps) {
  const { playerState, playTrack, pauseTrack, resumeTrack } = useAudioPlayer();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const isCurrentTrack = playerState.currentTrack?.id === music.id;
  const isPlaying = isCurrentTrack && playerState.isPlaying;
  const isPlayable = music.src !== null;

  if ((import.meta as any).env?.DEV) {
    console.log(
      `[MusicCard] ${music.title} - isPlayable:`,
      isPlayable,
      "src:",
      music.src
    );
    console.log(
      `[MusicCard] ${music.title} - isCurrentTrack:`,
      isCurrentTrack,
      "isPlaying:",
      isPlaying
    );
  }

  const handlePlayPause = () => {
    if ((import.meta as any).env?.DEV) {
      console.log(`[MusicCard] handlePlayPause clicked for ${music.title}`);
      console.log(
        `[MusicCard] isPlayable:`,
        isPlayable,
        "isCurrentTrack:",
        isCurrentTrack,
        "isPlaying:",
        isPlaying
      );
    }

    if (!isPlayable) {
      console.log(
        `[MusicCard] Track ${music.title} is not playable, returning`
      );
      return;
    }

    if (isCurrentTrack) {
      if (isPlaying) {
        console.log(`[MusicCard] Pausing current track: ${music.title}`);
        pauseTrack();
      } else {
        console.log(`[MusicCard] Resuming current track: ${music.title}`);
        resumeTrack();
      }
    } else {
      console.log(`[MusicCard] Playing new track: ${music.title}`);
      playTrack(music, playlist);
    }
  };

  const withBase = (p?: string) => {
    if (!p) return "/assets/user-placeholder-avatar.svg";
    const clean = p.startsWith("/") ? p.slice(1) : p;
    const base = (import.meta as any).env?.BASE_URL || "/";
    return `${base}${clean}`;
  };
  const getImageSrc = () => withBase(music.image);
  const imgSrc = getImageSrc();
  if ((import.meta as any).env?.DEV) {
    console.log(`[MusicCard] Image URL for ${music.title}:`, imgSrc);
  }
  useEffect(() => {
    if (!(import.meta as any).env?.DEV) return;
    const probe = async () => {
      try {
        const res = await fetch(imgSrc, { method: "HEAD" });
        console.log(
          `[MusicCard] Probe image for ${music.title}:`,
          imgSrc,
          res.status
        );
      } catch (e) {
        console.error(
          `[MusicCard] Probe image failed for ${music.title}:`,
          imgSrc,
          e
        );
      }
    };
    probe();
  }, [imgSrc, music.title]);
  useEffect(() => {
    if (!(import.meta as any).env?.DEV) return;
    const src = music.src ?? null;
    if (!src) return;
    const check = async () => {
      try {
        const res = await fetch(src, { method: "HEAD" });
        console.log(
          `[MusicCard] Probe audio for ${music.title}:`,
          src,
          res.status
        );
      } catch (e) {
        console.error(
          `[MusicCard] Probe audio failed for ${music.title}:`,
          src,
          e
        );
      }
    };
    check();
  }, [music.src, music.title]);

  return (
    <div
      className={`music-card group relative rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer ${className}`}
      style={{ backgroundColor: "#091d35" }}
      onClick={(e) => {
        if ((import.meta as any).env?.DEV) {
          console.log(`[MusicCard] Card clicked for ${music.title}`);
          console.log(`[MusicCard] Event target:`, e.target);
          console.log(`[MusicCard] Current target:`, e.currentTarget);
        }
        // Ne pas déclencher le clic si c'est déjà le bouton qui a été cliqué
        if ((e.target as HTMLElement).closest("button")) {
          console.log(`[MusicCard] Click on button, not triggering card click`);
          return;
        }
        handlePlayPause();
      }}
      data-oid="hy006fw"
    >
      {/* Image Container */}
      <div
        className="relative aspect-square overflow-hidden"
        data-oid="q:msq_h"
      >
        <img
          src={imgSrc}
          alt={`${
            Array.isArray(music.artist)
              ? music.artist.map((a) => a.name).join(", ")
              : typeof music.artist === "string"
              ? music.artist
              : "Artiste inconnu"
          } - ${music.title}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.error(
              `[MusicCard] Image failed for ${music.title}:`,
              target.src
            );
            target.src = `https://picsum.photos/seed/${music.id}/600/600.webp`;
          }}
          data-oid="0uxskd7"
        />

        {/* Play/Pause Overlay */}
        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center"
          onMouseEnter={() =>
            console.log(`[MusicCard] Mouse entered overlay for ${music.title}`)
          }
          onMouseLeave={() =>
            console.log(`[MusicCard] Mouse left overlay for ${music.title}`)
          }
          data-oid="ujhhbok"
        >
          <Button
            onClick={(e) => {
              console.log(`[MusicCard] Button clicked for ${music.title}`);
              e.stopPropagation(); // Empêcher la propagation vers la carte
              handlePlayPause();
            }}
            disabled={!isPlayable}
            className={`
              transform scale-0 group-hover:scale-100 transition-transform duration-300
              w-16 h-16 rounded-full flex items-center justify-center shadow-lg
              ${
                isPlayable
                  ? "text-white cursor-pointer"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed"
              }
              ${isCurrentTrack && isPlaying ? "scale-100" : ""}
            `}
            style={{
              backgroundColor: isPlayable ? "#fdac0d" : undefined,
              zIndex: 20, // Z-index élevé pour s'assurer que le bouton est visible
              position: "relative",
            }}
            onMouseEnter={(e) => {
              console.log(
                `[MusicCard] Button mouse enter for ${music.title}, isPlayable:`,
                isPlayable
              );
              if (isPlayable) {
                e.currentTarget.style.backgroundColor = "#e69a0a";
              }
            }}
            onMouseLeave={(e) => {
              console.log(`[MusicCard] Button mouse leave for ${music.title}`);
              if (isPlayable) {
                e.currentTarget.style.backgroundColor = "#fdac0d";
              }
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
            data-oid="ops7nk0"
          >
            {isPlaying ? (
              <Pause size={24} data-oid="19ypmvy" />
            ) : (
              <Play size={24} className="ml-1" data-oid="5j9..aa" />
            )}
          </Button>
        </div>

        {/* Current Track Indicator */}
        {isCurrentTrack && (
          <div className="absolute top-2 right-2" data-oid="0luj3pn">
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: "#fdac0d" }}
              data-oid="sluxea6"
            ></div>
          </div>
        )}

        {/* Add to Playlist Button */}
        {isPlayable && (
          <div className="absolute top-2 left-2" data-oid="addplbtn">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full flex items-center justify-center shadow"
              style={{ backgroundColor: "#fdac0d", color: "#091d35" }}
              onClick={(e) => {
                e.stopPropagation();
                if (!user) {
                  toastManager.add({
                    title: "Connexion requise",
                    description:
                      "Veuillez vous connecter pour ajouter à une playlist",
                    type: "error",
                  });
                  return;
                }
                setOpen(true);
              }}
              aria-label="Ajouter à une playlist"
            >
              <Plus size={16} />
            </Button>
          </div>
        )}

        {/* Unavailable Overlay */}
        {!isPlayable && (
          <div
            className="absolute inset-0 bg-gray-900/50 flex items-center justify-center"
            data-oid="t.-2xsb"
          >
            <span
              className="text-white text-sm font-medium bg-gray-800 px-2 py-1 rounded"
              data-oid="ihgdsbi"
            >
              Indisponible
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4" data-oid="ru1f53l">
        <h3
          className="font-semibold text-white text-sm mb-1 line-clamp-2 transition-colors"
          style={{ color: isCurrentTrack ? "#fdac0d" : "#ffffff" }}
          data-oid="k6cwk5b"
        >
          {music.title}
        </h3>
        <p className="text-gray-300 text-sm line-clamp-1" data-oid="ibz1mkk">
          {Array.isArray(music.artist)
            ? music.artist.map((a) => a.name).join(", ")
            : typeof music.artist === "string"
            ? music.artist
            : ""}
        </p>

        {/* Status Badge */}
        <div
          className="mt-2 flex items-center justify-between"
          data-oid="y4n8y5a"
        >
          <span
            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: isPlayable ? "#00ff88" : "#6b7280",
              color: isPlayable ? "#091d35" : "#ffffff",
            }}
            data-oid="sjwq6_o"
          >
            {isPlayable ? "Disponible" : "Bientôt"}
          </span>

          {isCurrentTrack && (
            <div className="flex items-center space-x-1" data-oid="78nmql5">
              <div
                className="w-1 h-1 rounded-full animate-pulse"
                style={{ backgroundColor: "#fdac0d" }}
                data-oid="fj1b4pc"
              ></div>
              <div
                className="w-1 h-1 rounded-full animate-pulse"
                style={{ backgroundColor: "#fdac0d", animationDelay: "0.2s" }}
                data-oid="vg_5vul"
              ></div>
              <div
                className="w-1 h-1 rounded-full animate-pulse"
                style={{ backgroundColor: "#fdac0d", animationDelay: "0.4s" }}
                data-oid=".uf3z5x"
              ></div>
            </div>
          )}
        </div>
      </div>
      <PlaylistModal open={open} track={music} onClose={() => setOpen(false)} />
    </div>
  );
}
