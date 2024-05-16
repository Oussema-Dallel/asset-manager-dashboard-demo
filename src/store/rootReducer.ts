import { apiSlice } from '../app/slices/apiSlice';
import assetsCreatorSlice from '../features/modules/AssetsCreator/store/assetsCreatorSlice';
import assetsManagerSlice from '../features/modules/AssestsManager/store/assetsManagerSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	assetsManagerSlice,
	assetsCreatorSlice,
});

export default rootReducer;