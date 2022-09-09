import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { Navbar } from './components';
import { routes } from './pages/routes';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Suspense, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DEFAULT_COLOR } from './utils/constants';

function App() {
    const location = useLocation();
    const color = useLocalStorage('color');

    useEffect(() => {
        document.documentElement.style.setProperty('--base-color', color ? color : DEFAULT_COLOR);
    }, []);

    return (
        <Box sx = {{backgroundColor: '#000'}}>
            <Navbar/>
            <TransitionGroup component = {null}>
                <CSSTransition key = {location.key} classNames = "fade" timeout = {300}>
                    <Routes>
                        {
                            routes.map(route =>
                                <Route key = {route.path} element = {
                                    <Suspense fallback = ''>
                                        <route.element/>
                                    </Suspense>} path = {route.path}>
                                </Route>
                            )
                        }
                    </Routes>
                </CSSTransition>
            </TransitionGroup>
        </Box>
    )
}

const Root = () => <BrowserRouter><App/></BrowserRouter>; // prettier-ignore

export default Root
