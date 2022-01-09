import React, { useState } from 'react';
import Box from '@mui/material/Box';
import '../../App.css';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CustomTheme from '../../assets/Theme';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

const OrderTrackPage = () => {

    const [error, setError] = useState(false);
    const [orderInfo, setOrderInfo] = useState({
        name: '',
        phoneNumber: '',
    });
    const [submit, setSubmit] = useState({
        name: '',
        phoneNumber: '',
    });

    const handleOrderInfo = (event) => {
        const { name, value } = event.target;
        setOrderInfo({
            ...orderInfo,
            [name]: value,
        });
    };
    const onSubmit = () => {
        setSubmit(orderInfo);
        console.log(orderInfo, "This is inside onSubmit fun");
        orderInfo.phoneNumber === '' ? setError(true) : setError(false);
    }
    console.log(submit, "This is after show");

    const renderDetailsButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    size="small"
                    sx={{ fontSize: '10px', backgroundColor: '#ac0808', '&:hover': { backgroundColor: 'rgb(79 0 0)' } }}
                    onClick={() => console.log(params)}
                >
                    Cancel Order
                </Button>
            </strong>
        )
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'createtime', headerName: 'Create Time', width: 150 },
        { field: 'mealname', headerName: 'Meal Name', width: 100 },
        { field: 'resname', headerName: 'Restaurant Name', width: 140 },
        { field: 'ordertype', headerName: 'Order Type', width: 100 },
        { field: 'ordertime', headerName: 'Order Time', width: 100 },
        { field: 'numberofseats', headerName: 'Number Of Seats', width: 140 },
        { field: 'price', headerName: 'Price', type: 'number', width: 60 },
        { field: 'count', headerName: 'Count', type: 'number', width: 70 },
        { field: 'state', headerName: 'State', width: 70 },
        {
            field: 'cancel',
            headerName: 'Cancel',
            width: 110,
            renderCell: renderDetailsButton,
        }
    ];


    const rows = [
        { id: 1, createtime: 'meal1', mealname: 'Snow', resname: 'ordertype', ordertime: 35, numberofseats: 4, price: 20, count: 15, state: "waiting" },
        { id: 1, createtime: 'meal1', mealname: 'Snow', resname: 'ordertype', ordertime: 35, numberofseats: 4, price: 20, count: 15, state: "waiting" },
        { id: 1, createtime: 'meal1', mealname: 'Snow', resname: 'ordertype', ordertime: 35, numberofseats: 4, price: 20, count: 15, state: "waiting" },
        { id: 1, createtime: 'meal1', mealname: 'Snow', resname: 'ordertype', ordertime: 35, numberofseats: 4, price: 20, count: 15, state: "waiting" },
        { id: 1, createtime: 'meal1', mealname: 'Snow', resname: 'ordertype', ordertime: 35, numberofseats: 4, price: 20, count: 15, state: "waiting" },
        { id: 1, createtime: 'meal1', mealname: 'Snow', resname: 'ordertype', ordertime: 35, numberofseats: 4, price: 20, count: 15, state: "waiting" },
        { id: 1, createtime: 'meal1', mealname: 'Snow', resname: 'ordertype', ordertime: 35, numberofseats: 4, price: 20, count: 15, state: "waiting" },
        { id: 1, createtime: 'meal1', mealname: 'Snow', resname: 'ordertype', ordertime: 35, numberofseats: 4, price: 20, count: 15, state: "waiting" },
    ];

    return (
        <ThemeProvider theme={CustomTheme}>
            <Box sx={{ backgroundColor: 'var(--transparent-secondary)', pt: 5 }}>
                <Container fixed>
                    <Typography gutterBottom variant='h4'>Order Track</Typography>
                    <Box component='form' sx={{ ml: 2, mt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', '& .MuiTextField-root': { width: '45%' }, }}>
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            value={orderInfo.name}
                            onChange={handleOrderInfo}
                            size='large'
                            type='text'
                            fullWidth
                        />
                        <TextField
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            value={orderInfo.phoneNumber}
                            onChange={handleOrderInfo}
                            size='large'
                            type='text'
                            required
                            fullWidth
                            error={error}
                            helperText={error ? 'required' : ''}
                        />
                        <Button variant='contained' onClick={onSubmit} sx={{ height: '56px' }}>Show</Button>
                    </Box>
                    {submit.phoneNumber ? <Box sx={{ ml: 2, mt: 4, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Typography gutterBottom sx={{ mr: 2 }} variant='h6'>Name: {orderInfo.name}</Typography>
                        <Typography gutterBottom variant='h6'>Phone Number: {submit.phoneNumber}</Typography>
                    </Box> : null}
                    <Box style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </Box>
                </Container>
            </Box>
        </ThemeProvider >
    );
};

export default OrderTrackPage;
