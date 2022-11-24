import { Color } from "react-color";
import create from "zustand";

//prettier-ignore
type texturePattern = (highlightColor: Color) => (mainColor: Color) => (accentColor: Color) => 
() => HTMLCanvasElement;

interface Visual {
  patternIndex: number;
  mainColor: Color;
  accentColor: Color;
}

export type colorPurpose = "MAIN" | "ACCENT" | "HIGHLIGHT";

const patterns: texturePattern[] = [helperPattern, curriedLinearPattern];

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
  switchPattern: (index: number) => undefined;
}

export const usePaletteStore = create<PaletteState>()((set, get) => ({
  highlightColor: "#ffcc00",
  palette: [{ patternIndex: 0, mainColor: "blue", accentColor: "red" }],
  getVisual: (index: number) => {
    const visual = get().palette[index];
    return patterns[visual.patternIndex](get().highlightColor)(
      visual.mainColor
    )(visual.accentColor);
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
                patternIndex: state.palette[index].patternIndex,
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
                patternIndex: state.palette[index].patternIndex,
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
      patternIndex: get().palette[lastIndex].patternIndex,
      mainColor: get().palette[lastIndex].accentColor,
      accentColor: get().palette[lastIndex].mainColor,
    };
    set((state) => ({ palette: [...state.palette, newVisual] }));
  },
  nextPaletteIndex: (paletteIndex) => (paletteIndex + 1) % get().palette.length,
  switchPattern: (index) => {
    set((state) => ({
      palette: replaceInImmutableArray(
        {
          patternIndex:
            (state.palette[index].patternIndex + 1) % patterns.length,
          mainColor: state.palette[index].mainColor,
          accentColor: state.palette[index].accentColor,
        },
        index,
        state.palette
      ),
    }));
    return undefined;
  },
}));

function replaceInImmutableArray<T>(
  element: T,
  index: number,
  array: T[]
): T[] {
  return [...array.slice(0, index), element, ...array.slice(index + 1)];
}

function helperPattern(highlightColor: Color) {
  return (mainColor: Color) => {
    return (accentColor: Color) => {
      return (): HTMLCanvasElement => {
        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          mainColor = mainColor.toString();
          highlightColor = highlightColor.toString();
          accentColor = accentColor.toString();
          ctx.fillStyle = mainColor;
          ctx.fillRect(0, 0, 1024, 1024);
          ctx.fillStyle = highlightColor;
          ctx.fillRect(0, 800, 1024, 1024);
          // Boilerplate complete

          // Wireframes
          ctx.strokeStyle = accentColor;
          ctx.lineWidth = 15;
          ctx.beginPath();
          ctx.moveTo(512, 0);
          ctx.lineTo(1024, 362);
          ctx.lineTo(512, 724);
          ctx.lineTo(512, 0);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(512, 724);
          ctx.lineTo(1024, 724);
          ctx.lineTo(1024, 0);
          ctx.lineTo(0, 0);
          ctx.lineTo(0, 512);
          ctx.lineTo(512, 0);
          ctx.stroke();

          //decorations

          ctx.beginPath();
          ctx.moveTo(64, 0);
          ctx.lineTo(0, 64);
          ctx.stroke();

          ctx.fillStyle = accentColor;
          ctx.beginPath();
          ctx.ellipse(512, 362, 71, 71, 0, 0, 2 * Math.PI);
          ctx.ellipse(1024, 724, 71, 71, 0, 0, 2 * Math.PI);
          ctx.fill();

          ctx.beginPath();
          ctx.ellipse(1024, 0, 64, 64, 0, 0, 2 * Math.PI);
          ctx.stroke();
        } else {
          console.log("Couldn't get context");
        }
        return canvas;
      };
    };
  };
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
