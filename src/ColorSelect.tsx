import { useState } from "react";
import { Color, SketchPicker } from "react-color";

interface ColorSelectorProps {
  colorEffect: (color: string) => void;
  initialColor: Color;
}

export const ColorSelect = (props: ColorSelectorProps) => {
  const [color, setColor] = useState(props.initialColor);
  const [show, setShow] = useState(false);
  return (
    <div>
      <div
        className="colorSelection"
        style={{ backgroundColor: color.toString() }}
        onClick={() => setShow(!show)}
      ></div>
      {show ? (
        <div className="popoverContainer">
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
              "#FF0000",
              "#FF6600",
              "#FFCC00",
              "#006600",
              "#0000FF",
              "#990099",
              "#000000",
              "#FFFFFF",
            ]}
          />
        </div>
      ) : null}
    </div>
  );
};

//stub
export {};
