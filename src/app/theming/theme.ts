import { createTheme } from '@mui/material/styles';

type CustomTheme = ReturnType<typeof createTheme>;

const theme = createTheme({
	palette: {
		primary: {
			main: '#13c455',
			dark: '#017929',
			light: '#01d854',
			contrastText: '#171717',
		},
		secondary: {
			main: '#6b6b6b',
			light: '#f0efef',
			dark: '#6b6b6b',
		},
		background: {
			default: '#171717',
			paper: '#212121',
		},
		text:{
			primary: '#f0efef',
			secondary: '#6b6b6b',
			disabled: '#aeaeae',
		},
	},
	components:{
		/* eslint-disable @typescript-eslint/naming-convention */
		MuiButton: {
			defaultProps: {
				disableRipple: true,
			},
			styleOverrides: {
				root: {
					textTransform: 'none',
					':hover': {
						color: '#f0efef',
					},
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: '#171717',
					color: '#f0efef',
				},
			},
		},
		/* eslint-enable @typescript-eslint/naming-convention */
	},
});

export type { CustomTheme };
export { theme };