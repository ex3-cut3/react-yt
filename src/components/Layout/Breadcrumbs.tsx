import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { routes } from '../../pages/routes';

const LinkRouter = ({to, children}: { to: string, children: any }) => {
    if (!to) return null
    return (
        <RouterLink to = {to}>
            <Link component = 'span' className = 'breadcrumb' underline = "hover">
                {children}
            </Link>
        </RouterLink>
    );
};

export function findRoutesByPath(paths: string[], idx: number){
    const to = `/${paths.slice(0, idx + 1).join('/')}`;
    return {routeName: routes.find(route => route.path === to)?.name, route: to};
}

const Breadcrumb = () => {
    const location = useLocation();
    const [ pathnames, setPathnames ] = useState<string[]>([]);

    useEffect(() => {
        setPathnames(location.pathname.split('/').filter((x) => x));
    }, [ location ]);

    const filteredPaths = pathnames.filter((value, index) => {
        return findRoutesByPath(pathnames, index).routeName != null;
    });
    console.log(filteredPaths)

    return (
        <Box sx = {{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2}}>
            <Typography variant = 'subtitle1' sx = {{color: 'var(--base-color)'}}>
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

                {filteredPaths.map((value, index) => {
                    const last = index === filteredPaths.length - 1;
                    const {routeName: el, route: to} = findRoutesByPath(pathnames, index);

                    return last ? (
                        <Typography sx = {{filter: 'brightness(0.7)', pointerEvents: 'none', userSelect: 'none'}}
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
