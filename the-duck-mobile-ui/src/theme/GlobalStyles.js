// ----------------------------------------------------------------------

import styled from "@emotion/styled";

const GlobalStyles = styled((theme) => ({
  "@global": {
    "*": {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
    },
    html: {
      width: "100%",
      height: "100%",
      "-ms-text-size-adjust": "100%",
      "-webkit-overflow-scrolling": "touch",
    },
    body: {
      width: "100%",
      height: "100%",
    },
    "#root": {
      width: "100%",
      height: "100%",
    },
    input: {
      "&[type=number]": {
        MozAppearance: "textfield",
        "&::-webkit-outer-spin-button": { margin: 0, WebkitAppearance: "none" },
        "&::-webkit-inner-spin-button": { margin: 0, WebkitAppearance: "none" },
      },
    },
    a: { color: "black" },
    img: { display: "block", maxWidth: "100%" },

    // Lazy Load Img
    ".blur-up": {
      WebkitFilter: "blur(5px)",
      filter: "blur(5px)",
      transition: "filter 400ms, -webkit-filter 400ms",
    },
    ".blur-up.lazyloaded ": {
      WebkitFilter: "blur(0)",
      filter: "blur(0)",
    },
  },
}))(() => null);

export default GlobalStyles;
