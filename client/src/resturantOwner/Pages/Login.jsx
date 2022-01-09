import { Box } from '@mui/system'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios';
import CustomTheme from '../../assets/Theme';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState('');
    const [open, setOpen] = useState(false);

    const handelUsername = (e) => {
        setUsername(e.target.value)
    }

    const handelPassword = (e) => {
        setPassword(e.target.value)
    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const checkData = (e) => {
        e.preventDefault();

        const formdata = {
            username: username,
            password: password
        }

        axios({
            method: 'post',
            url: 'http://localhost:8877/api/restaurantowner/restaurant/login',
            data: formdata
        })
            .then(response => {
                console.log(response);
                if (response.data[0].state > 0) {
                    setAlert(<Alert variant='filled' severity="success">Welcome</Alert>)
                    setOpen(true)
                    setTimeout(() => {
                        navigate(`dashboard/${response.data[0].resid}/`)
                    }, 1000)
                }
                else if (response.data[0].state === 0) {
                    setAlert(<Alert variant='filled' severity="info">You Should Waiting Admin confirm Your Requset</Alert>)
                    setOpen(true)
                }
            })
            .catch(err => {
                setOpen(true)
                setAlert(<Alert onClose={handleClose} variant='filled' severity="error">Username or Password is not exist</Alert>)
            })
    }

    return (
        <ThemeProvider theme={CustomTheme}>

            <Box className="login" onsubmit={checkData}>
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
                <form className='login__form' >
                    <h2>Restaurant Owner</h2>
                    <div className="input__box">
                        <input
                            type="text"
                            className='login__input'
                            placeholder='Username'
                            onChange={handelUsername}
                        />
                    </div>
                    <div className="input__box">
                        <input
                            type="password"
                            className='login__input'
                            placeholder='Password'
                            onChange={handelPassword}
                        />
                    </div>
                    <div className="input__box">
                        <Button
                            type="submit"
                            sx={{
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                textAlign: 'center',
                                width: '100%',
                                border: '1px solid white',
                                border: '1px solid var(--primary)',
                                '&:hover': {
                                    backgroundColor: 'white', color: 'var(--primary)'
                                }
                            }
                            }
                            onClick={checkData}
                        >
                            Login
                        </Button>
                    </div>
                    <div className="input__box" style={{ textAlign: 'center' }}>
                        <Link
                            to='register'
                        >
                            Sign Up
                        </Link>
                        <br/>
                        <Button
                        variant='text'
                            sx={{textAlign:'left', fontSize:'12px', ml:-17, mt:1}}
                            href="http://localhost:3000/admin/"
                        >
                            Signin as admin
                        </Button>
                    </div>

                </form>

            </Box>
        </ThemeProvider>

    )
}

export default Login
