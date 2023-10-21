import { ThemeProvider } from "@emotion/react";
import { CssBaseline, GlobalStyles, createTheme } from "@mui/material";
import React from "react";

import typography from "./typography";

function CustomThemeProvider(props) {
  const themeOptions = {
    palette: {
      type: "dark",
      primary: {
        main: "#006451",
      },
      oldPrimary: {
        main: "#42a5f5",
      },
      oldPrimaryDarker: {
        main: "#064374",
      },
      teal: {
        darker: "#033A2A",
        main: "#006451",
        lighter: "#86C8BC",
      },
      green: {
        main: "#EAFFD0",
      },
      peach: {
        main: "#F38181",
      },
      yellow: {
        darker: "#6C5604",
        main: "#FCE38A",
      },
      color1: {
        main: "#C70039",
      },
      color2: {
        darker: "#FF4469",
        main: "#FF6969",
      },
      color3: {
        main: "#FFF5E0",
      },
      color4: {
        main: "#141E46",
      },
      text: {
        teal: "#006451",
        green: "#EAFFD0",
        peach: "#F38181",
        yellow: "#FCE38A",
        oldPrimary: "#42a5f5",
        color1: "#C70039",
        color2: "#FF6969",
        color3: "#FFF5E0",
        color4: "#141E46",
        primary: "#000",
      },
    },
    typography: {
      color: "red",
      ...typography,
    },
  };

  let theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

export default CustomThemeProvider;
