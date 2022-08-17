import { DefaultTheme } from 'styled-components/native';
import palette from './palette';

const themes: { [key: string]: DefaultTheme } = {
  light: {
    type: 'light',
    radius: 8,
    background: {
      primary: '#FFFFFF',
      secondary: palette.secondary.concrete,
      tertiary: '#cecece',
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
    type: 'dark',
    radius: 8,
    background: {
      primary: palette.secondary.charcoal,
      secondary: '#373737',
      tertiary: '#555555',
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
