import { NavLink } from "react-router-dom"
import { Box } from "@mui/system"
import { Typography } from "@mui/material"

// Icons
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = (props) => {
    return (
        <Box sx={{ maxWidth: { xs: '70px', lg: '15%' }, flex: 2, backgroundColor: "#45CE67", minHeight: '100vh' }}>
            <Typography className="sidebar__title" variant="body" component="h2" sx={{ fontWeight: 600, margin: '50px 0', display: { xs: 'none', lg: 'block' } }}>Admin Dashboard</Typography>
            <ul className="sidebar__list" style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li><NavLink to={`/admin/dashboard/${props.id}/`} ><RestaurantIcon></RestaurantIcon><Typography sx={{ display: { xs: 'none', lg: 'block' } }}>Restaurants</Typography></NavLink></li>
                <li><NavLink to={`/admin/dashboard/${props.id}/pending`} ><AccessTimeIcon></AccessTimeIcon><Typography sx={{ display: { xs: 'none', lg: 'block' } }}>Pending</Typography></NavLink></li>
                <li><NavLink to={`/admin/dashboard/${props.id}/massages`} ><EmailIcon></EmailIcon><Typography sx={{ display: { xs: 'none', lg: 'block' } }}>Massages</Typography></NavLink></li>
                <li><NavLink to={`/admin/dashboard/${props.id}/addadmin`} ><PersonAddIcon></PersonAddIcon><Typography sx={{ display: { xs: 'none', lg: 'block' } }}>New Admin</Typography></NavLink></li>
                <li><NavLink to={`/admin/dashboard/${props.id}/changepassword`} ><VpnKeyIcon></VpnKeyIcon><Typography sx={{ display: { xs: 'none', lg: 'block' } }}>Change Password</Typography></NavLink></li>
                <li><NavLink to={`../../`}><LogoutIcon /><Typography sx={{ display: { xs: 'none', lg: 'block' } }}>Log out</Typography></NavLink></li>
            </ul>
        </Box>
    )
}

export default Sidebar;
