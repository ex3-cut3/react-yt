import React, { lazy, Suspense, useState } from 'react';
import { DEFAULT_CATEGORY, DEFAULT_COLOR, LOGO_IMG_LINK, settings } from '../../utils/constants';
import {
    Avatar,
    Box,
    Divider,
    Fade,
    IconButton,
    Link,
    Menu,
    MenuItem,
    Stack,
    Tooltip,
    Typography
} from '@mui/material';
import { useActions, useAppSelector } from '../../store/store';
import { appSelector } from '../../store/slices/AppSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { DebounceInput } from 'react-debounce-input';
import {
    Link as RouterLink,
} from 'react-router-dom';
import Breadcrumb from './Breadcrumbs';

const Navbar = () => {
    const {setSelectedCategory} = useActions();
    const {selectedCategory} = useAppSelector(appSelector);
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const colorFromLS = useLocalStorage('color');
    const [ color, setColor ] = useState(colorFromLS ? colorFromLS : DEFAULT_COLOR);
    const SearchBar = lazy(() => import('./SearchBar'));
    const [ anchorElUser, setAnchorElUser ] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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
        <Stack p = {2} alignItems = 'center' divider = {<Divider orientation = 'vertical' flexItem/>}
               sx = {{
                   position: 'sticky',
                   zIndex: 2,
                   gap: '8px',
                   backgroundColor: '#111',
                   top: 0,
                   justifyContent: 'space-between',
                   flexDirection: {
                       xs: 'column', md: 'row'
                   }
               }}>

            <div onClick = {handleLogoClick} style = {{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                <img src = {LOGO_IMG_LINK} style = {{height: '40px'}} alt = 'Youtube Logo'/>
            </div>

            <DebounceInput
                type = 'color'
                style = {{
                    backgroundColor: 'black',
                    outline: '2px dashed #444',
                }}
                value = {color!}
                debounceTimeout = {200}
                onChange = {handleColorChange}/>
            <Suspense fallback>
                <SearchBar/>
            </Suspense>

            <Breadcrumb />

            <Box>
                <Tooltip TransitionComponent = {Fade} TransitionProps = {{timeout: 500}} leaveDelay = {200} arrow
                         title = "Open menu">
                    <IconButton onClick = {handleOpenUserMenu} sx = {{p: 0}}>
                        <Avatar alt = "Avatar" src = "/static/images/avatar/2.jpg"/>
                    </IconButton>
                </Tooltip>

                <Menu anchorOrigin = {{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                      sx={{mt: 1.5}}
                      keepMounted
                    // transformOrigin = {{
                    //     vertical: 'center',
                    //     horizontal: 'center',
                    // }}
                      onClose = {handleCloseUserMenu}
                      open = {!!anchorElUser} anchorEl = {anchorElUser}>
                    {settings.map((setting) => (
                        <MenuItem key = {setting} onClick = {handleCloseUserMenu}>
                            <Typography textAlign = "center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Stack>
    );
};

export default Navbar;
