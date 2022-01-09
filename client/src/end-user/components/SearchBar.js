import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
const SearchBar = ({ value, onChange, list }) => {
    return (
        <Autocomplete
            id="search-bar"
            value={value}
            onChange={(e, newValue) => onChange(e, newValue)}
            freeSolo
            options={list.map((option) => option.name)}
            renderInput={(params) => <TextField {...params} label="Search for Restaurant" />}
            sx={{ flex: 2 }}
        />
    );
};
export default SearchBar
