import create from "zustand";

export type Mode = "remove" | "add" | "paint";

interface ModeState {
  mode: Mode;
  setMode: (newMode: Mode) => void;
}

export const useModeStore = create<ModeState>()((set) => ({
  mode: "add",
  setMode: (newMode: Mode) => {
    set(() => ({ mode: newMode }));
  },
}));
