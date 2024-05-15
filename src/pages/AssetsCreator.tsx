import { AssetGeneratorForm } from '../features/modules/AssetsCreator/components/AssetGeneratorForm';
import type { FunctionComponent, ReactElement } from 'react';

// Here where assets creation/generation happens

const AssetsCreator: FunctionComponent = (): ReactElement => {
	return (
		<>
			<h1>Assets Creator</h1>
			<AssetGeneratorForm />
		</>
	);
};

export { AssetsCreator };