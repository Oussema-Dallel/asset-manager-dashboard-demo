import type { Asset } from '../features/assestsManagement/types/Asset';
import sneakerBlue from '../features/assestsManagement/assets/sneaker_blue.png';
import sneakerColored from '../features/assestsManagement/assets/sneaker_colored.png';
import sneakerWhite from '../features/assestsManagement/assets/sneaker_white.png';
import type { DefaultBodyType, HttpHandler, PathParams } from 'msw';
import { delay, http, HttpResponse } from 'msw';

const data = {
	assets: [
		{
			/* eslint-disable @typescript-eslint/naming-convention */
			'2d_outputs': [ '2d_output_1', '2d_output_2' ],
			'3d_output': [ '3d_output_1', '3d_output_2' ],
			description: 'description',
			assetId: '1',
			inputs: [ 'input_1', 'input_2' ],
			name: 'sneaker blue',
			thumbnail: sneakerBlue,
		},
		{
			'2d_outputs': [ '2d_output_1', '2d_output_2' ],
			'3d_output': [ '3d_output_1', '3d_output_2' ],
			description: 'description',
			assetId: '2',
			inputs: [ 'input_1', 'input_2' ],
			name: 'snaker white',
			thumbnail: sneakerWhite,
		},
		{
			'2d_outputs': [ '2d_output_1', '2d_output_2' ],
			'3d_output': [ '3d_output_1', '3d_output_2' ],
			description: 'description',
			assetId: '3',
			inputs: [ 'input_1', 'input_2' ],
			name: 'snaker white',
			thumbnail: sneakerWhite,
		},
		{
			'2d_outputs': [ '2d_output_1', '2d_output_2' ],
			'3d_output': [ '3d_output_1', '3d_output_2' ],
			description: 'description',
			assetId: '4',
			inputs: [ 'input_1', 'input_2' ],
			name: 'sneaker colored',
			thumbnail: sneakerColored,
			/* eslint-enable @typescript-eslint/naming-convention */
		},
	] as Asset[],
};

const handlers: HttpHandler[] = [
	http.get<PathParams, DefaultBodyType, { message: string }>('/test', async () => {
		await delay(10_000);

		return HttpResponse.json({ message: 'Hello Mocked World!' });
	}),

	http.get<PathParams, DefaultBodyType, Asset[]>('/assets', () => {
		return HttpResponse.json([ ...data.assets ]);
	}),

	http.delete<{ assetId: string }, DefaultBodyType, Asset>('/assets/:assetId', async ({ params }) => {
		data.assets = data.assets.filter((asset) => asset.assetId !== params.assetId);
		await delay(3000);

		return HttpResponse.json(data.assets.find((asset) => asset.assetId === params.assetId));
	}),
];

export { handlers };