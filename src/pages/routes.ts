import { lazy, LazyExoticComponent } from 'react';

const Feed = lazy(() => import('./Feed'));
const VideoDetail = lazy(() => import('./VideoDetail'));
const ChannelDetail = lazy(() => import('./ChannelDetail'));
const SearchFeed = lazy(() => import('./SearchFeed'));
export const routes: {element: LazyExoticComponent<any>, path: string}[] = [
    {element: Feed, path: '/'},
    {element: VideoDetail, path: '/video/:id'},
    {element: ChannelDetail, path: '/channel/:id'},
    {element: SearchFeed, path: '/search/:searchQuery'},
]
