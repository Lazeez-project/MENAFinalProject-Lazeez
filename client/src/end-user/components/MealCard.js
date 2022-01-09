import React, { memo } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
const cardStyle = {
    mb: 3,
    ml: 3,
    maxWidth: '350px',
    borderRadius: "5px",
    transition: '0.3s',
    webKitBoxShadow: "3px 5px 15px 5px #00000033",
    boxShadow: "3px 5px 15px 5px #00000033",
    '&:hover': {
        webKitBoxShadow: "3px 5px 15px 5px #00000099",
        boxShadow: "3px 5px 15px 5px #00000099",
    }
};

const MealCard = (props) => {
    const { id, mealname, price, rate, Ingredients, pictures } = props.meal;
    const index = props.index;
    const count = props.count;
    const handleChecked = (event) => {
        event.target.checked ? props.addToOrderList(index) : props.deleteFromOrderList(index)

    }
    const handleDeleteOne = () => {
        props.deleteOne(index);
    }

    const handleAddOne = () => {
        props.addOne(index);

    }
    return (
        <Card sx={cardStyle}>
            <CardMedia
                component="img"
                height="300"

                image={`/Images/${pictures}`}
                alt={mealname}
            />
            <Box sx={{
                color: 'black', backgroundColor: 'var(--ternary)'
            }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {mealname}
                    </Typography>
                    <Typography gutterBottom variant="body1">
                        Rate : <Rating name="read-only" value={rate} readOnly />
                    </Typography>
                </CardContent>
                <Box sx={{ justifyContent: 'space-between', }}>
                    <Box sx={{
                        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', p: 1,
                    }}>Ingredients: {Ingredients.split(',').map((ingredient, i) => (
                        <Typography sx={{ display: 'inline-block', pl: 2, }} variant='body1' key={i}>{ingredient}</Typography>
                    ))}</Box>
                    <CardActions sx={{ justifyContent: 'space-between' }}>
                        <Typography gutterBottom variant="body1">
                            Price: {price}$
                        </Typography>
                        <Checkbox
                            checked={props.isChecked}
                            onChange={handleChecked}
                            inputProps={{ 'aria-label': 'controlled' }}
                            color='ternary'
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28, color: 'var(--primary)' } }}
                        />
                        <Box>
                            <Button size="small" variant="contained" disableElevation sx={{ borderTopRightRadius: '0', borderBottomRightRadius: 0 }} onClick={handleAddOne}>
                                <AddIcon />
                            </Button>
                            <Box component="span" sx={{ backgroundColor: "white", color: 'black', pl: 2, pr: 2, pt: 0.6, pb: 0.8 }}>{count}</Box>
                            <Button size="small" variant="contained" disableElevation sx={{ borderTopLeftRadius: '0', borderBottomLeftRadius: 0, backgroundColor: '#ac0808', '&:hover': { backgroundColor: 'rgb(79 0 0)' } }} onClick={handleDeleteOne}>
                                <RemoveIcon />
                            </Button>
                        </Box>
                    </CardActions>
                </Box>
            </Box>
        </Card >
    );
};
export default memo(MealCard);
