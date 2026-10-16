"use client";

import { useEffect, useReducer } from "react";
import { tracks } from "./data";

type PlayerState = { playing: boolean; track: number; pos: number };
type PlayerAction = "tick" | "toggle" | "next" | "prev";

const initial: PlayerState = { playing: true, track: 3, pos: 133 };

function reducer(s: PlayerState, action: PlayerAction): PlayerState {
  switch (action) {
    case "tick": {
      if (!s.playing) return s;
      const pos = s.pos + 1;
      return pos >= tracks[s.track]!.duration
        ? { ...s, track: (s.track + 1) % tracks.length, pos: 0 }
        : { ...s, pos };
    }
    case "toggle":
      return { ...s, playing: !s.playing };
    case "next":
      return { ...s, track: (s.track + 1) % tracks.length, pos: 0 };
    case "prev":
      // Como nos players de verdade: depois de 3 s, "anterior" volta ao início da faixa.
      return s.pos > 3
        ? { ...s, pos: 0 }
        : { ...s, track: (s.track + tracks.length - 1) % tracks.length, pos: 0 };
  }
}

export function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export function usePlayer() {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    if (!state.playing) return;
    const id = setInterval(() => dispatch("tick"), 1000);
    return () => clearInterval(id);
  }, [state.playing]);

  const track = tracks[state.track]!;
  return {
    ...state,
    track,
    progress: (state.pos / track.duration) * 100,
    position: formatTime(state.pos),
    duration: formatTime(track.duration),
    toggle: () => dispatch("toggle"),
    next: () => dispatch("next"),
    prev: () => dispatch("prev"),
  };
}

export type Player = ReturnType<typeof usePlayer>;
