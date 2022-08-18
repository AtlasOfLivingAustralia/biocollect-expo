import 'styled-components/native';

interface ALAThemeColour {
  primary: string;
  secondary: string;
  tertiary?: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    type: 'light' | 'dark';
    radius: number;
    skeleton: string;
    font: {
      header: string;
      body: string;
      button: string;
    };
    background: ALAThemeColour;
    text: ALAThemeColour;
    colour: ALAThemeColour;
    button: ALAThemeColour;
  }
}
