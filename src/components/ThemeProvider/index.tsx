import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";

const theme = createTheme({
  palette: {
    primary: { main: "#ff6e14", light: "#fef0e9", dark: "#c0562a" },
    secondary: { main: "#4183d7", light: "#3d6abe", dark: "#1e357d" },
  },
});

const LBCThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default LBCThemeProvider;
