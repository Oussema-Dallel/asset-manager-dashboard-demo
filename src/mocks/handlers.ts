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
			name: 'sneaker white',
			thumbnail: sneakerWhite,
		},
		{
			'2d_outputs': [ sneakerWhite, sneakerWhiteSecond, sneakerWhiteThird ],
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			'3d_output': sneakerWhite3d,
			description: 'description',
			assetId: '3',
			inputs: [ sneakerWhite, sneakerWhiteSecond, sneakerWhiteThird ],
			name: 'sneaker white',
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

	http.get<{ assetId: string }, DefaultBodyType, Asset>('/assets/:assetId', async ({ params }) => {
		await delay(3000);

		return HttpResponse.json(data.assets.find((asset) => asset.assetId === params.assetId));
	}),

	http.delete<{ assetId: string }, DefaultBodyType, Asset>('/assets/:assetId', async ({ params }) => {
		data.assets = data.assets.filter((asset) => asset.assetId !== params.assetId);
		await delay(3000);

		return HttpResponse.json(data.assets.find((asset) => asset.assetId === params.assetId));
	}),
	//@ts-expect-error ignore for now
	http.post<PathParams, FormData, { assetId: string; message: string }>('/upload', async ({ request }) => {
		const formData = await request.formData();

		const assetName = formData.get('assetName') as string;
		const assetDescription = formData.get('assetDescription') as string;
		const images = formData.getAll('images');

		if (!assetName) {
			console.error('Asset name is required');

			return new HttpResponse('Asset name is required', { status: 400 });
		}

		if (images.length === 0) {
			return new HttpResponse('At least one image is required', { status: 400 });
		}

		// saves the asset to the database "typically" at least without the outputs for now.
		// especially useful for an editing feature
		data.assets.push({
			/* eslint-disable @typescript-eslint/naming-convention */
			'2d_outputs': [ ],

			'3d_output': '',
			description: assetDescription,
			assetId: '5',
			inputs: [ sneakerWhite, sneakerWhiteSecond, sneakerWhiteThird ],
			name: assetName,
			thumbnail: sneakerWhite,
			/* eslint-enable @typescript-eslint/naming-convention */
		});

		await delay(3000);

		return HttpResponse.json({ message: `Assets Generation for ${assetName} has begun`, assetId: '5' });
	}),

	http.get('/asset-generator-progress', () => {
		const encoder = new TextEncoder();
		const stream = new ReadableStream({
			start (controller): void {
				// Encode the string chunks using "TextEncoder".
				controller.enqueue(encoder.encode('data: processing input\n\n'));
				controller.enqueue(encoder.encode('data: depth classification\n\n'));
				controller.enqueue(encoder.encode('data: generating point clouds\n\n'));
				controller.enqueue(encoder.encode('data: filling gaussians with details\n\n'));
				controller.enqueue(encoder.encode('data: generating 3d model splat\n\n'));
				controller.enqueue(encoder.encode('data: processing output\n\n'));
				controller.enqueue(encoder.encode('data: done\n\n'));
				controller.close();
			},
		});

		const latencyPipeline = new TransformStream({
			start (): void {},
			async transform (chunk, controller): Promise<void> {
				await delay(3000);
				controller.enqueue(chunk);
			},
		});

		// Send the mocked response immediately.
		return new HttpResponse(stream.pipeThrough(latencyPipeline), {
			headers: {
				/* eslint-disable @typescript-eslint/naming-convention */
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				'Connection': 'keep-alive',
				/* eslint-enable @typescript-eslint/naming-convention */
			},
		});
	}),

	http.get<
	{ assetId: string },
	DefaultBodyType,
	Asset
	// @ts-expect-error ignore for now
	>('/assets/output/:assetId', async ({ params }) => {
		const assetToAddOutputFor = data.assets.find((asset) => asset.assetId === params.assetId);

		if (!assetToAddOutputFor) {
			return new HttpResponse('Asset not found', { status: 404 });
		}

		await delay(3000);

		// This would have happened in the background on the server and then the asset is already ready
		return HttpResponse.json({
			...assetToAddOutputFor,
			/* eslint-disable @typescript-eslint/naming-convention */
			'2d_outputs': [ sneakerWhite, sneakerWhiteSecond, sneakerWhiteThird ],
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			'3d_output': sneakerWhite3d,
			/* eslint-enable @typescript-eslint/naming-convention */
		});
	}),
];

export { handlers };