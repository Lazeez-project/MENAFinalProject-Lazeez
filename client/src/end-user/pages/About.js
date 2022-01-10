import React from 'react';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CustomTheme from '../../assets/Theme';
import { ThemeProvider } from '@mui/material/styles';

const About = () => {
    return (
        <ThemeProvider theme={CustomTheme}>

            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexDirection : {xs : 'column', md : 'row'} , alignItems: 'center', minHeight: '88vh', padding : '10px'}}>
                <Box sx={{ width: {xs : '100%',md :'30%'} }}>
                    <Typography variant='h2' gutterBottom sx={{ fontWeight: '400', color: 'var(--dark-transparent-secondary)' }}><Typography variant='h2' component='span' sx={{ color: 'var(--primary)' }}>About</Typography> Us</Typography>
                    <Typography variant='body1' gutterBottom> 
                        Lazeez for help you to choose any meals from any restaurants from any place, and you can choose your best way arraiving
                    </Typography>
                    <Typography gutterBottom variant='h6'>
                        Lazeez is the best way to choose your meal
                    </Typography>
                </Box>
                <Divider orientation="vertical" flexItem variant="middle" sx={{ height: '400px', display : {xs : 'none', md : 'block'} , mt: 'auto', mb: 'auto' }} />
                <Box sx={{ width: {xs : '100%',md :'30%'}, marginTop : {xs : '50px', md : '0'} }}>
                    <Typography variant='h5' sx={{fontSize : '25px' ,color : 'var(--primary)'}}>Team Leader</Typography>
                        <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Murawweh Daher" sx={{backgroundColor : '#7400b8'}} src="/Image/mohamed.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary="Murawweh Daher"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                muhanad.daher@hotmail.com
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                    <Typography variant='h5' sx={{fontSize : '25px', color: 'var(--primary)', mt : 2}}>Team Members</Typography>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Mohamed Ubeid" sx={{backgroundColor : '#4ea8de'}} src="/Image/mohamed.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Mohamed Ubeid"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            mohammed.ubeid99@gmail.com
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Mahmoud Nwiry" sx={{backgroundColor : '#ffaa00'}} src="/Image/mahmoud.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Mahmoud Nwiry"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            mamo992001@gmail.com
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Nidaa Awawda" sx={{backgroundColor : '#57cc99'}} src="/Image/nidaa.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Nidaa Awawda"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            nidaa.awawda@gmail.com
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Ashjan Nairat" sx={{backgroundColor : '#ff4d6d'}} src="/Image/ashjan.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Ashjan Nairat"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            ashjanraja@gmail.com
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </Box>
            </Box >
        </ThemeProvider >

    );
};

export default About
