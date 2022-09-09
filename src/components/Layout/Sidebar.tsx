import React, { memo, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { categories } from '../../utils/constants';
import { useActions, useAppSelector } from '../../store/store';
import { videosAPI } from '../../store/services/videoAPIService';

const Sidebar = () => {
    const {selectedCategory} = useAppSelector(state => state.app);
    const {setSelectedCategory} = useActions();

    return (
        <Stack direction = 'row' sx = {{
            overflowY: 'auto',
            height: {sx: 'auto', md: '95%'},
            flexDirection: {md: 'column'},
            pb: '10px',
            width: {xs: '99.9vw', md: 'auto'},
        }}>
            {categories.map(category => (
                <button className = {`category-btn ${category.name === selectedCategory ? 'active-category' : ''}`} key = {category.name} style = {{
                    color: 'white',
                    }}
                        onClick = {() => setSelectedCategory(category.name)}>
                    <span className = 'category-icon' style = {{
                        color: category.name === selectedCategory ? 'white' : 'var(--base-color)',
                        transition: '0.1s all ease-in-out',
                    }}>
                        {<category.icon/>}
                    </span>
                    <span className = 'category-name'>{category.name}
                    </span>
                </button>
            ))}
        </Stack>
    );
};

export default Sidebar;
