import React, { useState, useEffect } from 'react';
import AboutRestaurant from '../components/AboutRestaurant';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CustomTheme from '../../assets/Theme';
import Services from '../components/Services';
import MealCards from '../components/MealCards';
import { useParams } from 'react-router-dom';
import axios from "axios";
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
const RestaurantPage = () => {
    const { resid } = useParams();
    const [resAbout, setResAbout] = useState({});
    const [meals, setMeals] = useState([]);
    const [isResLoading, setResLoading] = useState(true);
    const [isMealLoading, setMealLoading] = useState(true);
    useEffect(() => {
        setResLoading(true);
        axios.get(`http://localhost:8877/api/restaurants/${resid}`)
            .then((res) => {
                setResAbout(res.data[0]);
                setResLoading(false);
            }).catch((err) => {
                console.log('err', err);
            })
    }, [resid]);
    useEffect(() => {
        setMealLoading(true);
        axios.get(`http://localhost:8877/api/restaurants/${resid}/meals`)
            .then((res) => {
                setMeals(res.data);
                setMealLoading(false);
            }).catch((err) => {
                console.log('err', err);
            })
    }, [resid]);

    return (
        <ThemeProvider theme={CustomTheme}>
            <Box sx={{ backgroundColor: 'var(--transparent-secondary)', pt: 5 }}>
                <Container fixed >
                    {isResLoading ?
                        <Box sx={{ ml: '10%', mt: 5 }}>
                            <Skeleton variant="rectangular" width={910} height={418} />
                            <Skeleton variant='text' sx={{ mt: 3 }} width={810} height={50} />
                            <Skeleton variant='text' width={710} height={45} />
                            <Skeleton variant='text' width={610} height={35} />
                            <Skeleton variant='text' width={510} height={30} />

                        </Box>
                        :
                        <AboutRestaurant restaurantData={resAbout} />
                    }
                    <Services />
                    {isMealLoading ?
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
                        <MealCards MealData={meals} resID={resAbout.id}/>
                    }
                </Container>
            </Box>
        </ThemeProvider >
    );
};

export default RestaurantPage;
