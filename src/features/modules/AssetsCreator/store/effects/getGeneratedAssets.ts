import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGeneratedAssets } from '../../services/assetsCreatorApi';
import { isNil } from '../../../../../app/utils/isNil';
import type { AppDispatch, AppState } from '../../../../../store/store';
import { setError, setIsAssetGenerationLoading, setOutput3dModel, setOutputImages } from '../assetsCreatorSlice';

const getGeneratedAssetOutput = createAsyncThunk<
void,
void,
{ dispatch: AppDispatch; state: AppState }
>(
	'assetsCreator/getGeneratedAssetOutput',
	async (_, thunkApi): Promise<void> => {
		console.log('getGeneratedAssetOutput');
		const { dispatch, getState } = thunkApi;

		console.log(getState().assetsCreatorSlice);
		const assetId = getState().assetsCreatorSlice.generatedAssetId;

		if (isNil(assetId)) {
			dispatch(setError('No asset id found'));
			throw new Error('No asset id found');
		}

		try {
			const response = await getGeneratedAssets(assetId);

			console.log(response);

			dispatch(setIsAssetGenerationLoading(false));

			dispatch(setOutput3dModel(response['3d_output']));
			dispatch(setOutputImages(response['2d_outputs']));
		} catch {
			dispatch(setError('Error fetching asset output'));
		}
	},
);

export { getGeneratedAssetOutput };