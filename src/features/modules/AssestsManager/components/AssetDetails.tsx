import { ImageListing } from './ImageListing';
import { isNil } from '../../../../app/utils/isNil';
import { useGetAssetDetailsQuery } from '../services/assetsManagerApi';
import { useParams } from 'react-router-dom';
import { Viewer } from '../../../common/ModelViewer/components/Viewer';
import { Container, Grid, Typography } from '@mui/material';
import type { FunctionComponent, ReactElement } from 'react';

const AssetDetails: FunctionComponent = (): ReactElement => {
	const { assetId } = useParams<{ assetId: string }>();

	if (isNil(assetId)) {
		throw new Error('Asset id is required');
	}

	const { data, isLoading, isError, isSuccess } = useGetAssetDetailsQuery(assetId);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	if (isError) {
		return <h1>Error: { JSON.stringify(isError) }</h1>;
	}

	if (!isSuccess || isNil(data)) {
		return <h1>Asset not found</h1>;
	}

	const { description, inputs, name, '3d_output': output3d } = data;

	return (
		<Container
			maxWidth="xl"
			sx={{ marginTop: '2rem' }}
		>
			<Typography variant='h3'>Asset Details: { name }</Typography>
			<Grid
				container
				flexGrow={ 1 }
				justifyContent="stretch"
				spacing={ 2 }
			>
				<Grid
					item
					xs={ 5 }
				>
					<p>{ description }</p>
					<ImageListing
						assetName={ name }
						colNumer={ 2 }
						images={ inputs }
					/>
				</Grid>
				<Grid
					flexGrow={ 1 }
					item
					xs={ 7 }
				>
					<Viewer modelSrc={ output3d } />
				</Grid>
			</Grid>
		</Container>
	);
};

export { AssetDetails };