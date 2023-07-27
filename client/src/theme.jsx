export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  red: {
    400: "#ffbaba",
    500: "#ff7b7b",
    600: "#ff5252",
    700: "#ff0000",
    800: "#a70000",
  },
};

export const themeSetting = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            background: {
              default: colorTokens.grey[900],
              over: colorTokens.grey[700],
            },
            typography: {
              title: colorTokens.grey[300],
              subtitle: colorTokens.grey[500],
              paragraph: colorTokens.grey[400],
            },
            icon: colorTokens.grey[100],
            logo: {
              normal: colorTokens.red[600],
              hover: colorTokens.red[800],
            },
            button: colorTokens.red[600],
          }
        : {
            // palette values for light mode
            background: {
              default: colorTokens.grey[50],
              over: colorTokens.grey[0],
            },
            typography: {
              title: colorTokens.grey[800],
              subtitle: colorTokens.grey[500],
              paragraph: colorTokens.grey[700],
            },
            icon: colorTokens.grey[600],
            border: colorTokens.grey[200],
            logo: {
              normal: colorTokens.red[600],
              hover: colorTokens.red[800],
            },
            button: colorTokens.red[600],
          }),
    },

    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      //The join(",") method is used to combine the font families into a comma-separated string
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
