import type { Asset } from '../types/Asset';
import axios from 'axios';
import { ContentTypes } from '../../../../app/utils/apiClient/types/ContentTypes';

interface GenerateAssetAsyncRequest {
	assetDescription: string;
	assetName: string;
	readonly images: FileList;
}

interface GenerateAssetAsyncResponse {
	data: {
		assetId: string;
		message: string;
	};
}

const generateAssetAsync = async ({
	images,
	assetDescription,
	assetName,
}: GenerateAssetAsyncRequest): Promise<string> => {
	const formData = new FormData();

	for (const image of images) {
		formData.append('images', image);
	}

	formData.append('assetDescription', assetDescription);
	formData.append('assetName', assetName);

	const response = await axios.post<FormData, GenerateAssetAsyncResponse>('/upload', formData, {
		method: 'POST',
		headers: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'Content-Type': ContentTypes.FORM_DATA,
		},
	});

	return response.data.assetId;
};

const getGeneratedAssets = async (assetId: string): Promise<Asset> => {
	const response = await axios.get<void, { data: Asset }>(`/assets/output/${assetId}`);

	return response.data;
};

export type { GenerateAssetAsyncRequest };
export { generateAssetAsync, getGeneratedAssets };