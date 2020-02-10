import theme from "styled-theming";

theme("mode", {
  dark: {
    primary: "#313131",
    secondary: "#ea8c00"
  },
  light: {
    primary: "#ffffff",
    secondary: "#f8b332"
  }
});

export default {
  colors: {
    primary: "#ea8c00",
    secondary: "#ea8c00",
    background: "#212120",
    foreground: "#313131",
    variants: {
      danger: "Red",
      success: "Green",
      warning: "Yellow"
    }
  }
};
