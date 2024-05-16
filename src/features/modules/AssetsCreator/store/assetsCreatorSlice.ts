import { createSlice } from '@reduxjs/toolkit';
import { generateAsset } from './effects/generateAsset';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AssetsCreatorState {
	readonly error: string;
	readonly generatedAssetId: string;
	readonly inputImages: string[];
	readonly isAssetsGenerationLoading: boolean;
	readonly isImagesUploading: boolean;
	readonly output3dModel: string;
	readonly outputImages: string[];
}

const initialState: AssetsCreatorState = {
	error: '',
	inputImages: [],
	isAssetsGenerationLoading: false,
	isImagesUploading: false,
	outputImages: [],
	output3dModel: '',
	generatedAssetId: '',
};

const assetsCreatorSlice = createSlice({
	name: 'assetsCreator',
	initialState,
	reducers: {
		setInputImages: (state, action: PayloadAction<string[]>) => {
			state.inputImages = action.payload;
		},
		setOutput3dModel: (state, action: PayloadAction<string>) => {
			state.output3dModel = action.payload;
		},
		setOutputImages: (state, action: PayloadAction<string[]>) => {
			state.outputImages = action.payload;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		setIsAssetGenerationLoading: (state, action: PayloadAction<boolean>) => {
			state.isAssetsGenerationLoading = action.payload;
		},
		setGeneratedAssetId: (state, action: PayloadAction<string>) => {
			state.generatedAssetId = action.payload;
		},
		resetState: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(generateAsset.pending, (state) => {
			state.isImagesUploading = true;
		});
		builder.addCase(generateAsset.rejected, (state) => {
			state.isImagesUploading = false;
			state.error = 'Error generating assets';
		});
		builder.addCase(generateAsset.fulfilled, (state) => {
			state.isImagesUploading = false;
			state.isAssetsGenerationLoading = true;
		});
	},
});

const {
	setInputImages,
	setError,
	setOutput3dModel,
	setOutputImages,
	setIsAssetGenerationLoading,
	setGeneratedAssetId,
	resetState,
} = assetsCreatorSlice.actions;
const assetsCreatorReducer = assetsCreatorSlice.reducer;

export {
	setInputImages,
	setError,
	setOutput3dModel,
	setOutputImages,
	setIsAssetGenerationLoading,
	setGeneratedAssetId,
	resetState,
};
export default assetsCreatorReducer;