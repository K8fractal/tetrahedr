import { useState } from "react";
import { RadioSelect } from "./RadioSelect";

interface RadioGroupProps {
  name?: string;
}

export const ToolModeSelector = (props: RadioGroupProps) => {
  const [mode, setMode] = useState("add");

  return (
    <div className="iconBar">
      <div className="radioBar">
        <RadioSelect
          label="Add"
          iconSource="iconAdd.svg"
          group="mode"
          selected={mode == "add"}
          onChange={() => {
            setMode("add");
            console.log(mode);
          }}
        />
        <RadioSelect
          label="Remove"
          iconSource="iconRemove.svg"
          group="mode"
          selected={mode == "remove"}
          onChange={() => {
            setMode("remove");
            console.log(mode);
          }}
        />
      </div>
      <p className="footnote">
        Click on a face to <strong>{mode}</strong> to the structure.
      </p>
    </div>
  );
};
