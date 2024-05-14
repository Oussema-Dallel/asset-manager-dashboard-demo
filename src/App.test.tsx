import App from './App';
import { configureStore } from './store/store';
import { renderWithProviders } from './utils/testUtils';
import { storeSpy } from 'expect-redux';

describe('<App />', () => {
	it('should render', () => {
		const store = configureStore([ storeSpy ], {});
		const { container } = renderWithProviders(<App />, { store });

		expect(container).toBeInTheDocument();
	});
});