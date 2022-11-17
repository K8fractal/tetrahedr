import { Color } from "react-color";
import create from "zustand";

interface Visual {
  getVisual: () => HTMLCanvasElement;
}

interface PaletteState {
  palette: Visual[];
  highlightColor: Color;
  changeVisual: (
    index: number,
    /*patternKey,*/ mainColor: Color,
    accentColor: Color
  ) => void;
  //   addVisual: (/*patternKey,*/ mainColor: Color, accentColor: Color) => void;
  //   resetPalette: () => void;
  //   setHighlightColor: (highlight: Color) => void;
}
const getLinearVisual = curriedLinearPattern("#ffcc00")("blue")("red");

export const usePaletteStore = create<PaletteState>()((set) => ({
  highlightColor: { r: 255, g: 0xcc, b: 0 },
  palette: [{ getVisual: getLinearVisual }],
  changeVisual: (
    index: number,
    /*patternKey,*/ mainColor: Color,
    accentColor: Color
  ) =>
    set((state) => ({
      palette: replaceInImmutableArray(
        {
          //prettier-ignore
          getVisual: curriedLinearPattern(state.highlightColor)(mainColor)(accentColor),
        },
        index,
        state.palette
      ),
    })),
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
    ctx.fillRect(0, 1020, 10, 1024);
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, accentColor);
    gradient.addColorStop(0.5, mainColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    const vGradient = ctx.createLinearGradient(512, 0, 1024, 0);
    vGradient.addColorStop(0, mainColor);
    vGradient.addColorStop(1, accentColor);
    ctx.fillStyle = vGradient;
    ctx.fillRect(512, 0, 1024, 724);

    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(512, 0);
    ctx.lineTo(1024, 362);
    ctx.lineTo(512, 724);
    ctx.stroke();
  } else {
    console.log("Couldn't get context");
  }
  return canvas;
}
