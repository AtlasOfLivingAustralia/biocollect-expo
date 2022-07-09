import palette from './palette';

interface ALAThemeColour {
  primary: string;
  secondary: string;
}

import { useColorScheme } from 'react-native';

interface ALATheme {
  background: ALAThemeColour;
  text: ALAThemeColour;
  colour: ALAThemeColour;
}

const themes: { [key: string]: ALATheme } = {
  light: {
    background: {
      primary: '#FFFFFF',
      secondary: palette.secondary.concrete,
    },
    text: {
      primary: palette.secondary.charcoal,
      secondary: palette.primary.grey,
    },
    colour: {
      primary: palette.primary.flamingo,
      secondary: palette.primary.rust,
    },
  },
  dark: {
    background: {
      primary: palette.secondary.charcoal,
      secondary: '#373737',
    },
    text: {
      primary: '#FFFFFF',
      secondary: palette.secondary.silver,
    },
    colour: {
      primary: palette.primary.flamingo,
      secondary: palette.primary.rust,
    },
  },
};

// Helper function for retireving the current theme
const getCurrentTheme = (): ALATheme => themes[useColorScheme()];

export { themes, getCurrentTheme };
