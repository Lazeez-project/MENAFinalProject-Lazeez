import { NavLink,useNavigate } from "react-router-dom"
import { Box } from "@mui/system"
import Typography from "@mui/material/Typography";

import RoomServiceIcon from '@mui/icons-material/RoomService';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const Sidebar = (props) => {

    const navigate = useNavigate();

    const { id } = useParams()

    const [name, setName] = useState('Restaurant Owner')
    const [alert, setAlert] = useState('')
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8877/api/restaurantowner/restaurant/${id}`)
            .then(response => {
                setName(response.data[0].name)
                if (response.data[0].state == 2) {
                    setAlert(<Alert variant='filled' severity="error">Your Restaurant is not Active</Alert>)
                    setOpen(true)
                }
            })
            .catch(err =>{
                navigate('/resturant/owner/')
            })
    }, [])


    return (
        <Box sx={{ maxWidth: { xs: '70px', lg: '195px' }, flex: 2, backgroundColor: "#45CE67", minHeight: '100vh' }}>
            <Snackbar
                autoHideDuration={60000000}
                onClose=''
                open={open}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                message="The Username or Password is not exist"
                key={'top' + 'center'}
            >
                {alert}
            </Snackbar>
            <Typography
                className="sidebar__title"
                variant="body"
                component="h2"
                sx={{ fontWeight: 600, margin: '50px 0', display: { xs: 'none', lg: 'block' }, textTransform: 'uppercase' }}>
                {name}
            </Typography>
            <ul className="sidebar__list" style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li><NavLink to={`/resturant/owner/dashboard/${props.id}/`} ><RoomServiceIcon /><Typography sx={{ display: { xs: 'none', lg: 'block' } }}>Orders</Typography></NavLink></li>
                <li><NavLink to={`/resturant/owner/dashboard/${props.id}/mymeals`} ><LunchDiningIcon /><Typography sx={{ display: { xs: 'none', lg: 'block' } }}>My Meals</Typography></NavLink></li>
                <li><NavLink to={`/resturant/owner/dashboard/${props.id}/addmeal`} ><AddIcon /><Typography sx={{ display: { xs: 'none', lg: 'block' } }}>Add Meal</Typography></NavLink></li>
                <li><NavLink to={`/resturant/owner/dashboard/${props.id}/updatedata`} ><EditIcon /><Typography sx={{ display: { xs: 'none', lg: 'block' } }}>Update Data</Typography></NavLink></li>
                <li><NavLink to={`/resturant/owner/dashboard/${props.id}/services`} ><HomeRepairServiceIcon /><Typography sx={{ display: { xs: 'none', lg: 'block' } }}>Services</Typography></NavLink></li>
                <li><NavLink to={`/resturant/owner/dashboard/${props.id}/changepassword`} ><VpnKeyIcon /><Typography sx={{ display: { xs: 'none', lg: 'block' } }}>Change Password</Typography></NavLink></li>
                <li><NavLink reloadDocument="true" to={`../../`}><LogoutIcon /><Typography sx={{ display: { xs: 'none', lg: 'block' } }}>Log out</Typography></NavLink></li>
            </ul>
        </Box>
    );
}

export default Sidebar
