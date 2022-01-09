import React from 'react'
import RestaurantCard from './RestaurantCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const RestaurantCards = ({ restaurants }) => {
    const cards = restaurants.map(restaurant => (
        <Grid item xs={10} md={5} lg={4} key={restaurant.id}><RestaurantCard res={restaurant} /></Grid>
    ));
    return (
        <Box sx={{
            pt: 3,
        }}>
            <Grid container spacing={{ xs: '0', md: '7' }}>
                {cards}
            </Grid>
        </Box>
    );
};
export default RestaurantCards;
