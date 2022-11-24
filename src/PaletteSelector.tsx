import shallow from "zustand/shallow";
import { ColorSelect } from "./ColorSelect";
import { usePaletteStore } from "./paletteStore";

export const PaletteSelector = () => {
  const [
    getVisual,
    palette,
    highlightColor,
    makeColorSetter,
    addVisual,
    switchPattern,
  ] = usePaletteStore(
    (state) => [
      state.getVisual,
      state.palette,
      state.highlightColor,
      state.makeColorSetter,
      state.addVisual,
      state.switchPattern,
    ],
    shallow
  );

  return (
    <div className="paletteBar">
      <div className="visualExtras">
        <button onClick={() => addVisual()}>Add visual</button>
        <ColorSelect
          colorEffect={makeColorSetter("HIGHLIGHT")}
          initialColor={highlightColor}
        />
        <p className="footnote">mouseover</p>
      </div>
      {palette.map((visual, index) => (
        <div className="visualSelector" key={`paletteItem${index}`}>
          <ColorSelect
            colorEffect={makeColorSetter("MAIN", index)}
            initialColor={visual.mainColor}
            rightJustify={true}
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
                onClick={() => {
                  switchPattern(index);
                }}
              />
            }
          </div>
        </div>
      ))}
    </div>
  );
};
