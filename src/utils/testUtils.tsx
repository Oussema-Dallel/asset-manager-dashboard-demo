import { afterEach } from 'vitest';
import { configureStore } from '../store/store';
import { MemoryRouter } from 'react-router-dom';
import type { MemoryRouterProps } from 'react-router-dom';
import { Providers } from '../app/Providers';
import type { RenderResult } from '@testing-library/react';
import type { Store } from '@reduxjs/toolkit';
import { storeSpy } from 'expect-redux';
import { cleanup, render } from '@testing-library/react';
import { type CustomTheme, theme } from '../app/theming/theme';
import type { FunctionComponent, ReactElement, ReactNode } from 'react';

afterEach(() => {
	cleanup();
});

interface ProvidersConfigurationsProps {
	readonly initialHistoryEntries?: string[];
	readonly store?: Store;
	readonly theme?: CustomTheme;
}

const customRender = (ui: ReactElement, options = {}): ReturnType<typeof render> => {
	return render(ui, {
		// wrap provider(s) here if needed
		wrapper: ({ children }) => children,
		...options,
	});
};

const renderWithProviders = (
	ui: ReactElement,
	providersConfiguration: ProvidersConfigurationsProps = {},
): RenderResult => {
	const store = providersConfiguration.store ?? configureStore([ storeSpy ]);
	const customtheme = providersConfiguration.theme ?? theme;
	const initialHistoryEntries = providersConfiguration.initialHistoryEntries ?? [ '/' ];
	const Router: FunctionComponent<MemoryRouterProps> = ({ children }) => (
		<MemoryRouter initialEntries={ initialHistoryEntries }>{ children }</MemoryRouter>
	);

	return customRender(ui, {
		wrapper: ({ children }: { children: ReactNode }) => (
			<Providers
				// eslint-disable-next-line react/jsx-no-bind
				Router={ Router }
				store={ store }
				theme={ customtheme }
			>
				{ children }
			</Providers>
		),
	});
};

// eslint-disable-next-line react-refresh/only-export-components, import/export
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
// eslint-disable-next-line import/export
export { customRender as render, renderWithProviders };