import 'styled-components/native';

interface ALAThemeColour {
  primary: string;
  secondary: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    radius: number;
    background: ALAThemeColour;
    skeleton: ALAThemeColour;
    text: ALAThemeColour;
    colour: ALAThemeColour;
    button: ALAThemeColour;
  }
}
