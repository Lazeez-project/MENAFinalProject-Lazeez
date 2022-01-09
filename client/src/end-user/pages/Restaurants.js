import React, { useState, useEffect } from 'react';
import axios from "axios";
import Container from '@mui/material/Container';
import FilterCity from '../components/FilterCity';
import SearchBar from '../components/SearchBar';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';
import CustomTheme from '../../assets/Theme';
import Box from '@mui/material/Box';
import RestaurantCards from '../components/RestaurantCards'
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const Restaurants = () => {
    const [city, setCity] = useState(null);
    const [resName, setresName] = useState(null);
    const [resList, setResList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const handleFilterCity = (e, newValue) => {
        setCity(newValue);
    }
    const handleSearchRestaurant = (e, newValue) => {
        setresName(newValue)
    }
    /*fetch data from back-end here */
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8877/api/restaurants')
            .then((res) => {
                setResList(res.data);
                setLoading(false);
            }).catch((err) => {
                console.log('err', err);
            })
    }, []);


    let restaurants = resList;
    if (city) {
        restaurants = restaurants.filter((res) => res.location.includes(city));
    }
    if (resName) {
        restaurants = restaurants.filter((res) => res.name.includes(resName));
    }
    return (
        <ThemeProvider theme={CustomTheme}>
            <Box sx={{ backgroundColor: 'var(--transparent-secondary)', pt: 5 }}>
                <Container fixed >
                    <Typography variant='h4' gutterBottom>Restaurants: </Typography>

                    <Stack sx={{ pt: 3, pl: 3 }} direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, md: 4, lg: 8 }}>
                        <FilterCity list={resList} onChange={handleFilterCity} value={city} />
                        <SearchBar list={resList} onChange={handleSearchRestaurant} value={resName} />
                    </Stack>
                    {isLoading ?
                        <Grid spacing={{ xs: '0', md: '7' }} container>
                            {Array.from(new Array(3)).map((item, index) => (
                                <Grid item xs={10} md={5} lg={4} key={index}>
                                    <Box sx={{ ml: 3, mt: 3, mb: 2 }}>
                                        <Skeleton variant="rectangular" width={360} height={300} sx={{ borderRadius: 1 }} />
                                        <Box sx={{ pt: 2 }}>
                                            <Skeleton width="80%" />
                                            <Skeleton width="60%" />
                                            <Skeleton width="70%" />
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                        :
                        <RestaurantCards restaurants={restaurants} />
                    }
                </Container>
            </Box>
        </ThemeProvider >
    )
}

export default Restaurants
