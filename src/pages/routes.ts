import { lazy, LazyExoticComponent } from 'react';
import BaseForm from './BaseForm';

const Feed = lazy(() => import('./Feed'));
const VideoDetail = lazy(() => import('./VideoDetail'));
const ChannelDetail = lazy(() => import('./ChannelDetail'));
const SearchFeed = lazy(() => import('./SearchFeed'));

export const routes: {element: LazyExoticComponent<any> | (()=>JSX.Element), path: string, name: string}[] = [
    {element: Feed, path: '/', name: 'Home'},
    {element: BaseForm, path: '/sign-up', name: 'Sign-Up'},
    {element: BaseForm, path: '/sign-up/test', name: 'testing'},
    {element: VideoDetail, path: '/video/:id', name: 'Video'},
    {element: ChannelDetail, path: '/channel/:id', name: 'Channel'},
    {element: SearchFeed, path: '/search/:searchQuery', name: 'Search'},
    {element: Feed, path: '*', name: ''},
]
