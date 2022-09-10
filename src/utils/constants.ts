import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SchoolIcon from '@mui/icons-material/School';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import { SvgIcon } from '@mui/material';
import PersonalInfoForm from '../components/Forms/Sign-up/PersonalInfoForm';
import PasswordForm from '../components/Forms/Sign-up/PasswordForm';

export const LOGO_IMG_LINK = 'https://i.ibb.co/s9Qys2j/logo.png';
export const DEFAULT_CATEGORY = 'New';
export const DEFAULT_COLOR = '#FF0000';
export enum ENDPOINTS {
    SEARCH = '/search',
}

export const steps = [ 'General info', 'Password'];
export const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
export const signUpForms = [PersonalInfoForm, PasswordForm];

export const categories: { name: string, icon: typeof SvgIcon }[] = [
    {name: DEFAULT_CATEGORY, icon: HomeIcon,},
    {name: 'JS Mastery', icon: CodeIcon,},
    {name: 'Coding', icon: CodeIcon,},
    {name: 'NextJS', icon: CodeIcon,},
    {name: 'Music', icon: MusicNoteIcon},
    {name: 'Education', icon: SchoolIcon,},
    {name: 'Podcast', icon: GraphicEqIcon,},
    {name: 'Movie', icon: OndemandVideoIcon,},
    {name: 'Gaming', icon: SportsEsportsIcon,},
    {name: 'Live', icon: LiveTvIcon,},
    {name: 'Sport', icon: FitnessCenterIcon,},
    {name: 'Fashion', icon: CheckroomIcon,},
    {name: 'Beauty', icon: FaceRetouchingNaturalIcon,},
    {name: 'Comedy', icon: TheaterComedyIcon,},
    {name: 'Gym', icon: FitnessCenterIcon,},
    {name: 'Crypto', icon: DeveloperModeIcon,},
];

export const demoThumbnailUrl = 'https://i.ibb.co/G2L2Gwp/API-Course.png';
export const demoChannelUrl = '/not-found';
export const demoVideoUrl = '/video/GDa8kZLNhJ4';
export const demoChannelTitle = 'Error to fetch channel title...';
export const demoVideoTitle = 'Error to gain video title...';
export const demoProfilePicture = 'https://dergipark.org.tr/assets/app/images/buddy_sample.png'
