import { ChangeEvent, FormEvent, memo, useState } from 'react';
import { IconButton, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useActions, useAppSelector } from '../../store/store';
import { appSelector } from '../../store/slices/AppSlice';
import { useNavigate } from 'react-router-dom';

const SearchBtnIcon = memo(() => {
    return <IconButton type = 'submit' sx = {{p: '10px', color: 'violet'}}>
        <Search/>
    </IconButton>
})

const SearchBar = () => {
    const {searchQuery} = useAppSelector(appSelector);
    const navigate = useNavigate();
    const {setSearchQuery} = useActions();
    const [ localSearchQuery, setLocalSearchQuery ] = useState(searchQuery);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (localSearchQuery) {
            setSearchQuery(localSearchQuery);
            navigate('/search/' + localSearchQuery)
        }
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setLocalSearchQuery(e.target.value)
    }

    return (
        <Paper component = 'form'
               onSubmit = {(e) => handleSubmit(e)}
               sx = {{
                   backgroundColor: '#444',
                   borderRadius: 20,
                   border: '1px solid #666',
                   pl: 2,
                   boxShadow: 'none',
                   mr: {sm: 5},
               }}
        >
            <input className = 'search-bar' placeholder = 'Search...' value = {localSearchQuery}
                   onChange = {(e) => handleInputChange(e)}/>
            <SearchBtnIcon/>
        </Paper>
    );
};

export default SearchBar;
