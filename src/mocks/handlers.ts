import type { Asset } from '../features/modules/AssestsManager/types/Asset';
import sneakerBlue from '../features/modules/AssestsManager/assets/sneaker_blue.png';
// @ts-expect-error this should work fine as the config is updated to include splat files.
import sneakerBlue3d from '../features/common/ModelViewer/assets/sneaker_blue.splat';
import sneakerBlueSecond from '../features/modules/AssestsManager/assets/sneaker_second_blue.png';
import sneakerBlueThird from '../features/modules/AssestsManager/assets/sneaker_third_blue.png';
import sneakerColored from '../features/modules/AssestsManager/assets/sneaker_colored.png';
// @ts-expect-error this should work fine as the config is updated to include splat files.
import sneakerColored3d from '../features/common/ModelViewer/assets/sneaker_colored.splat';
import sneakerColoredSecond from '../features/modules/AssestsManager/assets/sneaker_second_colored.png';
import sneakerColoredThird from '../features/modules/AssestsManager/assets/sneaker_third_colored.png';
import sneakerWhite from '../features/modules/AssestsManager/assets/sneaker_white.png';
// @ts-expect-error this should work fine as the config is updated to include splat files.
import sneakerWhite3d from '../features/common/ModelViewer/assets/sneaker_white.splat';
import sneakerWhiteSecond from '../features/modules/AssestsManager/assets/sneaker_second_white.jpg';
import sneakerWhiteThird from '../features/modules/AssestsManager/assets/sneaker_third_white.jpeg';
import type { DefaultBodyType, HttpHandler, PathParams } from 'msw';
import { delay, http, HttpResponse } from 'msw';

const data = {
	assets: [
		{
			/* eslint-disable @typescript-eslint/naming-convention */
			'2d_outputs': [ sneakerBlue, sneakerBlueSecond, sneakerBlueThird ],
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			'3d_output': sneakerBlue3d,
			description: 'description',
			assetId: '1',
			inputs: [ sneakerBlue, sneakerBlueSecond, sneakerBlueThird ],
			name: 'sneaker blue',
			thumbnail: sneakerBlue,
		},
		{
			'2d_outputs': [ sneakerWhite, sneakerWhiteSecond, sneakerWhiteThird ],
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			'3d_output': sneakerWhite3d,
			description: 'description',
			assetId: '2',
			inputs: [ sneakerWhite, sneakerWhiteSecond, sneakerWhiteThird ],
			name: 'snaker white',
			thumbnail: sneakerWhite,
		},
		{
			'2d_outputs': [ sneakerWhite, sneakerWhiteSecond, sneakerWhiteThird ],
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			'3d_output': sneakerWhite3d,
			description: 'description',
			assetId: '3',
			inputs: [ sneakerWhite, sneakerWhiteSecond, sneakerWhiteThird ],
			name: 'snaker white',
			thumbnail: sneakerWhite,
		},
		{
			'2d_outputs': [ sneakerColored, sneakerColoredSecond, sneakerColoredThird ],
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			'3d_output': sneakerColored3d,
			description: 'description',
			assetId: '4',
			inputs: [ sneakerColored, sneakerColoredSecond, sneakerColoredThird ],
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

	http.get<PathParams, DefaultBodyType, Asset[]>('/assets', async () => {
		await delay(3000);

		return HttpResponse.json([ ...data.assets ]);
	}),

	http.delete<{ assetId: string }, DefaultBodyType, Asset>('/assets/:assetId', async ({ params }) => {
		data.assets = data.assets.filter((asset) => asset.assetId !== params.assetId);
		await delay(3000);

		return HttpResponse.json(data.assets.find((asset) => asset.assetId === params.assetId));
	}),
];

export { handlers };