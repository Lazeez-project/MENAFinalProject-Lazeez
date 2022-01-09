import React from 'react';
import '../../App.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CustomTheme from '../../assets/Theme';
import { ThemeProvider } from '@mui/material/styles';
import { NavLink } from "react-router-dom"

const Home = () => { 
    return (
        <ThemeProvider theme={CustomTheme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    height: 'calc(100vh - 80px)',
                    pl: 15,
                    backgroundImage: 'url(Images/Home.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',

                }}>
                <Typography variant='h3' gutterBottom sx={{ color: 'var(--dark-ternary)', fontWeight: 'bold' }}>
                    Lazeez TO Fill Your Billy
                </Typography>
                <Typography variant='h5' gutterBottom sx={{ color: 'var(--ternary)' }}>
                    Choose your favorite Meal from your favorite Restaurant
                </Typography>
                <Button
                    variant='contained'
                >
                    <NavLink className='navLink' to='/Restaurants'>Explore Restaurants</NavLink>
                </Button>
            </Box>
        </ThemeProvider>
    )
}

export default Home
