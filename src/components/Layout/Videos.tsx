import React from 'react';
import { Box, Stack } from '@mui/material';
import VideoCard from '../Cards/VideoCard';
import ChannelCard from '../Cards/ChannelCard';
import { VideoItem } from '../../models/videoModels';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Videos = ({
                    videos,
                    isLoading,
                    error,
                    direction
                }: { videos: VideoItem[], isLoading: boolean, error: any, direction?: 'row' | 'column' }) => {
    if (isLoading || !videos) return <div>Loading...</div>
    if (error) {
        return <>Error...</>;
    }

    return (
        <Stack className = {`fade`} direction = {`${direction ? direction : 'row'}`} flexWrap = 'wrap'
               justifyContent = 'center' alignItems='start'
               gap = {2}>
            {
                videos.filter(video => !!video.snippet).map((video: VideoItem, idx: number) =>
                    <TransitionGroup component = {null} key = {idx}>
                        <CSSTransition key = {video.id.videoId ? video.id.videoId : video.id.channelId} classNames = "fade" timeout = {150}>
                            {video.id.videoId || video.id.videoId ?<Box sx = {{
                                width: {xs: '100%', sm: '348px', md: "320px"},
                            }} className = 'video-card-container'>
                                {video.id.videoId && <VideoCard video = {video}/>}
                                {video.id.channelId && <ChannelCard border = '2px solid #222' item = {video}/>}
                            </Box> : <></>}
                        </CSSTransition>
                    </TransitionGroup>
                )
            }
        </Stack>
    );
};

export default Videos;
