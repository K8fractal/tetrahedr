import shallow from "zustand/shallow";
import { ColorSelect } from "./ColorSelect";
import { usePaletteStore } from "./paletteStore";

export const PaletteSelector = () => {
  const [getVisual, palette, highlightColor, makeColorSetter] = usePaletteStore(
    (state) => [
      state.getVisual,
      state.palette,
      state.highlightColor,
      state.makeColorSetter,
    ],
    shallow
  );

  return (
    <div className="paletteBar">
      <ColorSelect
        colorEffect={makeColorSetter("MAIN", 0)}
        initialColor="blue"
      />
      <ColorSelect
        colorEffect={makeColorSetter("ACCENT", 0)}
        initialColor="red"
      />
      <ColorSelect
        colorEffect={makeColorSetter("HIGHLIGHT")}
        initialColor="#ffcc00"
      />
      <ColorSelect
        colorEffect={makeColorSetter("HIGHLIGHT")}
        initialColor="green"
      />
      {/* <img src={getVisual(0)().toDataURL()} /> */}
    </div>
  );
};
