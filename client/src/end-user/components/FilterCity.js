import React from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
const FilterCity = ({ value, onChange, list }) => {
    let locations = list.map(il => il.location);
    let filteredLocations = [...new Set(locations)];

    return (
        <Autocomplete
            value={value}
            onChange={(e, newValue) => onChange(e, newValue)}
            id="city"
            options={filteredLocations}
            renderInput={(params) => <TextField {...params} label="Select Your City" />}
            sx={{ flex: 1 }}
        />
    );
};
export default FilterCity
