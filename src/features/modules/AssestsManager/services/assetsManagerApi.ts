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
		deleteAsset: builder.mutation<DeleteResponse, DeleteAssetRequestBody>({
			query: ({ assetId }) => ({
				url: `assets/${assetId}`,
				method: 'DELETE',
			}),
		}),
	}),
});

const { useDeleteAssetMutation, useGetAssetsQuery } = assetsManagerSlice;

export type { DeleteResponse };

export { useDeleteAssetMutation, useGetAssetsQuery };