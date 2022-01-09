import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { useParams } from "react-router";
import axios from 'axios';
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CoffeeMakerIcon from "@mui/icons-material/CoffeeMaker";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import BedroomBabyIcon from '@mui/icons-material/BedroomBaby';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Fab from "@mui/material/Fab";
import CustomTheme from '../../assets/Theme';
import { ThemeProvider } from '@mui/styles';
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const icon = {
    mb: 1,
}

function ServicesPage() {
    const { id } = useParams()

    const [services, setServices] = useState([
        { id: 0, resid: id, checked: false },
        { id: 1, resid: id, checked: false },
        { id: 2, resid: id, checked: false },
        { id: 3, resid: id, checked: false },
        { id: 4, resid: id, checked: false },
        { id: 5, resid: id, checked: false },
    ])


    const [alert, setAlert] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8877/api/restaurantowner/restaurant/${id}/services`)
            .then(response => {
                if (response.data.length > 0) {
                    console.log(response.data);
                    setServices(response.data)
                }
            })
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const sendData = () => {
        console.log(services);
        axios({
            method: 'post',
            url: `http://localhost:8877/api/restaurantowner/restaurant/${id}/services`,
            data: services
        })
            .then(response => {
                setAlert(<Alert variant='filled' severity="success">Services Added</Alert>)
                setOpen(true)
            })
            .catch(err => {
                setOpen(true)
                setAlert(<Alert onClose={handleClose} variant='filled' severity="warning">Oops, Somthing happend! Please Try Again</Alert>)
            })
    }

    const handelService = (e) => {
        setServices(services.map(serv => {
            if (serv.id == e.target.id) {
                if (serv.checked) {
                    return { id: serv.id, resid: id, checked: false }
                }
                else {
                    return { id: serv.id, resid: id, checked: true }
                }
            }
            return serv
        }))
    }

    return (
        <ThemeProvider theme={CustomTheme}>
            <Box sx={{ minHeight: '100vh', padding: '50px' }} >
                <Snackbar
                    autoHideDuration={6000}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    message="The Username or Password is not exist"
                    key={'top' + 'center'}
                >
                    {alert}
                </Snackbar>
                <Box sx={{ display: 'flex', marginBottom: '50px' }}>
                    <Box sx={{ marginRight: '20px' }}>
                        <Checkbox id="0" checked={services[0].checked} onChange={handelService} />
                    </Box>
                    <Box>
                        <Fab>
                            <FastfoodIcon fontSize="large" sx={{ color: "var(--primary)", '&:hover': { color: 'var(--secondary)' } }} />
                        </Fab>
                        <Typography variant="h4" marginBottom="10px" component="div">Fast Food</Typography>
                        <Typography>
                            Provides the quickest service and food at the cheapest prices.
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '50px' }}>
                    <Box sx={{ marginRight: '20px' }}>
                        <Checkbox id="1" checked={services[1].checked} onChange={handelService} />
                    </Box>
                    <Box>
                        <Fab sx={icon}>
                            <DeliveryDiningIcon fontSize="large" sx={{ color: "var(--primary)", '&:hover': { color: 'var(--secondary)' } }} />
                        </Fab>
                        <Typography variant="h4" marginBottom="10px" component="div">Fast Delivery</Typography>
                        <Typography>The customer pays an extra shipping cost for this type of delivery.</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '50px' }}>
                    <Box sx={{ marginRight: '20px' }}>
                        <Checkbox id="2" checked={services[2].checked} onChange={handelService} />
                    </Box>
                    <Box>
                        <Fab sx={icon}>
                            <CoffeeMakerIcon fontSize="large" sx={{ color: "var(--primary)", '&:hover': { color: 'var(--secondary)' } }} />
                        </Fab>
                        <Typography variant="h4" marginBottom="10px" component="div">Hot Drinks</Typography>
                        <Typography>Serve hot drinks quickly and simply.</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '50px' }}>
                    <Box sx={{ marginRight: '20px' }}>
                        <Checkbox id="3" checked={services[3].checked} onChange={handelService} />
                    </Box>
                    <Box>
                        <Fab sx={icon}>
                            <BedroomBabyIcon fontSize="large" sx={{ color: "var(--primary)", '&:hover': { color: 'var(--secondary)' } }} />
                        </Fab>
                        <Typography variant="h4" marginBottom="10px" component="div">Children's Playrooms</Typography>
                        <Typography>Designed for the use by children aged from 4 to 9 whose heights are not exceeding 142cm.</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '50px' }}>
                    <Box sx={{ marginRight: '20px' }}>
                        <Checkbox id="4" checked={services[4].checked} onChange={handelService} />
                    </Box>
                    <Box>
                        <Fab sx={icon}>
                            <FavoriteBorderIcon fontSize="large" sx={{ color: "var(--primary)", '&:hover': { color: 'var(--secondary)' } }} />
                        </Fab>
                        <Typography variant="h4" marginBottom="10px" component="div">Healthy Food</Typography>
                        <Typography>Delicious and fully premade healthy food  on a weekly or monthly basis.</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '50px' }}>
                    <Box sx={{ marginRight: '20px' }}>
                        <Checkbox id="5" checked={services[5].checked} onChange={handelService} />
                    </Box>
                    <Box>
                        <Fab sx={icon}>
                            <CreditCardIcon fontSize="large" sx={{ color: "var(--primary)", '&:hover': { color: 'var(--secondary)' } }} />
                        </Fab>
                        <Typography variant="h4" marginBottom="10px" component="div">Credit/Debit Card Payment</Typography>
                        <Typography>providing pay through credit/debit card.</Typography>
                    </Box>
                </Box>
                <Button onClick={sendData} sx={{ color: 'white', backgroundColor: 'var(--primary)', '&:hover': { color: 'var(--ternary)', backgroundColor: 'var(--secondary)' } }}>Save</Button>
            </Box>
        </ThemeProvider>
    );
};

export default ServicesPage;
