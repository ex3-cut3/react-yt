import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { videosAPI } from '../store/services/videoAPIService';
import { Box } from '@mui/material';
import ChannelCard from '../components/Cards/ChannelCard';
import Videos from '../components/Layout/Videos';

const ChannelDetail = () => {
    const {id} = useParams();
    const [ prevId, setPrevId ] = useState('');
    const {data: channelData, isLoading: channelDataLoading, error: channelDataError, refetch: refetchChannelInfo}
        = videosAPI.useFetchQuery(`/channels?part=snippet&id=${id}`);
    const {data: channelVids, isLoading: channelVidsLoading, error: channelVidsError, refetch: refetchChannelVids}
        = videosAPI.useFetchQuery(`/search?channelId=${id}&part=snippet&order=date`);

    useEffect(() => {
            refetchChannelInfo();
            refetchChannelVids();
    }, [ id ]);

    if (channelDataLoading || !channelData || !channelVids) return <h1 style = {{color: 'white'}}>Loading...</h1>
    if (channelDataError || channelVidsError) {
        return <h1 style = {{color: 'white'}}>Error...</h1>;
    }

    return (
        <Box sx = {{
            minHeight: '95vh',
        }}>
            <Box sx = {{
                background: 'linear-gradient(159deg, rgba(131,58,180,1) 0%, rgba(255,53,216,0.9778960412289917) 34%,  var(--base-color) 67%, rgba(252,176,69,1) 100%)',
                height: '300px',
            }}>
            </Box>
            <ChannelCard item = {channelData.items[0]} marginTop = '-110px' clickable={false}></ChannelCard>
            <Box display = 'flex' p = {2}>
                <Videos videos = {channelVids.items} isLoading = {channelVidsLoading} error = {channelVidsError}/>
            </Box>

        </Box>
    );
};

export default ChannelDetail;
