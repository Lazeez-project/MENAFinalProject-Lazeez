import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { NavLink } from "react-router-dom";
const cardStyle = {
    mb: 3,
    ml: 3,
    maxWidth: '100%',
    borderRadius: "5px",
    transition: '0.3s',
    '&:hover': {
        opacity: '1',
        webKitBoxShadow: "3px 5px 15px 5px #00000099",
        boxShadow: "3px 5px 15px 5px #00000099",
    }
}

const RestaurantCard = (props) => {
    const { id, name, location, rate, pictures } = props.res;
    return (
        <Card sx={cardStyle}>
            <CardMedia
                component="img"
                height="400"
                image={`/Images/${pictures.split(',')[0]}`}
                alt={name}
            />
            {/*<img src={'/Images/restaurant3.png'} alt='test' style={{ height: '2000px' }} />*/}
            <Box sx={{ color: 'black', backgroundColor: 'var(--ternary)', }}>
                <CardContent >
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" component="div">
                        {location}
                    </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', }}>
                    <Typography gutterBottom variant="body1">
                        Rate : <Rating name="read-only" value={rate} readOnly />
                    </Typography>
                    <Button size="small" variant="contained" disableElevation>
                        <NavLink
                            to={`${id}`}
                            className="restaurant-link"
                            reloadDocument={true}
                        >Restaurant Page</NavLink>
                    </Button>
                </CardActions>{/*href={`:${name}`}*/}
            </Box>
        </Card >
    );
};

export default RestaurantCard;
