export interface VideoItem {
    statistics?: Statistics;
    kind: string,
    id: {
        kind: string,
        videoId?: string,
        channelId?: string,
    },
    snippet: Snippet,
}

export interface Statistics {
    hiddenSubscriberCount: boolean
    subscriberCount: string,
    videoCount: string,
    viewCount: string,
    likeCount?: string,
}

export interface VideosResponse {
    kind: string,
    nextPageToken: string,
    regionCode: string,
    pageInfo: {
        totalResults: number,
        resultsPerPage: number,
    },
    items: VideoItem[]
}

export type Image = { url: string };

export interface Snippet {
    channelId: string,
    channelTitle: string,
    description: string,
    liveBroadcastContent: string,
    publishTime: "2022-02-18T11:45:42Z"
    publishedAt: "2022-02-18T11:45:42Z"
    thumbnails: { default: Image, medium: Image, high: Image }
    title: string,
}
