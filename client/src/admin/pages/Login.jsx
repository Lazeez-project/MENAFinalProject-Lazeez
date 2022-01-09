import { Box } from '@mui/system'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

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

        const obj = {
            username : username,
            password : password
        }

        axios({
            method : 'post',
            url : 'http://localhost:8877/api/admin/login',
            data : obj
        })
        .then(response => {
            setAlert(<Alert variant='filled' severity="success">Welcome</Alert>)
            setOpen(true)
            setTimeout(()=>{
                navigate(`dashboard/${response.data[0].id}/`)
            },1000)
        })
        .catch(err =>{
            setOpen(true)
            setAlert(<Alert onClose={handleClose} variant='filled' severity="error">Username or Password is not exist</Alert>)
        })
    }

    return (
        <Box className="login" onsubmit={checkData}>
            <Snackbar
                autoHideDuration={6000}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical : 'top', horizontal : 'center' }}
                message="The Username or Password is not exist"
                key={'top' + 'center'}
            >
                {alert}
            </Snackbar>
            <form className='login__form' >
                <h2>Admin Login</h2>
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
                    <button
                        type="submit" 
                        className='login__submit' 
                        onClick={checkData}
                    >
                        Login
                    </button>
                </div>
            </form>
        </Box>
    )
}

export default Login
