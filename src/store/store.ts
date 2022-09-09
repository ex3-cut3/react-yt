import { bindActionCreators, combineReducers, configureStore } from '@reduxjs/toolkit';
import { videosAPI } from './services/videoAPIService';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appSlice } from './slices/AppSlice';
import { allActions } from './allActions';

const rootReducer = combineReducers({
    [videosAPI.reducerPath]: videosAPI.reducer,
    app: appSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(videosAPI.middleware)
});

export type RootReducerState = ReturnType<typeof rootReducer>;
export type StoreState = typeof store;
export type StoreDispatch = StoreState['dispatch'];

export const useAppSelector: TypedUseSelectorHook<RootReducerState> = useSelector;
export const useAppDispatch = () => useDispatch<StoreDispatch>();
export const useActions = () => bindActionCreators(allActions, useAppDispatch());
