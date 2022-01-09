import React, { useState, useEffect } from "react";
import CoffeeMakerIcon from "@mui/icons-material/CoffeeMaker";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import BedroomBabyIcon from '@mui/icons-material/BedroomBaby';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Fab from "@mui/material/Fab";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";

const service = {
    flex: 1,
    pb: 4,
    ml: 1,
}
const icon = {
    color: "var(--ternary)",
    backgroundColor: "var(--primary)",
    mb: 1,
    '&:hover': {
        color: 'var(--secondary)',
        backgroundColor: "var(--ternary)"
    }
}
const Services = ({ resid, services, isLoading }) => {

    return (
        <Box
            sx={{
                pt: 6,
            }}
        >
            <Typography variant="h4" gutterBottom >Restaurant Services :</Typography>
            {isLoading ?
                <h1>Loading..</h1>
                :
                <Box
                    sx={{
                        pt: 4,
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', md: 'row' }
                    }}
                >
                    {services[0].checked == 1 ?
                        <Box sx={service}>
                            <Fab sx={icon}>
                                <FastfoodIcon fontSize="large" />
                            </Fab>
                            <Typography variant="h6" gutterBottom>Fast food</Typography>
                            <Typography variant="body2" gutterBottom>
                                Provides the quickest service and food at the cheapest prices.
                            </Typography>
                        </Box> : null}
                    {services[0].checked == 1 ?
                        <Box sx={service}>
                            <Fab sx={icon}>
                                <DeliveryDiningIcon fontSize="large" />
                            </Fab>
                            <Typography variant="h6" gutterBottom>Fast Delivery</Typography>
                            <Typography variant="body2" gutterBottom>
                                The customer pays an extra shipping cost for this type of delivery.
                            </Typography>
                        </Box> : null}

                    {services[2].checked == 1 ?
                        <Box sx={service}>
                            <Fab sx={icon}>
                                <CoffeeMakerIcon fontSize="large" />
                            </Fab>
                            <Typography variant="h6" gutterBottom>Hot Drinks</Typography>
                            <Typography variant="body2" gutterBottom>
                                Serve hot drinks quickly and simply.
                            </Typography>
                        </Box> : null}
                    {services[3].checked == 1 ?
                        <Box sx={service}>
                            <Fab sx={icon}>
                                <BedroomBabyIcon fontSize="large" />
                            </Fab>
                            <Typography variant="h6" gutterBottom>Children's Playrooms</Typography>
                            <Typography variant="body2" gutterBottom>
                                Designed for the use by children aged from 4 to 9 whose heights are not exceeding 142cm.
                            </Typography>
                        </Box> : null}
                    {services[4].checked == 1 ?
                        <Box sx={service}>
                            <Fab sx={icon}>
                                <FavoriteBorderIcon fontSize="large" />
                            </Fab>
                            <Typography variant="h6" gutterBottom>Healthy Food</Typography>
                            <Typography variant="body2" gutterBottom>
                                Delicious and fully premade healthy food  on a weekly or monthly basis.
                            </Typography>
                        </Box> : null}
                    {services[5].checked == 1 ?
                        <Box sx={service}>
                            <Fab sx={icon}>
                                <CreditCardIcon fontSize="large" />
                            </Fab>
                            <Typography variant="h6" gutterBottom>Credit/Debit Card Payment</Typography>
                            <Typography variant="body2" gutterBottom>
                                providing pay through credit/debit card.
                            </Typography>
                        </Box> : null}
                </Box>
            }
        </Box>
    );
};
export default Services
