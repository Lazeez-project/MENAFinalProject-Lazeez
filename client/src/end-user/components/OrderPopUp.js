import React, { memo, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from "axios";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

const Element = ({ order, deleteFromOrderList }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', m: 1, backgroundColor: 'var(--ternary)', width: '95%', pl: 1 }}>
            <Typography variant="body1" sx={{ width: '20%', textAlign: 'left' }}>{order.mealname}</Typography>
            <Typography variant="body1" sx={{ width: '20%', textAlign: 'center' }}>{order.count}</Typography>
            <Typography variant="body1" sx={{ width: '20%', textAlign: 'right' }}>{order.price}</Typography>
            <Button disableElevation size="small" variant='text' sx={{ color: 'var(--ternary)', backgroundColor: '#ac0808', '&:hover': { backgroundColor: 'rgb(79 0 0)' } }} onClick={() => deleteFromOrderList(order.index)}>
                <ClearIcon />
            </Button>
        </Box>
    );
};

const OrderType = ({ userInfo, handleUserInfo, nameError, phoneError }) => {
    return (
        <Box>
            <FormControl component="fieldset">
                <FormLabel component="legend">Order Type</FormLabel>
                <RadioGroup
                    row
                    aria-label="order-type"
                    name="ordertype"
                    value={userInfo.ordertype}
                    onChange={handleUserInfo}
                >
                    <FormControlLabel value="delivery" control={<Radio />} label="Delivery" />
                    <FormControlLabel value="take-away" control={<Radio />} label="Take Away" />
                    <FormControlLabel value="book" control={<Radio />} label="Book a Table" />
                </RadioGroup>
            </FormControl>
            <Box
                component="form"
                autoComplete="off"
                sx={{
                    '& .MuiTextField-root': { width: '100%' },
                    mt: 2,
                    width: '100%'

                }}>
                <TextField
                    required
                    error={nameError}
                    helperText={nameError ? 'required' : ''}
                    id="name"
                    name="name"
                    label="Name"
                    value={userInfo.name}
                    onChange={handleUserInfo}
                    size='medium'
                    margin="normal"
                />
                <TextField
                    required
                    error={phoneError}
                    helperText={phoneError ? 'required' : ''}
                    id="phonenumber"
                    name="phonenumber"
                    label="Phone Number"
                    value={userInfo.phonenumber}
                    onChange={handleUserInfo}
                    size='medium'
                    margin="normal"
                />
                {userInfo.ordertype === "delivery" ?
                    <TextField
                        id="location"
                        name="location"
                        label="Location"
                        value={userInfo.location}
                        onChange={handleUserInfo}
                        size='medium'
                        margin="normal"
                    /> : null}
                {(userInfo.ordertype === "take-away" || userInfo.ordertype === "book") ?
                    <TextField
                        id="ordertime"
                        name="ordertime"
                        label=""
                        value={userInfo.ordertime}
                        onChange={handleUserInfo}
                        size='medium'
                        margin="normal"
                        type='datetime-local'
                    /> : null}
                {userInfo.ordertype === "book" ?
                    <TextField
                        id="numberofseats"
                        name="numberofseats"
                        label="Number Of Seats"
                        value={userInfo.numberofseats}
                        onChange={handleUserInfo}
                        size='medium'
                        margin="normal"
                        type='number'
                    /> : null}
                <TextField
                    id="email"
                    name="email"
                    label="Enter Your Email (optional)"
                    value={userInfo.email}
                    onChange={handleUserInfo}
                    size='medium'
                    margin="normal"
                    type='email'
                />
            </Box>
        </Box>
    );
};

