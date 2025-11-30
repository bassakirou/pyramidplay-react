/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-case-declarations */
import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
} from "react";
import type { Music, PlayerState, AudioPlayerContextType } from "../types";
import { useLibrary } from "./LibraryContext";

type PlayerAction =
  | { type: "SET_CURRENT_TRACK"; payload: { track: Music; playlist: Music[] } }
  | { type: "SET_TRACK"; payload: Music }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "SET_TIME"; payload: number }
  | { type: "SET_CURRENT_TIME"; payload: number }
  | { type: "SET_DURATION"; payload: number }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "TOGGLE_MUTE" }
  | { type: "TOGGLE_SHUFFLE" }
  | { type: "TOGGLE_REPEAT" }
  | { type: "NEXT" }
  | { type: "PREVIOUS" }
  | { type: "NEXT_TRACK" }
  | { type: "PREVIOUS_TRACK" }
  | { type: "SET_CURRENT_INDEX"; payload: number }
  | { type: "SET_PLAYLIST"; payload: Music[] };

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  shuffle: false,
  repeat: "none",
  playlist: [],
  currentIndex: -1,
  audioRef: null,
};

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "SET_CURRENT_TRACK":
      const index = action.payload.playlist.findIndex(
        (track) => track.id === action.payload.track.id,
      );
      return {
        ...state,
        currentTrack: action.payload.track,
        playlist: action.payload.playlist,
        currentIndex: index,
        isPlaying: true,
      };
    case "SET_TRACK":
      return {
        ...state,
        currentTrack: action.payload,
        playlist: [action.payload],
        currentIndex: 0,
      };
    case "PLAY": {
      return { ...state, isPlaying: true };
    }
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "SET_CURRENT_TIME": {
      const time = Math.max(0, action.payload);
      return {
        ...state,
        currentTime: time,
      };
    }
    case "SET_DURATION": {
      const duration = Math.max(0, action.payload);
      return {
        ...state,
        duration: duration,
      };
    }
    case "SET_VOLUME": {
      return { ...state, volume: action.payload, isMuted: false };
    }
    case "TOGGLE_MUTE":
      return { ...state, isMuted: !state.isMuted };
    case "TOGGLE_SHUFFLE":
      return { ...state, shuffle: !state.shuffle };
    case "TOGGLE_REPEAT":
      const nextRepeat =
        state.repeat === "none"
          ? "all"
          : state.repeat === "all"
            ? "one"
            : "none";
      return { ...state, repeat: nextRepeat };
    case "NEXT":
      return {
        ...state,
        ...(() => {
          let nextIndex = state.currentIndex + 1;
          if (nextIndex >= state.playlist.length) {
            nextIndex = state.repeat !== "none" ? 0 : state.currentIndex;
          }
          return {
            currentIndex: nextIndex,
            currentTrack: state.playlist[nextIndex] || null,
            isPlaying: nextIndex !== state.currentIndex,
          };
        })(),
      };
    case "PREVIOUS":
      return {
        ...state,
        ...(() => {
          let prevIndex = state.currentIndex - 1;
          if (prevIndex < 0) {
            prevIndex = state.repeat !== "none" ? state.playlist.length - 1 : 0;
          }
          return {
            currentIndex: prevIndex,
            currentTrack: state.playlist[prevIndex] || null,
          };
        })(),
      };
    case "SET_CURRENT_INDEX":
      const newTrack = state.playlist[action.payload];
      return {
        ...state,
        currentIndex: action.payload,
        currentTrack: newTrack || null,
      };
    case "SET_PLAYLIST": {
      const playlist = action.payload || [];
      const idx = state.currentTrack
        ? playlist.findIndex((t) => t.id === state.currentTrack!.id)
        : -1;
      return {
        ...state,
        playlist,
        currentIndex: idx,
      };
    }
    case "NEXT_TRACK": {
      const indices = state.playlist
        .map((t, i) => (t.src !== null ? i : -1))
        .filter((i) => i >= 0);
      if (indices.length === 0) return state;
      if (state.shuffle) {
        const pool = indices.filter((i) => i !== state.currentIndex);
        const choice = (pool.length ? pool : indices)[
          Math.floor(
            Math.random() * (pool.length ? pool.length : indices.length),
          )
        ];

        const t = state.playlist[choice];
        return {
          ...state,
          currentTrack: t || null,
          currentIndex: choice,
          currentTime: 0,
          isPlaying: true,
        };
      }
      let nextIndex = state.currentIndex + 1;
      let attempts = 0;
      const maxAttempts = state.playlist.length;
      while (attempts < maxAttempts) {
        if (nextIndex >= state.playlist.length) {
          if (state.repeat !== "none") nextIndex = 0;
          else return state;
        }
        const nextTrack = state.playlist[nextIndex];
        if (nextTrack && nextTrack.src !== null) {
          return {
            ...state,
            currentTrack: nextTrack,
            currentIndex: nextIndex,
            currentTime: 0,
            isPlaying: true,
          };
        }
        nextIndex++;
        attempts++;
      }
      return state;
    }
    case "PREVIOUS_TRACK": {
      const indices = state.playlist
        .map((t, i) => (t.src !== null ? i : -1))
        .filter((i) => i >= 0);
      if (indices.length === 0) return state;
      if (state.shuffle) {
        const pool = indices.filter((i) => i !== state.currentIndex);
        const choice = (pool.length ? pool : indices)[
          Math.floor(
            Math.random() * (pool.length ? pool.length : indices.length),
          )
        ];

        const t = state.playlist[choice];
        return {
          ...state,
          currentTrack: t || null,
          currentIndex: choice,
          currentTime: 0,
          isPlaying: true,
        };
      }
      let prevIndex = state.currentIndex - 1;
      let attempts = 0;
      const maxAttempts = state.playlist.length;
      while (attempts < maxAttempts) {
        if (prevIndex < 0) {
          if (state.repeat !== "none") prevIndex = state.playlist.length - 1;
          else return state;
        }
        const prevTrack = state.playlist[prevIndex];
        if (prevTrack && prevTrack.src !== null) {
          return {
            ...state,
            currentTrack: prevTrack,
            currentIndex: prevIndex,
            currentTime: 0,
            isPlaying: true,
          };
        }
        prevIndex--;
        attempts++;
      }
      return state;
    }
    default:
      return state;
  }
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined,
);

