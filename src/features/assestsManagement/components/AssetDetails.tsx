import type { AppState } from '../../../store/store';
import { Container } from '@mui/material';
import { getAssetById } from '../store/selectors/getAssetById';
import { ImageListing } from './ImageListing';
import { isNil } from '../../../app/utils/isNil';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

	const { description, inputs, name } = asset;

	return (
		<Container
			maxWidth="xl"
		>
			<h1>Asset Details: { name }</h1>
			<p>{ description }</p>
			<ImageListing
				assetName={ name }
				colNumer={ 2 }
				images={ inputs }
			/>
		</Container>
	);
};

export { AssetDetails };