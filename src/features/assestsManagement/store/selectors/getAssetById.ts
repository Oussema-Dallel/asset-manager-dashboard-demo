import type { AppState } from '../../../../store/store';
import type { Asset } from '../../types/Asset';
import { createSelector } from '@reduxjs/toolkit';

const getAssetById = createSelector(
	[
		(state: AppState): Asset[] => state.assetsManagerSlice.assets
		, (_: AppState, assetId: string): string => assetId,
	],
	(assets, assetId) =>
		assets.find((asset) => asset.assetId === assetId),
);

export { getAssetById };