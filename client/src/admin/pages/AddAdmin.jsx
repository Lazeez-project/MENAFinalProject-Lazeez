import { useState } from 'react'
import Input from '../../resturantOwner/components/Input';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CustomTheme from '../../assets/Theme';
import { ThemeProvider } from '@mui/styles';
const AddMeal = () => {

  const [data, setData] = useState({});

  const makeAdmin = (name, e) => {
    setData((prevState) => ({
      ...prevState,
      [name]: e.value
    }))
  }


  const [alert, setAlert] = useState('');
  const [open, setOpen] = useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const sendData = () => {
    if (data.password === data.confirm) {
      axios({
        method: 'post',
        url: 'http://localhost:8877/api/admins',
        data: data
      }).then(response => {
        setAlert(<Alert variant='filled' severity="success">New Admin has been Added</Alert>)
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
      setAlert(<Alert onClose={handleClose} variant='filled' severity="error">The password is not the confirmation number</Alert>)
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
        <h2 className="page__title" style={{ fontSize: '70px' }}>Add New Admin</h2>
        <Input inputValue={makeAdmin} name="username" title="Username" plaseholder="Add the new admin's Name" type="text" />
        <Input inputValue={makeAdmin} name="email" title="Email" plaseholder="Add the new admin's Email" type="email" />
        <Input inputValue={makeAdmin} name="password" title="Password" plaseholder="New Admin's Password" type="password" />
        <Input inputValue={makeAdmin} name="confirm" title="Confirm Password" plaseholder="Confirm New Admin's Password" type="password" />
        <Button variant="contained" color="success" onClick={sendData} sx={{ width: "180px", backgroundColor: 'var(--primary)', color: 'white', mt: 2 }}>Add</Button>
      </Box>
    </ThemeProvider>
  );
}

export default AddMeal
