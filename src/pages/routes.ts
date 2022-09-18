import { lazy, LazyExoticComponent } from 'react';

const Feed = lazy(() => import('./Feed'));
const VideoDetail = lazy(() => import('./VideoDetail'));
const ChannelDetail = lazy(() => import('./ChannelDetail'));
const SearchFeed = lazy(() => import('./SearchFeed'));
const FolderTree = lazy(() => import('./folderTree/FolderTree'));
const DnD = lazy(() => import('./DnD/DnD'));
const BaseForm = lazy(() => import('./BaseForm'));
const FormikForm = lazy(() => import('./formik/FormikForm'));

export const routes: {element: LazyExoticComponent<any>, path: string, name: string}[] = [
    {element: Feed, path: '/', name: 'Home'},
    {element: FolderTree, path: '/tree', name: 'Tree'},
    {element: BaseForm, path: '/sign-up', name: 'Sign-Up'},
    {element: FormikForm, path: '/formik', name: 'Formik'},
    {element: DnD, path: '/dnd', name: 'DnD'},
    {element: VideoDetail, path: '/video/:id', name: 'Video'},
    {element: ChannelDetail, path: '/channel/:id', name: 'Channel'},
    {element: SearchFeed, path: '/search/:searchQuery', name: 'Search'},
    {element: Feed, path: '*', name: ''},
]
