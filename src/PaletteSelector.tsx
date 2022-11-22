import shallow from "zustand/shallow";
import { ColorSelect } from "./ColorSelect";
import { usePaletteStore } from "./paletteStore";

export const PaletteSelector = () => {
  const [getVisual, palette, highlightColor, makeColorSetter, addVisual] =
    usePaletteStore(
      (state) => [
        state.getVisual,
        state.palette,
        state.highlightColor,
        state.makeColorSetter,
        state.addVisual,
      ],
      shallow
    );

  return (
    <div className="paletteBar">
      {palette.map((visual, index) => (
        <div className="visualSelector" key={`paletteItem${index}`}>
          <ColorSelect
            colorEffect={makeColorSetter("MAIN", index)}
            initialColor={visual.mainColor}
          />
          <ColorSelect
            colorEffect={makeColorSetter("ACCENT", index)}
            initialColor={visual.accentColor}
          />
          <div className="preview">
            {
              <img
                src={getVisual(index)().toDataURL()}
                className="previewImage"
              />
            }
          </div>
        </div>
      ))}
      <button onClick={() => addVisual()}>Add visual</button>
      <ColorSelect
        colorEffect={makeColorSetter("HIGHLIGHT")}
        initialColor={highlightColor}
      />
    </div>
  );
};
