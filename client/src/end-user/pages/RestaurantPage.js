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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const RestaurantPage = () => {
    const { resid } = useParams();
    const [resAbout, setResAbout] = useState({});
    const [meals, setMeals] = useState([]);
    const [isResLoading, setResLoading] = useState(true);
    const [isMealLoading, setMealLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [isServicesLoading, setServicesLoading] = useState(true);
    const [isopen, setOpen] = useState(false);

    const vertical = 'top';
    const horizontal = 'center';

    useEffect(() => {
        setServicesLoading(true);
        axios.get(`http://localhost:8877/api/restaurants/${resid}/services`)
            .then((res) => {
                setServices(res.data);
                setServicesLoading(false);
            }).catch((err) => {
                console.log('err', err);
            })
    }, []);
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
                if(res.data.length == 0) {
                    setOpen(true);
                }
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
                    {isServicesLoading || services.length == 0 ? null : <Services resid={resid} isLoading={isServicesLoading} services={services} />}
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
                        meals.length > 0 ? <MealCards MealData={meals} resID={resAbout.id} /> : null
                    }
                </Container>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={isopen}
                onClose={() => setOpen(false)}
                key={'empty'}
                sx={{mt: 7}}
            >
                <Alert severity="warning" sx={{ width: '100%' }}>
                    {"This Restaurant dosn't have meals"}
                </Alert>
            </Snackbar>
        </ThemeProvider >
    );
};

export default RestaurantPage;
