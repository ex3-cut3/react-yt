import { Box, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { VideoItem } from '../../models/videoModels';
import { demoProfilePicture } from '../../utils/constants';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { formatSubsCount } from '../../utils/helpers';

const ChannelCard = ({item, border, marginTop, clickable = true }: { item: VideoItem, border?: string, marginTop?: string, clickable?: boolean }) => {
    const {snippet: {channelId, channelTitle, thumbnails: {high: {url: urlHigh}}}} = item;
    const totalSubs = parseInt(item?.statistics?.subscriberCount!).toString();
    const formattedSubs = formatSubsCount(totalSubs);
    const navigate = useNavigate();

    function handleCardClick(e: any) {
        clickable ? navigate(`/channel/${channelId ? channelId : item.id}`) : null;
    }

    return (
        <Box sx = {{
            boxShadow: 'none',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: '356px', md: '320px' },
            height: '326px',
            margin: 'auto',
            marginTop,
            border,
        }}>
            <div onClick={handleCardClick}>
                <CardContent sx = {{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <CardMedia image = {urlHigh || demoProfilePicture} sx = {{
                        borderRadius: '50%', height: '180px',
                        width: '180px', mb: 2, border: '6px solid black'
                    }}/>
                    <Typography textAlign='center' variant='h6' color='white'>
                        {channelTitle || item.snippet.title}
                        <CheckCircleIcon sx = {{fontSize: "14px", color: "#b10000", ml: "5px"}}/>
                    </Typography>
                    {item?.statistics?.subscriberCount && (
                        <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
                            {formattedSubs} subscribers
                        </Typography>
                    )}
                </CardContent>
            </div>
        </Box>
    );
};

export default ChannelCard;
