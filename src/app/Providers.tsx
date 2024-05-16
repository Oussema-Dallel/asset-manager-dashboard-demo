import type { CustomTheme } from './theming/theme';
import globalStyles from './theming/globalStyles';
import { Provider } from 'react-redux';
import type { Store } from 'redux';
import { Suspense } from 'react';
import type { BrowserRouterProps, MemoryRouterProps } from 'react-router-dom';
import type { ComponentType, FunctionComponent, ReactNode } from 'react';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';

interface ProvidersProperties {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	readonly Router: ComponentType<BrowserRouterProps | MemoryRouterProps>;
	readonly children: ReactNode;
	readonly store: Store;
	readonly theme: CustomTheme;
}

/**
 * Wraps the application with several providers as needed. e.g. Redux, i18n, etc.
 * @param properties usually referring to elements injected into individual providers.
 * @returns The wrapped application.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
const Providers: FunctionComponent<ProvidersProperties> = ({ store, Router, children, theme }) => {
	return (
		<Suspense fallback={ null }>
			<GlobalStyles styles={ globalStyles } />
			<Provider store={ store }>
				<Router>
					<ThemeProvider theme={ theme }>
						<CssBaseline />
						{ children }
					</ThemeProvider>
				</Router>
			</Provider>
		</Suspense>
	);
};

export { Providers };