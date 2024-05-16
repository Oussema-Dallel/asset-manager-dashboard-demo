import { apiSlice } from '../../../../app/slices/apiSlice';
import type { Asset } from '../types/Asset';

interface DeleteResponse {
	message: string;
}

interface DeleteAssetRequestBody {
	assetId: string;
}

const assetsManagerSlice = apiSlice.enhanceEndpoints({
	addTagTypes: [ 'AssetsManager' ],
}).injectEndpoints({
	endpoints: (builder) => ({
		getAssets: builder.query<Asset[], void>({
			query: () => ({ url: 'assets' }),
			providesTags: [ 'AssetsManager' ],
		}),
		getAssetDetails: builder.query<Asset, string>({
			query: (assetId) => ({ url: `assets/${assetId}` }),
		}),
		deleteAsset: builder.mutation<DeleteResponse, DeleteAssetRequestBody>({
			query: ({ assetId }) => ({
				url: `assets/${assetId}`,
				method: 'DELETE',
			}),
		}),
	}),
});

const { useDeleteAssetMutation, useGetAssetsQuery, useGetAssetDetailsQuery } = assetsManagerSlice;

export type { DeleteResponse };

export { useDeleteAssetMutation, useGetAssetsQuery, useGetAssetDetailsQuery };