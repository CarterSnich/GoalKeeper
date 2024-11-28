/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const PALETTE = {
  50: "#fafafa",
  100: "#f4f4f5",
  200: "#e4e4e7",
  300: "#d4d4d8",
  400: "#a1a1aa",
  500: "#71717a",
  600: "#52525b",
  700: "#3f3f46",
  800: "#27272a",
  900: "#18181b",
  950: "#09090b",
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
    border: PALETTE[500],
    borderActive: PALETTE[500],
  },
  dark: {
    text: PALETTE[50],
    background: PALETTE[950],
    tint: PALETTE[600],
    icon: PALETTE[500],
    tabIconDefault: PALETTE[500],
    tabIconSelected: PALETTE[400],
    border: PALETTE[500],
    borderActive: PALETTE[100],
  },
};
