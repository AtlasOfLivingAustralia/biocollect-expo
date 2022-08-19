import { DefaultTheme } from 'styled-components/native';
import palette from './palette';

const themes: { [key: string]: DefaultTheme } = {
  light: {
    type: 'light',
    radius: 12,
    skeleton: '#ecebeb',
    defaults: {
      viewPadding: 20,
    },
    font: {
      header: 'Lato',
      body: 'RobotoRegular',
      button: 'RobotoBold',
      chip: 'RobotoBold',
    },
    background: {
      primary: '#FFFFFF',
      secondary: palette.secondary.concrete,
      tertiary: '#cecece',
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
    chip: {
      primary: palette.extended.paleMoss,
      secondary: palette.extended.plum,
    },
  },
  dark: {
    type: 'dark',
    radius: 12,
    skeleton: '#646464',
    font: {
      header: 'Lato',
      body: 'RobotoRegular',
      button: 'RobotoBold',
      chip: 'RobotoBold',
    },
    defaults: {
      viewPadding: 20,
    },
    background: {
      primary: palette.secondary.charcoal,
      secondary: '#373737',
      tertiary: '#555555',
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
    chip: {
      primary: palette.extended.paleMoss,
      secondary: palette.extended.plum,
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
