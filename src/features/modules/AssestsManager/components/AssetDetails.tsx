import type { AppState } from '../../../../store/store';
import { getAssetById } from '../store/selectors/getAssetById';
import { ImageListing } from './ImageListing';
import { isNil } from '../../../../app/utils/isNil';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Viewer } from '../../../common/ModelViewer/components/Viewer';
import { Container, Grid, Typography } from '@mui/material';
import type { FunctionComponent, ReactElement } from 'react';

const AssetDetails: FunctionComponent = (): ReactElement => {
	const { assetId = '' } = useParams();
	// Ideally we should have an endpoint to fetch the specific asset by id
	// And we should use the useAppSelector hook to get the asset from the store,
	// however, since the typing inference of the RTK query plugin is all over the place,
	// we instead use the default useSelector
	const asset = useSelector((state: AppState) => getAssetById(state, assetId));

	if (isNil(asset)) {
		console.error(`Asset with id ${assetId} not found`);

		return <h1>Asset not found</h1>;
	}

	const { description, inputs, name, '3d_output': output3d } = asset;

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