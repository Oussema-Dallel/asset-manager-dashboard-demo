import { apiSlice } from '../../../app/slices/apiSlice';
import type { Asset } from '../types/Asset';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AssetsManagerState {
	assets: Asset[];
}

const initialState: AssetsManagerState = {
	assets: [],
};

const assetsManagerSlice = createSlice({
	name: 'safsadfsdfsdf',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			// @ts-expect-error More time needs to be spent on this to understand why the type is not being inferred
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			apiSlice.endpoints.getAssets.matchFulfilled,
			(state, action: PayloadAction<Asset[]>) => {
				state.assets = action.payload;
			},
		);
		builder.addMatcher(
			// @ts-expect-error More time needs to be spent on this to understand why the type is not being inferred
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
			apiSlice.endpoints.deleteAsset.matchFulfilled,
			(state, action: PayloadAction<Asset>) => {
				state.assets = state.assets.filter((asset) => asset.assetId !== action.payload.assetId);
			},
		);
	},
});

export default assetsManagerSlice.reducer;