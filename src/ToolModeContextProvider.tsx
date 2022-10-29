import { createContext, ReactNode } from "react";

interface ToolMode {
  mode: "remove" | "add";
}

const ToolModeContext = createContext<ToolMode>({ mode: "add" });

// STUB!
export const ToolModeContextProvider = (props: { children?: ReactNode }) => {
  return (
    <ToolModeContext.Provider value={{ mode: "add" }}>
      {props.children}
    </ToolModeContext.Provider>
  );
};
