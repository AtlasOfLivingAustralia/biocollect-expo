import { DefaultTheme } from 'styled-components/native';
import palette from './palette';

const themes: { [key: string]: DefaultTheme } = {
  light: {
    type: 'light',
    radius: 12,
    font: {
      header: 'Lato',
      body: 'RobotoRegular',
      button: 'RobotoBold',
    },
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
    radius: 12,
    font: {
      header: 'Lato',
      body: 'RobotoRegular',
      button: 'RobotoBold',
    },
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

const hexToRgba = (hex: string, opacity: number): string => {
  var [_, r, g, b] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return `rgba(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(
    b,
    16
  )}, ${opacity})`;
};

export { palette, themes };
