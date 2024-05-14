import { Layout } from './app/components/Layout';
import type { FunctionComponent, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

const App: FunctionComponent = (): ReactElement => {
	return (
		<Routes>
			<Route
				element={ <Layout /> }
				path='/*'
			>
				<Route
					element={ <h1>the homepage</h1> }
					index
				/>
			</Route>
		</Routes>
	);
};

export default App;
