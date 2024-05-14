import App from './App.tsx';
import { Providers } from './app/Providers.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store/store.ts';
import { theme } from './app/theming/theme.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const enableMocking = async (): Promise<ServiceWorkerRegistration | undefined> => {
	if (import.meta.env.MODE !== 'development') {
		return;
	}
	const { worker } = await import('./mocks/browser');

	return await worker.start();
};

// The usage for a top level await is essential here for the mocking to work
await enableMocking();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.querySelector('#root')!).render(
	<React.StrictMode>
		<Providers
			Router={ BrowserRouter }
			store={ store }
			theme={ theme }
		>
			<Routes>
				<Route
					element={ <App /> }
					path='/*'
				/>
			</Routes>
		</Providers>
	</React.StrictMode>,
);

