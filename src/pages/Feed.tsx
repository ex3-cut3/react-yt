import React, { useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Sidebar from '../components/Layout/Sidebar';
import Videos from '../components/Layout/Videos';
import { useAppSelector } from '../store/store';
import { appSelector } from '../store/slices/AppSlice';
import { videosAPI } from '../store/services/videoAPIService';
import { ENDPOINTS } from '../utils/constants';

const Feed = () => {
    const {selectedCategory} = useAppSelector(appSelector)
    const {data, isLoading, error, refetch} = videosAPI.useFetchQuery(`${ENDPOINTS.SEARCH}?part=snippet&q=${selectedCategory}`);

    useEffect(() => {
        return () => {
            document.title = 'YouTube v2'
        };
    }, []);

    useEffect(() => {
        refetch();
    }, [ selectedCategory ]);


    return (
        <Stack sx = {{flexDirection: {sx: 'column', md: 'row'}}}>
            <Box className = 'category-sidebar' sx = {{
                height: {sx: 'auto', md: '92vh'},
                borderRight: '1px solid #3d3d3d',
                px: {sx: 1, md: 2},
                backgroundImage: 'linear-gradient(to bottom, #111, #000)'
            }}>
                <Sidebar/>
                <Typography className = 'copyright' variant = 'body2' sx = {{
                    mt: 1.5,
                    color: '#FFF',
                    textAlign: 'center',

                }}>Copyright as for ex3-cut3</Typography>
            </Box>

            <Box p = {2} sx = {{
                overflowY: 'auto',
                height: '90%',
                flex: 2
            }}>
                <Typography fontWeight = 'bold' mb = {2} variant = 'h4' color = 'whitesmoke'>
                    {selectedCategory} <span className = 'gradient-text'>videos</span>
                </Typography>

                <Videos videos = {data?.items || []} isLoading = {isLoading} error = {error}/>
            </Box>
        </Stack>
    );
};

export default Feed;
