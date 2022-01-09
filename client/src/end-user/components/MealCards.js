import React, { useState, useMemo } from 'react';
import MealCard from './MealCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import OrderPopUp from './OrderPopUp';

const flowButton = {
    position: 'sticky',
    top: '20px',
    width: '120px',
    left: '45%',
    padding: '6px',
    height: '55px',
    zIndex: 1,
    mb: 3,
    fontSize: '20px',
}

const MealCards = ({ MealData, resID }) => {
    const [open, setOpen] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [isChecked, setIsChecked] = useState(new Array(MealData.length).fill(false));
    const [count, setCount] = useState(new Array(MealData.length).fill(0));
    const openPopUpPage = () => {
        setOpen(true);
    };
    const closePopUpPage = () => {
        setOpen(false);
    };
    const addOne = (id) => {
        let countArray = [...count];
        countArray[id] = countArray[id] + 1;
        setCount(countArray);
        if (isChecked[id]) {
            setOrderList(orderList.map(item =>
                item.index === id ? { ...item, count: countArray[id], price: (countArray[id] * MealData[id].price) } : item
            ));
        };
    };
    const deleteOne = (id) => {
        let countArray = [...count];
        countArray[id] = countArray[id] > 0 ? countArray[id] - 1 : 0;
        setCount(countArray);
        if (countArray[id] === 0 && isChecked[id]) {
            deleteFromOrderList(id);
        } else if (isChecked[id]) {
            setOrderList(orderList.map(item =>
                item.index === id ? { ...item, count: countArray[id], price: (countArray[id] * MealData[id].price) } : item
            ));
        }
    };
    const addToOrderList = (id) => {
        if (count[id] !== 0) {
            let checkedArray = [...isChecked];
            checkedArray[id] = true;
            setIsChecked(checkedArray);
            const order = {
                index: id,
                mealid: MealData[id].id,
                mealname: MealData[id].mealname,
                price: (count[id] * MealData[id].price),
                count: count[id],
                resid: resID,
            }
            setOrderList([...orderList, order]);
        }
    };
    const deleteFromOrderList = (id) => {
        let checkedArray = [...isChecked];
        checkedArray[id] = false;
        setIsChecked(checkedArray);
        setOrderList(orderList.filter(li => {
            return li.index !== id;
        }));
    };
    const clearMenu = () => {
        setIsChecked(new Array(MealData.length).fill(false));
        setCount(new Array(MealData.length).fill(0));
        setOrderList([]);
    }
    const cards = useMemo(() => MealData.map((meal, index) => (
        <Grid item xs={10} md={5} lg={4} key={index}>
            <MealCard
                index={index}
                meal={meal}
                isChecked={isChecked[index]}
                addToOrderList={addToOrderList}
                deleteFromOrderList={deleteFromOrderList}
                count={count[index]}
                addOne={addOne}
                deleteOne={deleteOne}
            />
        </Grid>
    )), [isChecked, count, MealData]);
    return (
        <div id='menu'>
            <Box sx={{
                pt: 5,
                position: 'relative',
            }}>
                <Typography variant='h4' gutterBottom id="menu" sx={{ pb: 2 }}>Menu: </Typography>
                <Button variant="contained" sx={flowButton} disableElevation onClick={openPopUpPage}>Order</Button>
                <OrderPopUp open={open} closePopUpPage={closePopUpPage} orderList={orderList} deleteFromOrderList={deleteFromOrderList} clearMenu={clearMenu} resid={resID} />
                <Grid container spacing={{ xs: '0', md: '6' }}>
                    {cards}
                </Grid>
            </Box>
        </div>
    );
}
export default MealCards;