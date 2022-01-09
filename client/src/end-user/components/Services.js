import React from "react";
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
const Services = () => {
    const state = [
        {
            id: 0,
            resid: 1,
            check: false,
        },
        {
            id: 1,
            resid: 1,
            check: true,
        },
        {
            id: 2,
            resid: 1,
            check: true,
        },
        {
            id: 3,
            resid: 1,
            check: true,
        },
        {
            id: 3,
            resid: 1,
            check: true,
        },
        {
            id: 5,
            resid: 1,
            check: true,
        },
    ];
    return (
        <Box
            sx={{
                pt: 6,
            }}
        >
            <Typography variant="h4" gutterBottom >Restaurant Services :</Typography>
            <Box
                sx={{
                    pt: 4,
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: { xs: 'column', md: 'row' }
                }}
            >
                {state[0].check ?
                    <Box sx={service}>
                        <Fab sx={icon}>
                            <FastfoodIcon fontSize="large" />
                        </Fab>
                        <Typography variant="h6" gutterBottom>Fast food</Typography>
                        <Typography variant="body2" gutterBottom>
                            Provides the quickest service and food at the cheapest prices.
                        </Typography>
                    </Box> : null}
                {state[1].check ?
                    <Box sx={service}>
                        <Fab sx={icon}>
                            <DeliveryDiningIcon fontSize="large" />
                        </Fab>
                        <Typography variant="h6" gutterBottom>Fast Delivery</Typography>
                        <Typography variant="body2" gutterBottom>
                            The customer pays an extra shipping cost for this type of delivery.
                        </Typography>
                    </Box> : null}

                {state[2].check ?
                    <Box sx={service}>
                        <Fab sx={icon}>
                            <CoffeeMakerIcon fontSize="large" />
                        </Fab>
                        <Typography variant="h6" gutterBottom>Hot Drinks</Typography>
                        <Typography variant="body2" gutterBottom>
                            Serve hot drinks quickly and simply.
                        </Typography>
                    </Box> : null}
                {state[3].check ?
                    <Box sx={service}>
                        <Fab sx={icon}>
                            <BedroomBabyIcon fontSize="large" />
                        </Fab>
                        <Typography variant="h6" gutterBottom>Children's Playrooms</Typography>
                        <Typography variant="body2" gutterBottom>
                            Designed for the use by children aged from 4 to 9 whose heights are not exceeding 142cm.
                        </Typography>
                    </Box> : null}
                {state[4].check ?
                    <Box sx={service}>
                        <Fab sx={icon}>
                            <FavoriteBorderIcon fontSize="large" />
                        </Fab>
                        <Typography variant="h6" gutterBottom>Healthy Food</Typography>
                        <Typography variant="body2" gutterBottom>
                            Delicious and fully premade healthy food  on a weekly or monthly basis.
                        </Typography>
                    </Box> : null}
                {state[5].check ?
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
        </Box>
    );
};
export default Services
