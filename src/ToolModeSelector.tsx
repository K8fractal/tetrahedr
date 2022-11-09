import { Mode, useModeStore } from "./modeStore";
import { RadioSelect } from "./RadioSelect";

interface RadioGroupProps {
  name?: string;
}
const toolTip = (mode: Mode): string => {
  switch (mode) {
    case "add":
      return "Click on face to add.";
    case "remove":
      return "Click to remove.";
    default:
      return "";
  }
};

export const ToolModeSelector = (props: RadioGroupProps) => {
  //const [mode, setMode] = useState("add");
  const mode = useModeStore((state) => state.mode);
  const setMode = useModeStore((state) => state.setMode);

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
          }}
        />
        <RadioSelect
          label="Remove"
          iconSource="iconRemove.svg"
          group="mode"
          selected={mode == "remove"}
          onChange={() => {
            setMode("remove");
          }}
        />
      </div>
      <p>{toolTip(mode)}</p>
    </div>
  );
};
