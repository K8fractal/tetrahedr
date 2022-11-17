import { useState } from "react";
import { SketchPicker } from "react-color";
import { usePaletteStore } from "./paletteStore";

export const PaletteSelector = () => {
  const [color, setColor] = useState("blue");
  const changeVisual = usePaletteStore((state) => state.changeVisual);
  return (
    <div className="paletteBar">
      <SketchPicker
        color={color}
        onChange={(color) => {
          setColor(color.hex);
        }}
        onChangeComplete={(color) => {
          setColor(color.hex);
          changeVisual(0, color.hex, "red");
        }}
      />
    </div>
  );
};

//STUB
export {};
