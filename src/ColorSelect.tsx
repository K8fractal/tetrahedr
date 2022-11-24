import { useState } from "react";
import { Color, SketchPicker } from "react-color";

interface ColorSelectorProps {
  colorEffect: (color: string) => void;
  initialColor: Color;
  rightJustify?: boolean;
}

export const ColorSelect = (props: ColorSelectorProps) => {
  const [color, setColor] = useState(props.initialColor);
  const [show, setShow] = useState(false);
  const justifyStyling = props.rightJustify
    ? { transform: "translateX(-160px)" }
    : {};
  return (
    <div>
      <div
        className="colorSelection"
        style={{ backgroundColor: color.toString() }}
        onClick={() => setShow(!show)}
      ></div>
      {show ? (
        <div className="popoverContainer">
          <div
            style={{
              position: "fixed",
              top: "-200%",
              left: "-100%",
              bottom: "100%",
              width: "100vw",
            }}
            onClick={() => setShow(false)}
          ></div>
          <div style={justifyStyling}>
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
        </div>
      ) : null}
    </div>
  );
};

//stub
export {};
