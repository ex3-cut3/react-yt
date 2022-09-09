import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { options } from '../../utils/fetchAPI';
import { VideosResponse } from '../../models/videoModels';

export const videosAPI = createApi({
    reducerPath: 'videosAPI', // @ts-ignore
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
    tagTypes: [ 'Videos' ],


    endpoints: (build) => ({
        fetch: build.query<VideosResponse, string>({
            query: (endpoint) => ({
                ...options,
                url: endpoint,
            }),
            providesTags: (result, error, arg) =>
                [ 'Videos' ],
        }),
        //                     result
        //                     ? [ ...result.map(({id}: any) => ({type: 'Videos' as const, id})), 'Videos' ]
        //                     : [ 'Videos' ],

        // getPosts: build.query<Post[], void>({
        //     query: () => 'posts',
        //     providesTags: (result) => providesList(result,'Videos'),
        // }),
        // addPost: build.mutation<Post, Partial<Post>>({
        //     query(body) {
        //         return {
        //             url: `post`,
        //             method: 'POST',
        //             body,
        //         }
        //     },
        //     invalidatesTags: [{ type: 'Posts', id: 'LIST' }], // invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
        // }),
        // getPost: build.query<Post, number>({
        //     query: (id) => `post/${id}`,
        //     providesTags: (result, error, id) => [{ type: 'Posts', id }],
        // }),
    })
})

function providesList<R extends { id: string | number }[], T extends string>(resultsWithIds: R | undefined, tagType: T) {
    return resultsWithIds
        ? [
            {type: tagType, id: 'LIST'},
            ...resultsWithIds.map(({id}) => ({type: tagType, id})),
        ]
        : [ {type: tagType, id: 'LIST'} ]
}
