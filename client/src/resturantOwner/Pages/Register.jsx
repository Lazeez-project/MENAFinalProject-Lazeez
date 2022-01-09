import { useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import CustomTheme from '../../assets/Theme';
import { ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { serialize } from 'object-to-formdata'


const defaultValue = {
  name: '',
  location: null,
  pictures: null,
  username: '',
  password: '',
  saterday: false,
  sunday: false,
  monday: false,
  tuseday: false,
  wednesday: false,
  thersday: false,
  friday: false,
  Ftime: '',
  Ttime: '',
  state: 0,
  email: null,
  facebook: null,
  instagram: null,
  phonenumber: null,
  mobilenumber: null
}

const requireIcon = () => {
  return (<span style={{ color: 'red' }}>*</span>)
}

const Form = () => {
  const [formValues, setFormValues] = useState(defaultValue)

  const [alert, setAlert] = useState('');
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleInputFilesChange = (e) => {
    const { name, files } = e.target;
    setFormValues({
      ...formValues,
      [name]: files[0],
    });
  }

  const handleInputCheckChange = (e) => {
    const { name, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: checked,
    });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisplay(true)
    const fd = serialize(formValues)
    axios({
      method: 'post',
      url: 'http://localhost:8877/api/restaurantowner/restaurants',
      data: fd
    })
      .then(response => {
        setAlert(<Alert variant='filled' severity="success">Registared Successfuly</Alert>)
        setOpen(true)
        setTimeout(() => {
          window.location.reload(false)
        }, 1000)
      })
      .catch(err => {
        setDisplay(false)
        setOpen(true)
        setAlert(<Alert onClose={handleClose} variant='filled' severity="warning">Opss, Please check your inputs</Alert>)
      })

  };

  return (
    <ThemeProvider theme={CustomTheme}>
      <form onSubmit={handleSubmit}>
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
        <Box
          className="reigester"
          sx={{ padding: { xs: '10px', md: '30px 150px', lg: '50px 300px' } }}
        >
          <Typography
            variant="h2"
            color='primary'
            style={{
              paddingBottom: 30,
              marginRight: 30,
              fontWeight: "normal",
            }}
          >
            Lazeez
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', width: '100%' }}>
            <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Restaurant Name</Typography>
            <TextField
              sx={{
                backgroundColor: "#fff",
                width: { xs: '70%', md: '60%' },
              }}
              size="small"
              variant="outlined"
              id="name-input"
              name="name"
              type="text"
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: { xs: '10px', lg: '20px' }, width: '100%' }}>
            <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Location<requireIcon /></Typography>
            <TextField
              sx={{
                backgroundColor: "#fff",
                width: { xs: '70%', md: '60%' },
              }}
              size="small"
              variant="outlined"
              id="Location"
              name="location"
              type="text"
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: { xs: '10px', lg: '20px' }, width: '100%' }}>
            <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Username</Typography>
            <TextField
              sx={{
                backgroundColor: "#fff",
                width: { xs: '70%', md: '60%' },
              }}
              size="small"
              variant="outlined"
              id="username"
              name="username"
              type="text"
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: { xs: '10px', lg: '20px' }, width: '100%' }}>
            <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Password</Typography>
            <TextField
              sx={{
                backgroundColor: "#fff",
                width: { xs: '70%', md: '60%' },
              }}
              size="small"
              variant="outlined"
              id="password"
              name="password"
              type="password"
              onChange={handleInputChange}
            />
          </Box>

          <Box sx={{ marginTop: { xs: '10px', lg: '20px' }, width: '100%' }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "500",
                paddingTop: 5,
                fontSize: { xs: '22px', md: '26px', lg: '35px' },
              }}
              color='primary'
            >
              Resturant Pictures:
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: { xs: '10px', lg: '20px' }, width: '100%' }}>
              <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Pictures 1</Typography>
              <input
                sx={{
                  backgroundColor: "#fff",
                  width: { xs: '70%', md: '60%' },
                }}
                id="image1"
                type="file"
                name="image1"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleInputFilesChange}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: { xs: '10px', lg: '20px' }, width: '100%' }}>
              <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Pictures 2</Typography>
              <input
                sx={{
                  backgroundColor: "#fff",
                  width: { xs: '70%', md: '60%' },
                }}
                id="Pictures"
                type="file"
                name="image2"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleInputFilesChange}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: { xs: '10px', lg: '20px' }, width: '100%' }}>
              <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Pictures 3</Typography>
              <input
                sx={{
                  backgroundColor: "#fff",
                  width: { xs: '70%', md: '60%' },
                }}
                id="Pictures"
                type="file"
                name="image3"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleInputFilesChange}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: { xs: '10px', lg: '20px' }, width: '100%' }}>
              <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Pictures 4</Typography>
              <input
                sx={{
                  backgroundColor: "#fff",
                  width: { xs: '70%', md: '60%' },
                }}
                id="Pictures"
                type="file"
                name="image4"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleInputFilesChange}
              />
            </Box>
          </Box>

          <Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "500",
                paddingTop: 5,
                fontSize: { xs: '22px', md: '26px', lg: '35px' },
              }}
              color='primary'
            >
              About Your Restaurant:
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 2 }}>
              <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Times</Typography>
              <Box sx={{ width: { xs: '70%', md: '60%' } }}>
                <input
                  id="fromTim"
                  name="Ftime"
                  type="time"
                  onChange={handleInputChange}
                />
                <Typography variant="p" sx={{ margin: { xs: '0 10px', md: '0 20px' } }}>
                  To
                </Typography>
                <input
                  id="timeTo"
                  name="Ttime"
                  type="time"
                  onChange={handleInputChange}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", marginTop: 2 }}>
              <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Available days</Typography>
              <Box sx={{ width: { xs: '70%', md: '60%' }, display: 'flex', flexWrap: 'wrap' }}>
                <Box sx={{ marginRight: '5px' }}>
                  <Checkbox
                    id="su"
                    name="sunday"
                    onChange={handleInputCheckChange}
                  />
                  <label style={{ marginLeft: '-5px' }}>Su</label>
                </Box>
                <Box sx={{ marginRight: '5px' }}>
                  <Checkbox
                    id="mo"
                    name="monday"
                    onChange={handleInputCheckChange}
                  />
                  <label style={{ marginLeft: '-5px' }}>Mo</label>
                </Box>
                <Box sx={{ marginRight: '5px' }}>
                  <Checkbox
                    id="tu"
                    name="tuseday"
                    onChange={handleInputCheckChange}
                  />
                  <label style={{ marginLeft: '-5px' }}>Tu</label>
                </Box>

                <Box sx={{ marginRight: '5px' }}>
                  <Checkbox
                    id="we"
                    name="wednesday"
                    onChange={handleInputCheckChange}
                  />
                  <label style={{ marginLeft: '-5px' }}>We</label>
                </Box>

                <Box sx={{ marginRight: '5px' }}>
                  <Checkbox
                    id="thr"
                    name="thersday"
                    onChange={handleInputCheckChange}
                  />
                  <label style={{ marginLeft: '-5px' }}>Thr</label>
                </Box>

                <Box sx={{ marginRight: '5px' }}>
                  <Checkbox
                    id="fr"
                    name="friday"
                    onChange={handleInputCheckChange}
                  />
                  <label style={{ marginLeft: '-5px' }}>Fr</label>
                </Box>
                <Box sx={{ marginRight: '5px' }}>
                  <Checkbox
                    id="st"
                    name="saterday"
                    onChange={handleInputCheckChange}
                  />
                  <label style={{ marginLeft: '-5px' }}>St</label>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "500",
                paddingTop: 5,
                fontSize: { xs: '22px', md: '26px', lg: '35px' },
              }}
              color='primary'
            >
              Contact:
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 2 }}>
              <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Phone Number</Typography>
              <TextField
                sx={{ width: { xs: '70%', md: '60%' }, backgroundColor: '#fff' }}
                size="small"
                variant="outlined"
                id="Phone_number"
                name="phonenumber"
                type="text"
                onChange={handleInputChange}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 2 }}>
              <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Mobile Number</Typography>
              <TextField
                sx={{
                  backgroundColor: "#fff",
                  width: { xs: '70%', md: '60%' }
                }}
                size="small"
                variant="outlined"
                id="mobile_number"
                name="mobilenumber"
                type="text"
                onChange={handleInputChange}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 2 }}>
              <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Email</Typography>
              <TextField
                sx={{
                  backgroundColor: "#fff",
                  width: { xs: '70%', md: '60%' }
                }}
                size="small"
                variant="outlined"
                id="email"
                name="email"
                type="email"
                onChange={handleInputChange}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 2 }}>
              <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Facebook</Typography>
              <TextField
                sx={{
                  backgroundColor: "#fff",
                  width: { xs: '70%', md: '60%' }
                }}
                size="small"
                variant="outlined"
                id="Facebook"
                name="facebook"
                type="text"
                onChange={handleInputChange}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: 2 }}>
              <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Instagram</Typography>
              <TextField
                sx={{
                  backgroundColor: "#fff",
                  width: { xs: '70%', md: '60%' }
                }}
                size="small"
                variant="outlined"
                id="Instagram"
                name="instagram"
                type="text"
                onChange={handleInputChange}
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            type="submit"
            disabled={display}
            sx={{
              backgroundColor: "theme.palette.primary",
              color: "white",
              marginTop: '20px',
              display: 'block',
              marginLeft: 'auto',
              textAlign: "center",
              paddingLeft: '40px',
              paddingRight: '40px',
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </ThemeProvider>
  );
};
export default Form;