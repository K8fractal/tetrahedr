import { useState } from "react";
import { Color, SketchPicker } from "react-color";

interface ColorSelectorProps {
  colorEffect: (color: string) => void;
  initialColor: Color;
}

export const ColorSelect = (props: ColorSelectorProps) => {
  const [color, setColor] = useState(props.initialColor);
  return (
    <SketchPicker
      disableAlpha={true}
      color={color}
      onChange={(color) => {
        setColor(color.hex);
      }}
      onChangeComplete={(color) => {
        setColor(color.hex);
        props.colorEffect(color.hex);
      }}
    />
  );
};

//stub
export {};
