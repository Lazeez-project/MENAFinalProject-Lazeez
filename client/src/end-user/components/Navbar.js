
import { NavLink } from "react-router-dom"
import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CustomTheme from '../../assets/Theme';
import { ThemeProvider } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../../App.css'

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = (e) => {
        setAnchorEl(null);
    }

    return (
        <ThemeProvider theme={CustomTheme}>
            <Box sx={{ flexGrow: 1 }} >
                <AppBar position="static" sx={{ p: '8px' }} elevation={1} >
                    <Toolbar>
                        {/*Drop Down Menu*/}
                        <IconButton
                            id="menu"
                            aria-controls="menu"
                            aria-label="menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
                        >
                            <NavLink
                                className='menuLink'
                                to='/'
                            >
                                <MenuItem>Home</MenuItem>
                            </NavLink>
                            <NavLink
                                className='menuLink'
                                to='/restaurants'
                            >
                                <MenuItem>Restaurants</MenuItem>
                            </NavLink>
                            <NavLink
                                className='menuLink'
                                to='/track'
                            >
                                <MenuItem>Order Track</MenuItem>
                            </NavLink>
                            <NavLink
                                className='menuLink'
                                to='/about'
                            >
                                <MenuItem>About</MenuItem>
                            </NavLink>
                            <NavLink
                                className='menuLink'
                                to='/contact'
                            >
                                <MenuItem>Contact</MenuItem>
                            </NavLink>
                        </Menu>

                        {/*Logo*/}
                        <IconButton sx={{ flexGrow: 1, textAlign: 'center' }}>
                            <img src={'Images/logo1.png'}
                                width={95}
                                alt='logo'
                            className="logo" />
                            {/* Logo */}
                        </IconButton>


                        {/*Links*/}
                        <Box
                            sx={{
                                flexGrow: 3,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                mr: 10,
                                display: { xs: 'none', md: 'flex' }
                            }}
                        >
                            <NavLink
                                to='/'
                                className='navLinks'
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to='/restaurants'
                                className='navLinks'
                            >
                                Restaurants
                            </NavLink>
                            <NavLink
                                to='/track'
                                className='navLinks'
                            >
                                Order Track
                            </NavLink>
                            <NavLink
                                to='/about'
                                className='navLinks'
                            >
                                About
                            </NavLink>
                            <Button
                                sx={{textTransform: 'capitalize', color: 'var(--white)',fontWeight:'400' ,fontSize: '19px', '&:hover': { borderBottom: '8px solid var(--ternary)', borderRadius: 'none' } }}
                                href="#footer"
                            >
                                Contact
                            </Button>
                        </Box>

                        {/*Restaurant Register Button*/}
                        <Button
                            color="inherit"
                            size="small"
                            sx={{
                                backgroundColor: 'white',
                                color: 'var(--primary)',
                                border: '1px solid white',
                                '&:hover': { backgroundColor: 'var(--primary)', color: 'white' }
                            }}
                            disableElevation
                            href="/resturant/owner/"
                        >
                            Register as Restaurant
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider >
    )
}

export default Navbar;

