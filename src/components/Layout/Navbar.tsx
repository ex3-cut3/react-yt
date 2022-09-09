import { lazy, memo, Suspense, useState } from 'react';
import { DEFAULT_CATEGORY, DEFAULT_COLOR, LOGO_IMG_LINK } from '../../utils/constants';
import { Stack } from '@mui/material';
import { useActions, useAppSelector } from '../../store/store';
import { appSelector } from '../../store/slices/AppSlice';
import {  useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useDebounce } from './useDebounce';
import { DebounceInput } from 'react-debounce-input';

const Navbar = () => {
    const {setSelectedCategory} = useActions();
    const {selectedCategory} = useAppSelector(appSelector);
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const colorFromLS = useLocalStorage('color');
    const [ color, setColor ] = useState(colorFromLS ? colorFromLS : DEFAULT_COLOR);
    const SearchBar = lazy(() => import('./SearchBar'));

    function handleLogoClick() {
        if (pathname === '/' && selectedCategory === DEFAULT_CATEGORY) return;
        else {
            setSelectedCategory(DEFAULT_CATEGORY);
            navigate('/');
        }
    }

    function handleColorChange(e: any) {
        const color = e.target.value;
        setColor(color);
        document.documentElement.style.setProperty('--base-color', color);
        localStorage.setItem('color', color);
    }

    return (
        <Stack p = {2} alignItems = 'center'
               sx = {{position: 'sticky', zIndex: 2, gap: '8px', backgroundColor: '#000', top: 0, justifyContent: 'space-between', flexDirection: {
                   xs: 'column', md: 'row'
                   }}}>

            <div onClick = {handleLogoClick} style = {{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                <img src = {LOGO_IMG_LINK} style = {{height: '40px'}} alt = 'Youtube Logo'/>
            </div>
            {/* @ts-ignore */}
            <DebounceInput
                type='color'
                style={{
                    backgroundColor: 'black',
                    outline: '2px dashed #444',
                }}
                value={color!}
                debounceTimeout={200}
                onChange={handleColorChange} />
            <Suspense fallback>
                <SearchBar/>
            </Suspense>
        </Stack>
    );
};

export default Navbar;
