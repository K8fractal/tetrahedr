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
      presetColors={[
        "#D0021B",
        "#F5A623",
        "#F8E71C",
        "#417505",
        "#0069E8",
        "#9013FE",
        "#000000",
        "#FFFFFF",
      ]}
    />
  );
};

//stub
export {};
