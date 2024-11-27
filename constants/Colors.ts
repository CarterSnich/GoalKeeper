/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const PALETTE = {
  50: "#eff4fe",
  100: "#e3eafc",
  200: "#ccd9f9",
  300: "#b6c7f6",
  400: "#8b9dee",
  500: "#6f7ce5",
  600: "#5357d8",
  700: "#4446be",
  800: "#3a3e99",
  900: "#35397a",
  950: "#1f2147",
};

export const Colors = {
  ...PALETTE,
  light: {
    text: PALETTE[950],
    background: PALETTE[50],
    tint: PALETTE[400],
    icon: PALETTE[500],
    tabIconDefault: PALETTE[500],
    tabIconSelected: PALETTE[700],
  },
  dark: {
    text: PALETTE[50],
    background: PALETTE[950],
    tint: PALETTE[600],
    icon: PALETTE[500],
    tabIconDefault: PALETTE[500],
    tabIconSelected: PALETTE[400],
  },
};
