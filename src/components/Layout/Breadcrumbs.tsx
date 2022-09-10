import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { routes } from '../../pages/routes';

const LinkRouter = ({to, children}: { to: string, children: any }) => {
    return (
        <RouterLink to = {to}>
            <Link component = 'span' className = 'breadcrumb' underline = "hover">
                {children}
            </Link>
        </RouterLink>
    );
};

const Breadcrumb = () => {
    const location = useLocation();
    const [ pathnames, setPathnames ] = useState<string[]>([]);

    useEffect(() => {
        setPathnames(location.pathname.split('/').filter((x) => x));
    }, [ location ]);

    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2}}>
            <Typography variant='subtitle1' sx={{color: 'var(--base-color)'}}>
                Breadcrumbs:
            </Typography>
            <Breadcrumbs aria-label = "breadcrumb">
                {location.pathname === '/' ?
                    <span>
                    Home
                </span>
                    :
                    <LinkRouter to = '/'>
                        Home
                    </LinkRouter>
                }

                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const el = routes.find(route => route.path === to)?.name;

                    return last ? (
                        <Typography sx = {{filter: 'grayscale(0.4)', pointerEvents: 'none', userSelect: 'none'}}
                                    key = {to}>
                            {el}
                        </Typography>
                    ) : (
                        <LinkRouter to = {to} key = {to}>
                            {el}
                        </LinkRouter>
                    );
                })}
            </Breadcrumbs>
        </Box>
    );
};
export default Breadcrumb;
