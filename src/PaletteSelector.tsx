import { useState } from "react";
import { SketchPicker } from "react-color";
import shallow from "zustand/shallow";
import { usePaletteStore } from "./paletteStore";

export const PaletteSelector = () => {
  const [color, setColor] = useState("blue");
  const changeVisualMainColor = usePaletteStore(
    (state) => state.changeVisualMainColor
  );
  const [getVisual, palette, highlightColor] = usePaletteStore(
    (state) => [state.getVisual, state.palette, state.highlightColor],
    shallow
  );
  return (
    <div className="paletteBar">
      <SketchPicker
        disableAlpha={true}
        color={color}
        onChange={(color) => {
          setColor(color.hex);
        }}
        onChangeComplete={(color) => {
          setColor(color.hex);
          changeVisualMainColor(0, color.hex);
        }}
      />
      <img src={getVisual(0)().toDataURL()} />
    </div>
  );
};

//STUB
export {};
