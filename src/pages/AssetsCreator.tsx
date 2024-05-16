import { AssetGeneratorForm } from '../features/modules/AssetsCreator/components/AssetGeneratorForm';
import { AssetGeneratorOutput } from '../features/modules/AssetsCreator/components/AssetsGeneratorOutput';
import { Container, Grid } from '@mui/material';
import type { FunctionComponent, ReactElement } from 'react';

// Here where assets creation/generation happens

const AssetsCreator: FunctionComponent = (): ReactElement => {
	return (
		<Container maxWidth="xl">
			<h1>Assets Creator</h1>
			<Grid
				container
				spacing={ 3 }
			>
				<Grid
					item
					xs={ 6 }
				>
					<AssetGeneratorForm />
				</Grid>
				<Grid
					item
					xs={ 6 }
				>
					<AssetGeneratorOutput />
				</Grid>
			</Grid>
		</Container>
	);
};

export { AssetsCreator };