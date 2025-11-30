import React, { useEffect, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
} from "lucide-react";
import { useAudioPlayer } from "../contexts/AudioPlayerContext";
import { useMusic } from "../hooks/useMusic";
import { useLocation } from "react-router-dom";

export function AudioPlayer() {
  const {
    playerState,
    playTrack,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
    toggleShuffle,
    toggleRepeat,
    seekTo,
    setPlaylist,
  } = useAudioPlayer();

  const { getAvailableMusic } = useMusic();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Debug logs will be added after variable declarations
  const [isDragging, setIsDragging] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const { currentTrack, isPlaying, repeat, audioRef } = playerState;
  const location = useLocation();

  // Debug logs
  console.log("AudioPlayer render:", {
    currentTrack: currentTrack?.title,
    isPlaying,
    currentTime,
    duration,
  });

  console.log("Progress bar debug:", {
    progressWidth: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
    currentTime,
    duration,
    progressBarVisible: true,
  });

  // Update current time
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const updateTime = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
      }
    };

    const updateDuration = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
    };
  }, [audioRef, isDragging]);

  const handlePlayPause = () => {
    if (!currentTrack) {
      // If no track is selected, play the first available track
      const availableTracks = getAvailableMusic();
      if (availableTracks.length > 0) {
        playTrack(availableTracks[0], availableTracks);
      }
      return;
    }

    if (isPlaying) {
      pauseTrack();
    } else {
      resumeTrack();
    }
  };

  useEffect(() => {
    const availableTracks = getAvailableMusic();
    if (!location.pathname.startsWith("/albums") && availableTracks.length) {
      setPlaylist(availableTracks);
    }
  }, [location.pathname, getAvailableMusic, setPlaylist]);

  const handleShuffle = () => {
    console.log("Shuffle clicked, current state:", playerState.shuffle);
    toggleShuffle();
  };

  const handlePrevious = () => {
    console.log("Previous clicked");
    previousTrack();
  };

  const handleNext = () => {
    nextTrack();
  };

  const handleRepeat = () => {
    console.log("Repeat clicked, current state:", repeat);
    toggleRepeat();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    console.log("Volume changed to:", newVolume);
    setVolume(newVolume);
  };

  const handleMuteToggle = () => {
    console.log("Mute toggled, current state:", isMuted);
    setIsMuted(!isMuted);
  };

  // Update audio volume when volume or mute state changes
  useEffect(() => {
    const audio = audioRef?.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, audioRef]);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasAudioSource || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    seekTo(newTime);
    setCurrentTime(newTime);
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasAudioSource) return;
    setIsDragging(true);
    handleSeek(e);
  };

  const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !hasAudioSource) return;
    handleSeek(e);
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getTrackImageSrc = () => {
    if (!currentTrack) return "/assets/user-placeholder-avatar.svg";
    console.log(
      `[AudioPlayer] Image path for ${currentTrack.title}:`,
      currentTrack.image
    );
    console.log(
      `[AudioPlayer] Final image src:`,
      currentTrack.image
        ? `/${currentTrack.image}`
        : "/assets/user-placeholder-avatar.svg"
    );
    if (currentTrack.image) {
      return currentTrack.image.startsWith("/")
        ? currentTrack.image
        : `/${currentTrack.image}`;
    }
    return "/assets/user-placeholder-avatar.svg";
  };

  // Hide player if no track is selected
  if (!currentTrack) {
    console.log(`[AudioPlayer] Not rendering - no currentTrack`);
    return null;
  }

  console.log(`[AudioPlayer] Rendering player for:`, currentTrack.title);

  // Check if current track has audio source
  const hasAudioSource = currentTrack.src !== null;

  return (
    <div
      className="audio-player fixed bottom-0 left-0 right-0 lg:left-64 w-full border-t border-gray-700 p-4 z-50"
      style={{
        backgroundColor: "#091d35",
      }}
      data-oid="s:-zr6t"
    >
      <div className="w-full" data-oid="3ylsewj">
        <div className="flex items-center space-x-4" data-oid="hix1tzo">
          {/* Track Info */}
          <div
            className="flex items-center space-x-3 min-w-0 flex-1"
            data-oid="_4-a7sh"
          >
            <div
              className="rounded-lg flex-shrink-0 overflow-hidden"
              style={{
                backgroundColor: "#162a42",
                width: "48px",
                height: "48px",
                minWidth: "48px",
                minHeight: "48px",
                maxWidth: "48px",
                maxHeight: "48px",
              }}
              data-oid="68.42:_"
            >
              <img
                src={getTrackImageSrc()}
                alt={`${
                  Array.isArray(currentTrack.artist)
                    ? currentTrack.artist.map((a) => a.name).join(", ")
                    : typeof currentTrack.artist === "string"
                    ? currentTrack.artist
                    : "Artiste inconnu"
                } - ${currentTrack.title}`}
                style={{
                  width: "48px",
                  height: "48px",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/assets/user-placeholder-avatar.svg";
                }}
                data-oid="aw87dhe"
              />
            </div>
            <div className="min-w-0 flex-1" data-oid="grpd5jc">
              <h4
                className="text-sm font-medium text-white truncate"
                data-oid="1g:-ui4"
              >
                {currentTrack.title}
              </h4>
              <p className="text-xs text-gray-300 truncate" data-oid="6ditsb.">
                {Array.isArray(currentTrack.artist)
                  ? currentTrack.artist.map((a) => a.name).join(", ")
                  : typeof currentTrack.artist === "string"
                  ? (currentTrack.artist as string)
                  : ""}
              </p>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex-1 max-w-2xl" data-oid="yr6nen1">
            {/* Control Buttons */}
            <div
              className="flex items-center justify-center space-x-4 mb-2"
              data-oid="e6.pnxt"
            >
              <button
                onClick={handleShuffle}
                className={`p-2 rounded-full transition-colors ${
                  playerState.shuffle
                    ? "text-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}
                disabled={!hasAudioSource}
                title={
                  playerState.shuffle
                    ? "Désactiver le mode aléatoire"
                    : "Activer le mode aléatoire"
                }
                data-oid="fyfhun3"
              >
                <Shuffle className="w-4 h-4" data-oid="7vr1iey" />
              </button>

              <button
                onClick={handlePrevious}
                className="p-2 transition-colors text-gray-300 hover:text-white"
                aria-label="Previous track"
                data-oid="yyq5n9p"
              >
                <SkipBack size={20} data-oid=":jnih:6" />
              </button>

              <button
                onClick={hasAudioSource ? handlePlayPause : undefined}
                className={`p-3 text-white rounded-full transition-colors ${
                  hasAudioSource ? "" : "cursor-not-allowed opacity-50"
                }`}
                style={{
                  backgroundColor: hasAudioSource ? "#fdac0d" : "#6b7280",
                }}
                onMouseEnter={(e) => {
                  if (hasAudioSource) {
                    e.currentTarget.style.backgroundColor = "#e69a0a";
                  }
                }}
                onMouseLeave={(e) => {
                  if (hasAudioSource) {
                    e.currentTarget.style.backgroundColor = "#fdac0d";
                  } else {
                    e.currentTarget.style.backgroundColor = "#6b7280";
                  }
                }}
                disabled={!hasAudioSource}
                aria-label={
                  hasAudioSource
                    ? isPlaying
                      ? "Pause"
                      : "Play"
                    : "Audio not available"
                }
                data-oid="a:ffgoc"
              >
                {hasAudioSource && isPlaying ? (
                  <Pause size={24} data-oid="jkovrbz" />
                ) : (
                  <Play size={24} className="ml-1" data-oid="u62jwg4" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-2 transition-colors text-gray-300 hover:text-white"
                aria-label="Next track"
                data-oid="58szlxh"
              >
                <SkipForward size={20} data-oid="usiq8i5" />
              </button>

              <button
                onClick={handleRepeat}
                className={`p-2 rounded-full transition-colors ${
                  repeat !== "none"
                    ? "text-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}
                disabled={!hasAudioSource}
                title={
                  repeat === "none"
                    ? "Répéter tout"
                    : repeat === "all"
                    ? "Répéter une fois"
                    : "Désactiver la répétition"
                }
                data-oid="ltib11_"
              >
                {repeat === "one" ? (
                  <Repeat1 className="w-4 h-4" data-oid="rlj7598" />
                ) : (
                  <Repeat className="w-4 h-4" data-oid="fkqnu9j" />
                )}
              </button>
            </div>

            {/* Audio availability message */}
            {!hasAudioSource && (
              <div className="text-center mb-2" data-oid="imkla-m">
                <p className="text-xs text-yellow-400" data-oid="t277qhn">
                  Audio non disponible pour cette piste
                </p>
              </div>
            )}

            {/* Progress Bar - Always visible */}
            <div className="mt-4" data-oid="465gs65">
              <div
                className="flex items-center justify-between text-xs text-gray-300 mb-1"
                data-oid="yy:v.-t"
              >
                <span data-oid="igoy-to">
                  {hasAudioSource ? formatTime(currentTime) : "0:00"}
                </span>
                <span data-oid="j68::v3">
                  {hasAudioSource ? formatTime(duration) : "0:00"}
                </span>
              </div>
              <div
                className={`w-full h-2 rounded-full cursor-pointer relative border border-gray-500 ${
                  hasAudioSource ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                style={{
                  height: "8px",
                  backgroundColor: "#4a5568",
                  minHeight: "8px",
                  border: "1px solid #718096",
                }}
                onMouseDown={
                  hasAudioSource ? handleProgressMouseDown : undefined
                }
                onMouseMove={
                  hasAudioSource ? handleProgressMouseMove : undefined
                }
                onMouseUp={hasAudioSource ? handleProgressMouseUp : undefined}
                onMouseLeave={
                  hasAudioSource ? handleProgressMouseUp : undefined
                }
                data-oid="9peh27t"
              >
                <div
                  className="h-full rounded-full transition-all duration-100"
                  style={{
                    width: `${
                      hasAudioSource && duration > 0
                        ? (currentTime / duration) * 100
                        : 0
                    }%`,

                    backgroundColor: hasAudioSource ? "#fdac0d" : "#6b7280",
                    height: "100%",
                    minHeight: "6px",
                  }}
                  data-oid="y:su71h"
                ></div>
              </div>
            </div>
          </div>

          {/* Volume Control */}
          <div
            className="flex items-center space-x-3 flex-1 justify-end"
            data-oid="_4:vg9a"
          >
            <div className="flex items-center space-x-2" data-oid="cxk.47r">
              <button
                onClick={handleMuteToggle}
                className="p-1 text-gray-300 hover:text-white transition-colors"
                title={isMuted ? "Activer le son" : "Couper le son"}
                data-oid="a7i:5jp"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" data-oid="j7i_61m" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-5 h-5" data-oid="u09bq93" />
                ) : (
                  <Volume2 className="w-5 h-5" data-oid="8zaq4_y" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #fdac0d 0%, #fdac0d ${
                    (isMuted ? 0 : volume) * 100
                  }%, #374151 ${(isMuted ? 0 : volume) * 100}%, #374151 100%)`,
                }}
                title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                data-oid="y.e979s"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
