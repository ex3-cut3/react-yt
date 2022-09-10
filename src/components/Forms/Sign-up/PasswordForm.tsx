import React from 'react';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';

const PasswordForm = () => {
    return (
        <Grid container spacing = {3} display='flex'>
            <Grid item xs = {12} sm = {6}>
                <TextField type = 'password' variant = 'outlined'
                           fullWidth autoComplete = "new-password"
                           label = 'Password' name = 'password'
                           required = {true}/>
            </Grid>
            <Grid item xs = {12} sm = {6}>
                <TextField type = 'password' variant = 'outlined'
                           fullWidth autoComplete = "new-password"
                           label = 'Confirm Password' name = 'password'
                           required = {true}/>
            </Grid>
        </Grid>
    );
};

export default PasswordForm;