export function AudioPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [playerState, dispatch] = useReducer(playerReducer, {
    ...initialState,
    audioRef,
  });
  const { recordListen } = useLibrary();

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      dispatch({ type: "SET_TIME", payload: audio.currentTime });
    };

    const handleDurationChange = () => {
      dispatch({ type: "SET_DURATION", payload: audio.duration });
    };

    const handleEnded = () => {
      if (playerState.repeat === "one") {
        audio.currentTime = 0;
        audio.play();
      } else {
        dispatch({ type: "NEXT_TRACK" });
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playerState.repeat, playerState.playlist.length]);

  useEffect(() => {
    const audio = audioRef.current;
    console.log(`[AudioPlayerContext] currentTrack useEffect triggered`);
    console.log(
      `[AudioPlayerContext] currentTrack:`,
      playerState.currentTrack?.title,
    );
    console.log(
      `[AudioPlayerContext] currentTrack src:`,
      playerState.currentTrack?.src,
    );

    if (playerState.currentTrack?.src) {
      const raw = playerState.currentTrack.src;
      const normalized = /^https?:\/\//.test(raw)
        ? raw
        : raw.startsWith("/")
          ? raw
          : `/${raw}`;
      console.log(
        `[AudioPlayerContext] Setting audio src to:`,
        normalized,
      );
      audio.src = normalized;
      if (playerState.isPlaying) {
        console.log(`[AudioPlayerContext] Playing audio`);
        audio.play().catch(console.error);
      }
    } else {
      console.log(`[AudioPlayerContext] No src available for current track`);
    }
  }, [playerState.currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    console.log(
      `[AudioPlayerContext] isPlaying useEffect triggered:`,
      playerState.isPlaying,
    );
    console.log(
      `[AudioPlayerContext] currentTrack:`,
      playerState.currentTrack?.title,
    );

    if (playerState.isPlaying) {
      console.log(`[AudioPlayerContext] Attempting to play audio`);
      audio.play().catch(console.error);
    } else {
      console.log(`[AudioPlayerContext] Pausing audio`);
      audio.pause();
    }
  }, [playerState.isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = playerState.isMuted ? 0 : playerState.volume;
  }, [playerState.volume, playerState.isMuted]);

  const playTrack = (track: Music, playlist: Music[] = [track]) => {
    console.log(`[AudioPlayerContext] playTrack called for:`, track.title);
    console.log(`[AudioPlayerContext] Track src:`, track.src);
    console.log(`[AudioPlayerContext] Playlist length:`, playlist.length);

    // Always set the current track, even if no src is available
    dispatch({ type: "SET_CURRENT_TRACK", payload: { track, playlist } });

    console.log(
      `[AudioPlayerContext] Dispatched SET_CURRENT_TRACK for:`,
      track.title,
    );
    if (track.src) {
      recordListen(track);
    }
  };

  const pauseTrack = () => {
    dispatch({ type: "PAUSE" });
  };

  const resumeTrack = () => {
    dispatch({ type: "PLAY" });
  };

  const nextTrack = () => {
    dispatch({ type: "NEXT_TRACK" });
  };

  const previousTrack = () => {
    dispatch({ type: "PREVIOUS_TRACK" });
  };

  const setVolume = (volume: number) => {
    dispatch({ type: "SET_VOLUME", payload: Math.max(0, Math.min(1, volume)) });
  };

  const toggleMute = () => {
    dispatch({ type: "TOGGLE_MUTE" });
  };

  const toggleShuffle = () => {
    dispatch({ type: "TOGGLE_SHUFFLE" });
  };

  const toggleRepeat = () => {
    dispatch({ type: "TOGGLE_REPEAT" });
  };

  const seekTo = (time: number) => {
    const audio = audioRef.current;
    audio.currentTime = time;
    dispatch({ type: "SET_TIME", payload: time });
  };

  const applyPlaylist = (playlist: Music[]) => {
    dispatch({ type: "SET_PLAYLIST", payload: playlist });
  };

  const contextValue: AudioPlayerContextType = {
    playerState,
    playTrack,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
    seekTo,
    setPlaylist: applyPlaylist,
  };

  return (
    <AudioPlayerContext.Provider value={contextValue} data-oid="3l5ai4l">
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider",
    );
  }
  return context;
}
