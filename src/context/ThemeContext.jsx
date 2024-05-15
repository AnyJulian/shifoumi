import { createContext } from "react";

export const ThemeContext = createContext({
  button: {},
  text: {},
});

export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}