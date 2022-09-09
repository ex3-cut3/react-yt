import { useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { videosAPI } from '../store/services/videoAPIService';
import { PauseCircleFilledSharp } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Videos from '../components/Layout/Videos';

const VideoDetail = () => {
    const {id} = useParams();
    const {data, isLoading, error, refetch} = videosAPI.useFetchQuery(`videos?part=snippet&id=${id}`);
    const {
        data: relatedVids,
        isLoading: relatedVidsLoading,
        error: relatedVidsError,
        refetch: relatedVidsRefetch
    } = videosAPI.useFetchQuery(`search?part=snippet&relatedToVideoId=${id}&type=video`);

    useEffect(() => {
        refetch();
    }, [ id ]);

    if (isLoading || !data) return <div>Loading...</div>
    if (error) return <div>Error...</div>
    const {snippet: {title, channelId, thumbnails: {default: {url}}, channelTitle}, statistics} = data.items[0];

    return (
        <Box minHeight = '95vh'>
            <Stack direction = {{xs: 'column', md: 'row'}}>
                <Box flex = {1} p={1.5}>
                    <Box sx = {{width: '100%', top: '0', position: 'sticky'}}>
                        <ReactPlayer className = 'react-player' playing controls playIcon = {<PauseCircleFilledSharp/>}
                                     url = {`https://youtube.com/watch?v=${id}`}/>
                        <Typography color = '#fff' variant = 'h5' padding = '10px 15px' fontWeight = 'lighter'>
                            {title}
                        </Typography>

                        <Stack direction = "row" justifyContent = "space-between" sx = {{color: "#FFF"}} py = {1}
                               px = {2}>
                            <Link to = {`/channel/${channelId}`} style = {{
                                display: 'flex',
                                gap: '10px',
                                justifyContent: "center",
                                alignItems: 'center',
                            }}>
                                <img alt = {`Channel ${title}`} src = {url}
                                     style = {{width: '50px', height: '50px', borderRadius: '50%'}}/>
                                <Typography variant = 'h6' color = "#fff">
                                    {channelTitle}
                                    <CheckCircleIcon sx = {{fontSize: "12px", color: "gray", ml: "5px"}}/>
                                </Typography>
                            </Link>
                            <Stack direction = "row" gap = "20px" alignItems = "center">
                                <Typography variant = "body1" sx = {{opacity: 0.8}}>
                                    {parseInt(statistics!.viewCount).toLocaleString()} views
                                </Typography>
                                <Typography variant = "body1" sx = {{opacity: 0.9}}>
                                    {parseInt(statistics!.likeCount!).toLocaleString()} likes
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>

                <Box px = {2} py = {{md: 1, xs: 5}} justifyContent = "center" alignItems = "center">
                    <Videos videos = {(relatedVids && relatedVids.items) || []} isLoading = {relatedVidsLoading} error = {relatedVidsError}
                            direction = "column"/>
                </Box>
            </Stack>
        </Box>
    );
};

export default VideoDetail;
