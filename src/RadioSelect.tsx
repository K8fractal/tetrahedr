interface RadioProps {
  label: string;
  selected?: boolean;
  onChange?: () => void;
  iconSource: string;
  group: string;
}

export const RadioSelect = (props: RadioProps) => {
  return (
    <div className="iconRadio">
      <label className={props.selected ? "iconSelect" : "iconDeselected"}>
        <input
          type="radio"
          checked={props.selected}
          onChange={props.onChange}
          name={props.group}
        />
        <span className="iconLabel">{props.label}</span>
        <img src={props.iconSource} />
      </label>
    </div>
  );
};
