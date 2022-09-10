import { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { PersonalInfoForm as IPersonalInfoForm } from '../../../models/forms/PersonalInfoForm';

const PersonalInfoForm = () => {
    const [formInputs, setFormInputs] = useState<IPersonalInfoForm>({firstNameError: false, secondNameError: false, cityError: false, countryError: false, ageError: false});

    return (
        <Grid container spacing = {3}>
            <Grid item xs = {12} sm = {6}>
                <TextField type = 'text' variant = 'outlined' helperText = {`${formInputs.firstNameError ? 'Name must be' +
                    ' at least 2 chars long': ''}`} fullWidth = {true} autoComplete="given-name"
                           label = 'First Name' name = 'firstName' error={formInputs.firstNameError} required = {true}/>
            </Grid>
            <Grid item xs = {12} sm = {6}>
                <TextField type = 'text' name = 'secondName' helperText = {`${formInputs.secondNameError ? 'Surname must' +
                    ' be at least 2 chars long': ''}`} required autoComplete="family-name"
                           label = 'Second Name' fullWidth error={formInputs.secondNameError}/>
            </Grid>
            <Grid item xs = {12} sm = {6}>
                <TextField color='primary' type = 'text' name = 'city' required helperText = {`${formInputs.firstNameError ? 'Country must be at least 5 chars long': ''}`}
                           label = 'City' autoComplete='shipping address-level2' fullWidth error={formInputs.countryError}/>
            </Grid>
            <Grid item xs = {12} sm = {6}>
                <TextField type = 'text' name = 'country' required autoComplete="shipping countryError-name" helperText = {`${formInputs.firstNameError ? 'Country must be at least 5 chars long': ''}`}
                           label = 'Country' fullWidth error={formInputs.countryError}/>
            </Grid>
            <Grid item xs = {2} mx='auto'>
                <TextField type = 'number' fullWidth name = 'age' required autoComplete="ageError" helperText = {`${formInputs.firstNameError ? 'Age must be positive integer': ''}`}
                              label = 'Age' error={formInputs.ageError}/>
            </Grid>
        </Grid>
    );
};

export default PersonalInfoForm;
