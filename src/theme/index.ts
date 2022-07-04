import palette from "./palette";

interface ALAThemeColour {
	primary: string,
	secondary: string,
}

interface ALATheme {
	background: ALAThemeColour,
	text: ALAThemeColour,
	colour: ALAThemeColour
}

const theme: {[key: string]: ALATheme} = {
	light: {
		background: {
			primary: '#FFFFFF',
			secondary: palette.secondary.concrete,
		},
		text: {
			primary: palette.secondary.charcoal,
			secondary: palette.primary.grey
		},
		colour: {
			primary: palette.primary.flamingo,
			secondary: palette.primary.rust
		}
	},
	dark: {
		background: {
			primary: palette.secondary.charcoal,
			secondary: palette.secondary.charcoal,
		},
		text: {
			primary: '#FFFFFF',
			secondary: palette.secondary.concrete
		},
		colour: {
			primary: palette.primary.flamingo,
			secondary: palette.primary.rust
		}
	}
}

export default theme;