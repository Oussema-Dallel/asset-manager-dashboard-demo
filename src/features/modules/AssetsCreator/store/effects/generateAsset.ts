import type { AppDispatch } from '../../../../../store/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { generateAssetAsync } from '../../services/assetsCreatorApi';
import type { GenerateAssetAsyncRequest } from '../../services/assetsCreatorApi';
import { setError, setGeneratedAssetId } from '../assetsCreatorSlice';

const generateAsset = createAsyncThunk<
void,
GenerateAssetAsyncRequest,
{ dispatch: AppDispatch }
>('assetsCreator/generateAsset', async ({ images, assetDescription, assetName }, thunkApi) => {
	const { dispatch } = thunkApi;

	try {
		const assetId = await generateAssetAsync({ images, assetDescription, assetName });

		console.log(assetId);
		dispatch(setGeneratedAssetId(assetId));
	} catch {
		dispatch(setError('Error generating assets'));
	}
});

export { generateAsset };