const OrderPopUp = ({ open, closePopUpPage, orderList, deleteFromOrderList, clearMenu, resid }) => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        location: '',
        phonenumber: '',
        email: '',
        numberofseats: '',
        ordertype: 'delivery',
        ordertime: '',
    });
    const [nameError, setNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [isEmptyOrderList, setEmptyOrderList] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);


    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const handleUserInfo = (event) => {
        const { name, value } = event.target; 
        if (name === 'phonenumber' && isNaN(value)) {
            console.log("test", userInfo);
        } else {
            setUserInfo({
                ...userInfo,
                [name]: value,
            });
            console.log("test**", userInfo);
            console.log(name, 'name');
            console.log(value, 'value')
            console.log(isNaN(value));

        }

    }

    const handleOrder = () => {
        if (orderList.length != 0) {
            if (userInfo.name !== '' && userInfo.phonenumber !== '') {
                /*start send userInfo to orderusers table in data baase*/
                axios({
                    method: 'post',
                    url: `http://localhost:8877/api/restaurants/${resid}/orderusers`,
                    data: { ...userInfo, resid: resid }
                })
                    .then((res) => {
                        console.log(res);
                        const userid = res.data;
                        /*start send order to orderlist table in database*/

                        orderList.map(order => {
                            axios({
                                method: 'post',
                                url: `http://localhost:8877/api/restaurants/${resid}/orderlist`,
                                data: { ...order, userid: userid }
                            })
                                .then((res) => {
                                    console.log(res);

                                }).catch((err) => {
                                    console.log(err);
                                })
                        });

                        /*end send order to orderlist table in database*/

                    }).catch((err) => {
                        console.log(err);
                    })

                /*end send userInfo to orderusers table in data baase*/
                clearMenu();
                closePopUpPage();
                setOpenSuccess(true);
                setTimeout(() => {
                    setOpenSuccess(false);
                }, 2000);

            }
            if (userInfo.name === '') {
                setNameError(true);
                setTimeout(() => {
                    setNameError(false);
                }, 3000);
            }
            if (userInfo.phonenumber === '') {
                setPhoneError(true);
                setTimeout(() => {
                    setPhoneError(false);
                }, 3000);
            }
        } else {
            setEmptyOrderList(true);
            setTimeout(() => {
                setEmptyOrderList(false);
            }, 3000);
        }
    }

    var totalPrice = 0;
    const list = orderList.map((element) => {
        totalPrice += element.price;
        return <Element order={element} key={element.index} deleteFromOrderList={deleteFromOrderList} />
    });
    return (
        <Box>
            <Dialog open={open} onClose={closePopUpPage} sx={{ backgroundColor: '#00000099' }}>
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: '32px', color: 'var(--primary)' }}>Your Orders: </DialogTitle>
                {isEmptyOrderList ? <Alert severity="error">Your Order List is Empty!</Alert> : null}
                <DialogContent>
                    {list}
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 4, mt: 2 }}>
                        <Typography gutterBottom sx={{ fontWeight: 'bold', pt: 1, pl: 1 }}>Total Price: <Typography component='span' color='var(--primary)'>{totalPrice}$</Typography></Typography>
                        <Button variant='contained' size="small" sx={{ fontSize: '12px', color: 'var(--ternary)', backgroundColor: '#ac0808', '&:hover': { backgroundColor: 'rgb(79 0 0)' } }} onClick={clearMenu}>Clear Order List</Button>
                    </Box>
                    {phoneError || nameError ? <Alert severity="info">Should add your name and phone number.</Alert> : null}
                    <OrderType userInfo={userInfo} handleUserInfo={handleUserInfo} nameError={nameError} phoneError={phoneError} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closePopUpPage()}>Cancel</Button>
                    <Button onClick={handleOrder} variant='contained'>Order</Button>
                </DialogActions>
            </Dialog>
            <Success open={openSuccess} handleClose={handleCloseSuccess} />
        </Box>
    );
};

const Success = ({ open, handleClose }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Alert severity="success" sx={{ width: '600px', height: '100px', fontSize: 'larger' }} >
                <AlertTitle>Success</AlertTitle>
                Your order added <strong>successfully <DoneOutlineIcon /></strong>
            </Alert>
        </Dialog>
    )
}
export default memo(OrderPopUp);
