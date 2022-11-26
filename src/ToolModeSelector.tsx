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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ToolModeSelector = (props: RadioGroupProps) => {
  //const [mode, setMode] = useState("add");
  const mode = useModeStore((state) => state.mode);
  const setMode = useModeStore((state) => state.setMode);

  return (
    <div className="iconBar">
      <div className="radioBar">
        <RadioSelect
          label="Paint"
          iconSource="iconPaint.svg"
          group="mode"
          // selected={mode == "paint"}
          // onChange={()=>{setMode("paint")}}
        />
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
      <p className="mobileHide">Right click to change style.</p>
      <p className="mobileShow">Press and hold for style</p>
    </div>
  );
};
