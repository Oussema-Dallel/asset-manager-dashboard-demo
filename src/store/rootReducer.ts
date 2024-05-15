import { apiSlice } from '../app/slices/apiSlice';
import assetsManagerSlice from '../features/assestsManagement/store/assetsManagerSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	assetsManagerSlice,
});

export default rootReducer;