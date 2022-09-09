import React from 'react';
import { Box, Typography } from '@mui/material';
import Videos from '../components/Layout/Videos';
import { videosAPI } from '../store/services/videoAPIService';
import { ENDPOINTS } from '../utils/constants';
import { useParams } from 'react-router-dom';

const SearchFeed = () => {

    const {searchQuery} = useParams();
    const {data, isLoading, error} = videosAPI.useFetchQuery(`${ENDPOINTS.SEARCH}?part=snippet&q=${searchQuery}`);

    return (
        <Box p = {2} sx = {{
            overflowY: 'auto',
            height: '90%',
            flex: 2
        }}>
            <Typography fontWeight = 'bold' mb = {2} variant = 'h4' color = 'whitesmoke'>
               Search result for <span className='gradient-text'>{searchQuery}</span> videos
            </Typography>

            <Videos videos = {data?.items || []} isLoading = {isLoading} error = {error}/>
        </Box>
    );
};

export default SearchFeed;
