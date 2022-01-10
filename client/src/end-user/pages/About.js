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

            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', minHeight: '80vh'}}>
                <Box sx={{ width: '30%' }}>
                    <Typography variant='h2' gutterBottom sx={{ fontWeight: '400', color: 'var(--dark-transparent-secondary)' }}><Typography variant='h2' component='span' sx={{ color: 'var(--primary)' }}>About</Typography> Us</Typography>
                    <Typography variant='body1' gutterBottom> Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quas eligendi consectetur, iure earum fugiat, dolorum vero eum quaerat sunt explicabo aut beatae modi quibusdam culpa. Eligendi nisi vitae est?
                    </Typography>
                    <Typography gutterBottom variant='h6'>eum quaerat sunt explicabo aut beatae modi quibusdam culpa. Eligendi nisi
                    </Typography>
                </Box>
                <Divider orientation="vertical" flexItem variant="middle" sx={{ height: '400px', mt: 'auto', mb: 'auto' }} />
                <Box sx={{ width: '30%' }}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Mohamed Ubeid" src="/Image/mohamed.jpg" />
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
                                <Avatar alt="Mahmoud Nwiry" src="/Image/mahmoud.jpg" />
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
                                <Avatar alt="Nidaa Awawda" src="/Image/nidaa.jpg" />
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
                                <Avatar alt="Ashjan Nairat" src="/Image/ashjan.jpg" />
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
