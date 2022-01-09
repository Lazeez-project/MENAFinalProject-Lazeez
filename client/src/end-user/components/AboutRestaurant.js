import React from 'react';
import Box from '@mui/material/Box';
import { Rating, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ImageSlider from '../components/ImageSlider';
import Link from "@mui/material/Link";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useNavigate } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const active = {
    backgroundColor: "var(--primary)",
    p: "8px 0",
    m: '5px',
    color: "var(--ternary)",
    borderRadius: 1,
    textTransform: 'capitalize',
    "&:hover": {
        color: "var(--ternary)",
        backgroundColor: "var(--secondary)",
    }
};

const SetDay = ({ available, day }) => (
    available === 1 ? <Button component='span' sx={active}>{day}</Button> : null
);

const AboutRestaurant = (props) => {

    const { name,
        location,
        pictures,
        saterday, sunday, monday, tuesday, wednesday, thersday, friday,    /* 1 -> on  0 -> off */
        Ftime,
        Ttime,
        phonenumber,
        email,
        facebook,
        instagram,
        rate,
    } = props.restaurantData;
    let navigate = useNavigate();

    /*add images from pictures here to imageSlider ******************* */
    let images = pictures.substring(0, pictures.length - 1).split(',').map(item => {
        if (item.length > 4) {
            return { url: `/Images/${item}` }
        }
    });
    console.log(images);
    /*images.push({
        url: `/Images/${pictures}`,
    });*/
    function convert(time = "") {
        let myTime = time.substring(11, 16);
        let temp = Number.parseInt(myTime.substring(0, 3));
        if (temp > 12) {
            temp = temp - 12;
            myTime = temp + myTime.substring(2, 5) + " pm"
        } else {
            myTime = myTime + " am"
        }
        return myTime;
    };

    return (

        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'row', sm: 'row' }, alignItems: 'flex-end' }}>
                <Box>
                    <Typography variant='h4' >{name}</Typography>
                    <Typography variant='h6' color="secondary" sx={{ pl: "4px" }}>{location}</Typography>
                </Box>
                <Box>
                    <Button variant="contained" href="#menu" sx={{
                        backgroundColor: 'var(--ternary)',
                        color: 'var(--primary)',
                        width: '100px',
                        mb: 1,
                        '&:hover': { backgroundColor: 'var(--primary)', color: 'var(--ternary)' }
                    }}>Menu</Button>

                    <Button variant="contained"
                        sx={{
                            backgroundColor: 'var(--ternary)',
                            color: 'var(--primary)',
                            width: '100px',
                            mb: 1,
                            ml: 3,
                            '&:hover': { backgroundColor: 'var(--primary)', color: 'var(--ternary)' }
                        }}
                        onClick={() => {
                            navigate("/restaurants")
                        }}
                    >Back <ChevronRightIcon /></Button>
                </Box>
            </Box>

            <ImageSlider images={images} />

            <Box sx={{ mt: 5 }}>
                <Typography variant='h5' color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>About Restaurant:</Typography>
                <Box sx={{ pl: 2 }}>
                    <Typography variant='h6' sx={{ display: 'inline-block' }} gutterBottom>Available Hours:</Typography>
                    <Typography sx={{ display: 'inline', fontSize: '18px' }} color="secondary" variant='body1'> {convert(Ftime)} - {convert(Ttime)}</Typography>
                    <br />
                    <Typography variant='h6' sx={{ display: 'inline-block', pr: 2 }} gutterBottom>Available Days:</Typography>
                    <Typography sx={{ display: 'inline', fontSize: '18px' }} variant='body1' color="secondary">
                        <SetDay day={`st`} available={saterday} />
                        <SetDay day={`su`} available={sunday} />
                        <SetDay day={`mo`} available={monday} />
                        <SetDay day={`tu`} available={tuesday} />
                        <SetDay day={`we`} available={wednesday} />
                        <SetDay day={`thr`} available={thersday} />
                        <SetDay day={`fri`} available={friday} />
                    </Typography>
                    <br />
                    <Typography variant='h6' sx={{ display: 'inline-block', pr: 1 }} gutterBottom>Rate: </Typography>
                    <Rating name="read-only" value={4} readOnly />
                </Box>
            </Box>
            <Box sx={{ mt: 5 }}>
                <Typography variant='h6' color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>Contact:</Typography>
                <Box sx={{ pl: 2 }}>
                    <Typography variant='h6' sx={{ display: 'inline-block' }} gutterBottom>Phone Number:</Typography>
                    <Typography sx={{ display: 'inline', fontSize: '18px' }} variant='body1' color="secondary">{phonenumber}</Typography>
                    <br />
                    <Typography variant='h6' sx={{ display: 'inline-block' }} gutterBottom>Email:</Typography>
                    <Typography sx={{ display: 'inline', fontSize: '18px' }} variant='body1' color="secondary"> {email}</Typography>
                    <br />

                    <Typography variant='h6' sx={{ display: 'inline-block', pr: 1 }} gutterBottom>Social Media: </Typography>
                    <Box sx={{ display: 'inline' }}>
                        <Link
                            href={facebook}
                            target="_blank"
                            underline="none"
                            color="ternary.main"
                            sx={{ pr: 2 }}
                        >
                            <FacebookRoundedIcon sx={{ color: "#4267B2" }} /></Link>
                        <Link
                            href={instagram}
                            target="_blank"
                            underline="none"
                            color="ternary.main"
                            sx={{ pr: 2 }}
                        >
                            <InstagramIcon sx={{ color: "#C13584" }} /></Link>
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}

export default AboutRestaurant
