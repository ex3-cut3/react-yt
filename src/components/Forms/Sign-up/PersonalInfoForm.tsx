import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import useInput from '../../../hooks/useInput';

const PersonalInfoForm = () => {
    const {
        inputData: firstNameData,
        shouldShowError: hasErrorFirstName,
        handleValueBlur: handleFNBlur,
        handleValueChange: handleFNChange,
    } = useInput(firstName => firstName.length >= 3 && /^[a-zA-Z]+$/.test(firstName));
    const {
        inputData: secondNameData,
        shouldShowError: hasErrorSecondName,
        handleValueBlur: handleSNBlur,
        handleValueChange: handleSNChange,
    } = useInput(secondName => secondName.length >= 3 && secondName.match(/\w*/)?.length === 0);

    const {
        inputData: cityData,
        shouldShowError: hasErrorCity,
        handleValueBlur: handleCityBlur,
        handleValueChange: handleCityChange,
    } = useInput(city => city.length >= 3 && city.match(/\w*/)?.length === 0);
    const {
        inputData: countryData,
        shouldShowError: hasErrorCountry,
        handleValueBlur: handleCountryBlur,
        handleValueChange: handleCountryChange,
    } = useInput(country => country.length >= 5 && country.match(/\w*/)?.length === 0);

    const {
        inputData: ageData,
        shouldShowError: hasErrorAge,
        handleValueBlur: handleAgeBlur,
        handleValueChange: handleAgeChange,
    } = useInput(age => age.length >= 3 && +age >= 18);

    return (
        <Grid container spacing = {3}>
            <Grid item xs = {12} sm = {6}>
                <TextField type = 'text' value = {firstNameData.value} onBlur = {handleFNBlur}
                           onChange = {handleFNChange} variant = 'outlined'
                           helperText = {`${hasErrorFirstName ? 'Name must be' +
                               ' at least 3 chars long' : ''}`} fullWidth = {true} autoComplete = "given-name"
                           label = 'First Name' name = 'firstName' error = {hasErrorFirstName}
                           required = {true}/>
            </Grid>
            <Grid item xs = {12} sm = {6}>
                <TextField type = 'text' value = {secondNameData.value} name = 'secondName' onBlur = {handleSNBlur}
                           onChange = {handleSNChange}
                           helperText = {`${hasErrorSecondName ? 'Surname must' +
                               ' be at least 3 chars long' : ''}`} required autoComplete = "family-name"
                           label = 'Second Name' fullWidth error = {hasErrorSecondName}/>
            </Grid>
            <Grid item xs = {12} sm = {6}>
                <TextField color = 'primary' value = {cityData.value} type = 'text' name = 'city' required
                           onBlur = {handleCityBlur}
                           onChange = {handleCityChange}
                           helperText = {`${hasErrorCity ? 'City must be at least 3 chars long' : ''}`}
                           label = 'City' autoComplete = 'shipping address-level2' fullWidth
                           error = {hasErrorCity}/>
            </Grid>
            <Grid item xs = {12} sm = {6}>
                <TextField type = 'text' name = 'country' value = {countryData.value} required
                           autoComplete = "shipping countryError-name"
                           onBlur = {handleCountryBlur} onChange = {handleCountryChange}
                           helperText = {`${hasErrorCountry ? 'Country must be at least 5 chars long' : ''}`}
                           label = 'Country' fullWidth error = {hasErrorCountry}/>
            </Grid>
            <Grid item xs = {2} mx = 'auto'>
                <TextField type = 'number' value = {ageData.value} fullWidth name = 'age' required
                           autoComplete = "ageError"
                           onBlur = {handleAgeBlur} onChange = {handleAgeChange}
                           helperText = {`${hasErrorAge ? 'Age must be above 18 to proceed' : ''}`}
                           label = 'Age' error = {hasErrorAge}/>
            </Grid>
        </Grid>
    );
};

export default PersonalInfoForm;
