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
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const OrderTrackPage = () => {

    const [error, setError] = useState(false);
    const [userOrder, setUserOrder] = useState([]);
    const [open, setOpen] = useState(false);
    const [isEmpty, setEmpty] = useState(false);
    const [orderInfo, setOrderInfo] = useState({
        name: '',
        phoneNumber: '',
    });
    const [submit, setSubmit] = useState({
        name: '',
        phoneNumber: '',
    });
    const vertical = 'top';
    const horizontal = 'center';

    const handleOrderInfo = (event) => {
        const { name, value } = event.target;

        if (name === 'phoneNumber' && isNaN(value)) {

        } else {
            setOrderInfo({
                ...orderInfo,
                [name]: value,
            });
        }
    };
    const onSubmit = () => {
        setSubmit(orderInfo);
        orderInfo.phoneNumber === '' ? setError(true) : setError(false);
        if (orderInfo.phoneNumber) {
            axios.get(`http://localhost:8877/api//userorder?name=${orderInfo.name}&phonenumber=${orderInfo.phoneNumber}`)
                .then((res) => {
                    setUserOrder(res.data);
                    res.data.length == 0 && setEmpty(true);
                }).catch((err) => {
                    console.log('err', err);
                })
        }
    }
    const deleteOrder = (params) => {
        console.log(params);
        if (params.row.state == 'Waiting') {
            axios.delete(`http://localhost:8877/api/userorder/${params.id}`)
                .then((res) => {
                    setOpen(true);
                    setUserOrder(userOrder.filter(order => order.ID != res.data[0].ID))
                }).catch((err) => {
                    console.log('err', err);
                })
        }
    }

    const renderDetailsButton = (params) => {
        return (
            <strong>
                <Button
                    variant="contained"
                    size="small"
                    sx={{ fontSize: '10px', backgroundColor: '#ac0808', '&:hover': { backgroundColor: 'rgb(79 0 0)' } }}
                    disabled={params.row.state == 'Waiting' ? false : true}
                    onClick={() => deleteOrder(params)}
                >
                    Cancel Order
                </Button>
            </strong >
        )
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'createtime', headerName: 'Create Time', width: 145 },
        { field: 'mealname', headerName: 'Meal Name', width: 100 },
        { field: 'resname', headerName: 'Restaurant Name', width: 150 },
        { field: 'ordertype', headerName: 'Order Type', width: 100 },
        { field: 'ordertime', headerName: 'Order Time', width: 145 },
        { field: 'price', headerName: 'Price', type: 'number', width: 60 },
        { field: 'count', headerName: 'Count', type: 'number', width: 70 },
        { field: 'numberofseats', headerName: 'Seats', width: 80 },
        { field: 'state', headerName: 'State', width: 90 },
        {
            field: 'cancel',
            headerName: 'Cancel',
            width: 110,
            renderCell: renderDetailsButton,
        }
    ];

    function setState(state) {
        if (state == 0) {
            return "Waiting"
        } else if (state == 1) {
            return "Preparing"
        } else if (state == 2) {
            return "Finished"
        } else if (state == 3) {
            return "Done"
        }
    };
    function convert(time = "") {
        if (time) {
            let myTime = time.substring(11, 16);
            let temp = Number.parseInt(myTime.substring(0, 3)) + 2;
            if (temp > 12) {
                temp = temp - 12;
                myTime = temp + myTime.substring(2, 5) + " pm"
            } else {
                if (temp == 0) {
                    temp = 12;
                    myTime = temp + myTime.substring(2, 5) + "am"
                } else {
                    myTime = temp + myTime.substring(2, 5) + " am"
                }
            }
            return time.substring(0, 9) + " " + myTime;
        } else {
            return
        }
    };

    const rows = userOrder.map((order, index) => {
        return {
            id: order.ID,
            index: index,
            name: order.Name,
            createtime: convert(order.OrderCreateTime),
            mealname: order.MealName,
            resname: order.RestaurantName,
            ordertype: order.OrderType,
            ordertime: convert(order.OrderTime),
            price: order.Price,
            count: order.Count,
            numberofseats: order.NumberOfSeats,
            state: setState(order.State)
        }
    });

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
                        <Button variant='contained' onClick={onSubmit} sx={{ height: '56px' }}/* href={orderInfo.phoneNumber ? `http://localhost:3000/track?${orderInfo.name ? `name=${orderInfo.name}&` : ''}phonenumber=${orderInfo.phoneNumber}` : ''}*/>Show</Button>
                    </Box>
                    {submit.phoneNumber ? <Box sx={{ ml: 2, mt: 4, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography gutterBottom sx={{ mr: 2 }} variant='hbody1'><Typography variant="h6" component='span' sx={{ color: 'var(--primary)' }}>Name:</Typography> {orderInfo.name}</Typography>
                        <Typography gutterBottom variant='h6'><Typography variant="h6" component='span' sx={{ color: 'var(--primary)' }}>Phone Number: </Typography>{submit.phoneNumber}</Typography>
                    </Box> : null}
                    <Box style={{ width: '110%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            autoHeight
                        />
                    </Box>
                </Container>
            </Box >
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={() => setOpen(false)}
                key={'cancel'}
                autoHideDuration={2500}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    {"Your Order Canceled >_0"}
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={isEmpty}
                onClose={() => setEmpty(false)}
                key={'empty'}
                autoHideDuration={2500}
            >
                <Alert severity="info" sx={{ width: '100%' }}>
                    You dont have any order yet!
                </Alert>
            </Snackbar>
        </ThemeProvider >
    );
};

export default OrderTrackPage;
