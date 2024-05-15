import type { Asset } from '../types/Asset';
import axios from 'axios';
import { ContentTypes } from '../../../../app/utils/apiClient/types/ContentTypes';

const uploadInputImages = async (images: FileList) => {
	const formData = new FormData();

	for (const image of images) {
		formData.append('selected-images', image);
	}

	const response = await axios.post('/upload', {
		method: 'POST',
		body: formData,
		headers: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'Content-Type': ContentTypes.FORM_DATA,
		},
	});

	// TODO: type this correctly when the API mock is implemented
	return response.data;
};

const getGeneratedAsset = async (assetId: string): Promise<Asset> => {
	const response = await axios.get<void, { data: Asset }>(`/assets/${assetId}`);

	return response.data;
};

export { uploadInputImages, getGeneratedAsset };