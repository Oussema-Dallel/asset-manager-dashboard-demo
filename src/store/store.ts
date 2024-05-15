import { apiSlice } from '../app/slices/apiSlice';
import { configureStore as configureReduxStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import type { TypedUseSelectorHook } from 'react-redux';
import type { PreloadedStateShapeFromReducersMapObject, StoreEnhancer, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Configures the Redux store with the given enhancers and initial state, especially useful for testing.
 * @param storeEnhancers Enhancers to be applied to store creation
 * @param preloadedState Initial state to be applied to store
 * @returns Redux store
 */
const configureStore = (
	storeEnhancers: StoreEnhancer[] = [],
	preloadedState?: PreloadedStateShapeFromReducersMapObject<typeof rootReducer>,
// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
) => configureReduxStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
	enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(storeEnhancers),
	preloadedState,
	devTools: import.meta.env.MODE === 'development',
});

const store = configureStore();

type AppState = ReturnType<typeof store.getState>;
const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

type AppStore = ReturnType<typeof configureStore>;
type GetState = () => AppState;

type AppAction = Parameters<typeof rootReducer>[1];
type AppDispatch = ThunkDispatch<AppState, unknown, AppAction>;
const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type { AppStore, AppState, GetState, AppDispatch };

export { store, configureStore, useAppSelector, useAppDispatch };