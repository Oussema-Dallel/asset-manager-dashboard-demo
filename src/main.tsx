import App from './App.tsx';
import { Providers } from './app/Providers.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store/store.ts';
import { theme } from './app/theming/theme.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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

