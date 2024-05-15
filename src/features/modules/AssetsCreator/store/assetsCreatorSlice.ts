import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AssetsCreatorState {
	readonly error: string;
	readonly inputImages: string[];
	readonly isAssetsGenerationLoading: boolean;
	readonly isImagesUploadLoading: boolean;
	readonly output3dModel: string;
	readonly outputImages: string[];
}

const initialState: AssetsCreatorState = {
	error: '',
	inputImages: [],
	isAssetsGenerationLoading: false,
	isImagesUploadLoading: false,
	outputImages: [],
	output3dModel: '',
};

const assetsCreatorSlice = createSlice({
	name: 'assetsCreator',
	initialState,
	reducers: {
		setInputImages: (state, action: PayloadAction<string[]>) => {
			state.inputImages = action.payload;
		},
	},
	extraReducers: (builder) => {
		// TODO: here we will add the reducers for the async actions. This should set the other part of the state
		// like isAssetsGenerationLoading, output3dModel, outputImages, etc.
	},
});

const { setInputImages } = assetsCreatorSlice.actions;
const assetsCreatorReducer = assetsCreatorSlice.reducer;

export { setInputImages };
export default assetsCreatorReducer;