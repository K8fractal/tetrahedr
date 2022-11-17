import { useState } from "react";
import { SketchPicker } from "react-color";
import { usePaletteStore } from "./paletteStore";

export const PaletteSelector = () => {
  const [color, setColor] = useState("blue");
  const changeVisualMainColor = usePaletteStore(
    (state) => state.changeVisualMainColor
  );
  return (
    <div className="paletteBar">
      <SketchPicker
        color={color}
        onChange={(color) => {
          setColor(color.hex);
        }}
        onChangeComplete={(color) => {
          setColor(color.hex);
          changeVisualMainColor(0, color.hex);
        }}
      />
    </div>
  );
};

//STUB
export {};
