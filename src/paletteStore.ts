import { Color } from "react-color";
import create from "zustand";

interface Visual {
  pattern: (
    highlightColor: Color
  ) => (mainColor: Color) => (accentColor: Color) => () => HTMLCanvasElement;
  mainColor: Color;
  accentColor: Color;
}

export type colorPurpose = "MAIN" | "ACCENT" | "HIGHLIGHT";

interface PaletteState {
  palette: Visual[];
  highlightColor: Color;
  getVisual: (index: number) => () => HTMLCanvasElement;
  makeColorSetter: (
    purpose: colorPurpose,
    index?: number
  ) => (color: string) => void;
  addVisual: () => void;
  nextPaletteIndex: (paletteIndex: number) => number;
  //   resetPalette: () => void;
}

export const usePaletteStore = create<PaletteState>()((set, get) => ({
  highlightColor: "#ffcc00",
  palette: [
    { pattern: curriedLinearPattern, mainColor: "blue", accentColor: "red" },
  ],
  getVisual: (index: number) => {
    const visual = get().palette[index];
    return visual.pattern(get().highlightColor)(visual.mainColor)(
      visual.accentColor
    );
  },
  makeColorSetter: (
    purpose: colorPurpose,
    index?: number
  ): ((color: string) => void) => {
    switch (purpose) {
      case "MAIN":
        if (index === undefined) {
          throw new TypeError(`must have an index for "MAIN" purpose`);
        }
        return function (color) {
          set((state) => ({
            palette: replaceInImmutableArray(
              {
                pattern: state.palette[index].pattern,
                mainColor: color,
                accentColor: state.palette[index].accentColor,
              },
              index,
              state.palette
            ),
          }));
        };
      case "ACCENT":
        if (index === undefined) {
          throw new TypeError(`must have an index for "ACCENT" purpose`);
        }
        return function (color) {
          set((state) => ({
            palette: replaceInImmutableArray(
              {
                pattern: state.palette[index].pattern,
                mainColor: state.palette[index].mainColor,
                accentColor: color,
              },
              index,
              state.palette
            ),
          }));
        };
      case "HIGHLIGHT":
        return function (color) {
          set(() => ({ highlightColor: color }));
        };
    }
  },
  addVisual: () => {
    const lastIndex = get().palette.length - 1;
    const newVisual = {
      pattern: get().palette[lastIndex].pattern,
      mainColor: get().palette[lastIndex].accentColor,
      accentColor: get().palette[lastIndex].mainColor,
    };
    set((state) => ({ palette: [...state.palette, newVisual] }));
  },
  nextPaletteIndex: (paletteIndex) => (paletteIndex + 1) % get().palette.length,
}));

function replaceInImmutableArray<T>(
  element: T,
  index: number,
  array: T[]
): T[] {
  return [...array.slice(0, index), element, ...array.slice(index + 1)];
}

function curriedLinearPattern(highlightColor: Color) {
  return (mainColor: Color) => {
    return (accentColor: Color) => {
      return () => {
        return linearPattern(
          highlightColor.toString(),
          mainColor.toString(),
          accentColor.toString()
        );
      };
    };
  };
}

function linearPattern(
  highlightColor: string,
  mainColor: string,
  accentColor: string
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    //const primaryColor = mainColor.getStyle();
    //const secondaryColor = accentColor.getStyle();

    ctx.fillStyle = mainColor;
    ctx.fillRect(0, 0, 1024, 1024);
    ctx.fillStyle = highlightColor;
    ctx.fillRect(0, 800, 1024, 1024);
    const gradient = ctx.createLinearGradient(0, 0, 513, 513);
    gradient.addColorStop(0, accentColor);
    gradient.addColorStop(0.5, mainColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    const vGradient = ctx.createLinearGradient(511, 0, 1024, 0);
    vGradient.addColorStop(0, mainColor);
    vGradient.addColorStop(1, accentColor);
    ctx.fillStyle = vGradient;
    ctx.fillRect(511, 0, 1024, 725);

    // ctx.strokeStyle = mainColor;
    // ctx.lineWidth = 7;
    // ctx.beginPath();
    // ctx.moveTo(512, 0);
    // ctx.lineTo(1024, 362);
    // ctx.lineTo(512, 724);
    // ctx.stroke();
  } else {
    console.log("Couldn't get context");
  }
  return canvas;
}
