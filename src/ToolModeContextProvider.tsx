import { Module } from "module";
import { createContext, ReactNode, useState } from "react";

type Mode = "remove" | "add";

interface ToolMode {
  mode: Mode;
  setMode: (setTo: Mode) => void;
  getMode: () => Mode;
}

export const ToolModeContext = createContext<ToolMode>({
  mode: "add",
  setMode: (setTo: Mode) => {
    return;
  },
  getMode: () => "add",
});

// STUB!
export const ToolModeContextProvider = (props: { children?: ReactNode }) => {
  const [mode, setMode] = useState<Mode>("add");
  const getMode = () => mode;
  const toolMode = { mode, setMode, getMode }; //The types don't seem to line up in my mind here.

  return (
    <ToolModeContext.Provider value={toolMode}>
      {props.children}
    </ToolModeContext.Provider>
  );
};
