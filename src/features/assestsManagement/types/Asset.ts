interface Asset {
	/* eslint-disable @typescript-eslint/naming-convention */
	'2d_outputs': string[];
	'3d_output': string;
	assetId: string;
	description: string;
	inputs: string[];
	name: string;
	thumbnail: string;
	/* eslint-enable @typescript-eslint/naming-convention */
}

export type { Asset };