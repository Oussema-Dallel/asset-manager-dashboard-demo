import { AssetsCreator } from './pages/AssetsCreator';
import { AssetsManager } from './pages/AssetsManager';
import { Layout } from './app/components/Layout';
import type { FunctionComponent, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

const App: FunctionComponent = (): ReactElement => {
	return (
		<Routes>
			<Route
				element={ <Layout /> }
				path='*'
			>
				<Route
					element={ <AssetsCreator /> }
					index
				/>
				<Route
					element={ <AssetsManager /> }
					path='assets-manager'
				/>
			</Route>
		</Routes>
	);
};

export default App;
