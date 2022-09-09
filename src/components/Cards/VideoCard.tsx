import { VideoItem } from '../../models/videoModels';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
    demoChannelTitle,
    demoChannelUrl,
    demoThumbnailUrl,
    demoVideoTitle,
    demoVideoUrl
} from '../../utils/constants';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { fixSpecialCharsInText } from '../../utils/helpers';


const VideoCard = ({video}: { video: VideoItem }) => {
    const {
        id: {videoId},
        snippet: {title, channelId, channelTitle, thumbnails: {high: {url: urlHigh}}}
    } = video;

    return (
        <Card className = 'video-card'
              sx = {{boxShadow: "none", borderRadius: 0}}>
            <Link to = {videoId ? `/video/${videoId}` : demoVideoUrl}>
                <CardActionArea>
                    <CardMedia component='img' className = 'image-lift' image = {urlHigh || demoThumbnailUrl} sx = {{
                        width: {xs: '100%', sm: '358px', md: "320px",},
                        height: 180
                    }}/>
                </CardActionArea>
            </Link>

            <CardContent sx = {{backgroundColor: "#1E1E1E", height: '108px'}}>
                <Link to = {videoId ? `/video/${videoId}` : demoVideoUrl}>
                    <Typography variant = "subtitle1" fontWeight = "bold" color = "#FFF">
                        {fixSpecialCharsInText(title && title.length >= 60 ? title.slice(0, 60) + '...' : title) || demoVideoTitle.slice(0, 60) + '...'}
                    </Typography>
                </Link>
                <Link to = {channelId ? `/channel/${channelId}` : demoChannelUrl}>
                    <Typography component = 'span' variant = "subtitle2" color = "gray">
                        {channelTitle || demoChannelTitle}
                        <CheckCircleIcon sx = {{fontSize: "12px", color: "#B10000", ml: "5px"}}/>
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    );
};

export default VideoCard;
