import { createContext, ReactNode, useState } from "react";

type Mode = "remove" | "add";

interface ToolMode {
  mode: Mode;
}

const ToolModeContext = createContext<ToolMode>({ mode: "add" });

// STUB!
export const ToolModeContextProvider = (props: { children?: ReactNode }) => {
  const [mode, setMode] = useState<Mode>("add");
  const toolMode = { mode, setMode }; //The types don't seem to line up in my mind here.

  return (
    <ToolModeContext.Provider value={toolMode}>
      {props.children}
    </ToolModeContext.Provider>
  );
};
