import { AssetPreview } from '../features/assestsManagement/components/AssetPreview';
import { useGetAssetsQuery } from '../features/assestsManagement/services/assetsManagerApi';
import { Container, Grid } from '@mui/material';
import type { FunctionComponent, ReactElement, ReactNode } from 'react';

// here where assets management happens, including searching, filtering and viewing.

const AssetsManager: FunctionComponent = (): ReactElement => {
	const { data, isError, isLoading, isSuccess, error } = useGetAssetsQuery();

	let content: ReactNode = null;

	if (isLoading) {
		content = (
			// TODO: Add Skeleton UI
			<h1>Loading...</h1>
		);
	}

	if (isError) {
		content = (
			<h1>Error: { JSON.stringify(error) }</h1>
		);
	}

	if (isSuccess) {
		content = data.map((asset) => (
			<Grid
				item
				key={ asset.assetId }
				xs={ 3 }
			>
				<AssetPreview
					assetId={ asset.assetId }
					name={ asset.name }
					thumbnail={ asset.thumbnail }
				/>
			</Grid>
		));
	}

	return (
		<Container maxWidth="xl">
			<h1>Assets Manager</h1>
			<Grid
				container
				spacing={ 6 }
			>
				{ content }
			</Grid>
		</Container>
	);
};

export { AssetsManager };