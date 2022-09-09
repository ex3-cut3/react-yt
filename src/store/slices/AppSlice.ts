import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootReducerState } from '../store';
import { DEFAULT_CATEGORY } from '../../utils/constants';
import { VideoItem } from '../../models/videoModels';

export interface AppState {
    selectedCategory: string,
    videos: VideoItem[],
    searchQuery: string,

}

const initialState: AppState = {
    selectedCategory: DEFAULT_CATEGORY,
    videos: [],
    searchQuery: '',
}

export const appSlice = createSlice({
    initialState,
    name: 'appSlice',
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload;
        },
        setVideos: (state, action: PayloadAction<any[]>) =>{
            state.videos = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) =>{
            state.searchQuery = action.payload;
        }
    }
})

export const appActions = appSlice.actions;
export const appSelector = (state: RootReducerState) => state.app;
