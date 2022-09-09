import axios from 'axios';
import { VideosResponse } from '../models/videoModels';

export const fetchFromAPI = async (endpoint: string) =>{
    try { // @ts-ignore
        const {data} = await axios.get<VideosResponse>(import.meta.env.VITE_BASE_URL + endpoint, options as any)
        return data
    } catch (e) {
        console.log(e);
    }
}

export const options = {
    params: {
        maxResults: '50',
    },
    headers: {// @ts-ignore
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};
