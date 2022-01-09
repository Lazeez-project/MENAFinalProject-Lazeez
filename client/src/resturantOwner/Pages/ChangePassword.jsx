import { useState } from 'react'
import Input from '../components/Input'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import { useParams } from 'react-router'
import axios from 'axios'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import CustomTheme from '../../assets/Theme';
import { ThemeProvider } from '@mui/styles';

const ChangePassword = (props) => {

    const { id } = useParams();

    const [passwords, setPasswords] = useState({ id: id });


    const [alert, setAlert] = useState('');
    const [open, setOpen] = useState(false);

    const makePasswords = (name, e) => {
        setPasswords((prevState) => ({
            ...prevState,
            [name]: e.value
        }))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const sendPasswords = () => {
        if (passwords.newPassword === passwords.confirm) {
            axios({
                method: 'put',
                url: `http://localhost:8877/api/restaurantowner/restaurant/${id}/password`,
                data: passwords
            })
                .then(response => {
                    setAlert(<Alert variant='filled' severity="success">Password has been changed</Alert>)
                    setOpen(true)
                    setTimeout(() => {
                        window.location.reload(false)
                    }, 1500)
                })
                .catch(err => {
                    setOpen(true)
                    setAlert(<Alert onClose={handleClose} variant='filled' severity="error">Opss,please check your inputs</Alert>)
                })
        }
        else {
            setOpen(true)
            setAlert(<Alert onClose={handleClose} variant='filled' severity="error">new password and confirm password are not same</Alert>)
        }
    }

    return (
        <ThemeProvider theme={CustomTheme}>
            <Box sx={{ margin: '0 auto', width: { xs: '100%', md: '80%', lg: '70%' }, minHeight: '60vh', padding: { xs: '10px', md: '30px', lg: '50px' }, display: 'flex', flexWrap: 'wrap', justifyContent: 'end' }}>
                <Snackbar
                    autoHideDuration={6000}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    message="The Username or Password is not exist"
                    key={'top' + 'center'}
                >
                    {alert}
                </Snackbar>
                <h2 className="page__title" style={{ fontSize: '40px', marginTop: '50px' }}>Change Password</h2>
                <Input inputValue={makePasswords} name="oldPassword" title="Old Password" plaseholder="Your Old Password" type="password" />
                <Input inputValue={makePasswords} name="newPassword" title="New Password" plaseholder="Your New Password" type="password" />
                <Input inputValue={makePasswords} name="confirm" title="Confirm Password" plaseholder="Confirm Your New Password" type="password" />
                <Button variant="contained" color="success" onClick={sendPasswords} sx={{ color: 'white', backgroundColor: 'var(--primary)', '&:hover': { color: 'var(--ternary)', backgroundColor: 'var(--secondary)' }, width: '20%', mt:2 }}>Change</Button>
            </Box>
        </ThemeProvider>
    );
};

export default ChangePassword
