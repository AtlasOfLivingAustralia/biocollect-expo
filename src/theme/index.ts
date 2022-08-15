import { useColorScheme } from 'react-native';
import { DefaultTheme } from 'styled-components/native';
import palette from './palette';

const themes: { [key: string]: DefaultTheme } = {
  light: {
    radius: 8,
    background: {
      primary: '#FFFFFF',
      secondary: palette.secondary.concrete,
    },
    skeleton: {
      primary: '#f3f3f3',
      secondary: '#ecebeb',
    },
    text: {
      primary: palette.secondary.charcoal,
      secondary: palette.primary.grey,
    },
    colour: {
      primary: palette.primary.flamingo,
      secondary: palette.primary.rust,
    },
    button: {
      primary: palette.primary.flamingo,
      secondary: palette.primary.rust,
    },
  },
  dark: {
    radius: 8,
    background: {
      primary: palette.secondary.charcoal,
      secondary: '#373737',
    },
    skeleton: {
      primary: '#373737',
      secondary: '#646464',
    },
    text: {
      primary: '#FFFFFF',
      secondary: palette.secondary.silver,
    },
    colour: {
      primary: palette.primary.flamingo,
      secondary: palette.primary.rust,
    },
    button: {
      primary: palette.primary.flamingo,
      secondary: palette.primary.rust,
    },
  },
};

export { palette, themes };
