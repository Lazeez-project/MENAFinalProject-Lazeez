import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { useParams } from 'react-router'
import { serialize } from 'object-to-formdata'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const defaultValue = {
  name: '',
  location: null,
  saterday: false,
  sunday: false,
  monday: false,
  tuesday: false,
  wednesday: false,
  thersday: false,
  friday: false,
  Ftime: '',
  Ttime: '',
  facebook: null,
  instagram: null,
  phonenumber: null,
  mobilenumber: null
}

const Form = () => {

  const { id, resId } = useParams()

  const [formValues, setFormValues] = useState(defaultValue)

  const [isloading, setIsloading] = useState(true);
  const [alert, setAlert] = useState('');
  const [open, setOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:8877/api/restaurantowner/restaurant/${resId}`)
      .then(response => {
        response.data[0].Ftime = response.data[0].Ftime.substr(11, 5)
        response.data[0].Ttime = response.data[0].Ttime.substr(11, 5)
        console.log(response.data[0]);
        setFormValues(response.data[0])
        setIsloading(false)
      })
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleInputCheckChange = (e) => {
    const { name, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: checked,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    const fd = serialize(formValues)
    axios({
      method: 'put',
      url: `http://localhost:8877/api/restaurantowner/restaurant/${resId}`,
      data: fd
    })
      .then(response => {
        setAlert(<Alert variant='filled' severity="success">Done</Alert>)
        setOpen(true)
        setTimeout(() => {
          window.location.reload(false)
        }, 3000)
      })
      .catch(err => {
        setOpen(true)
        setAlert(<Alert onClose={handleClose} variant='filled' severity="warning">Please, Fill all Inputs</Alert>)
      })

  };

  return (
    <Box>
      {isloading
        ? 'loading'
        : (<form onSubmit={handleSubmit}>
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
            sx={{ padding: { xs: '10px', md: '30px 150px', lg: '50px 300px' }, maxWidth: '100%' }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', width: '100%' }}>
              <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Restaurant Name</Typography>
              <TextField
                sx={{
                  backgroundColor: "#fff",
                  width: { xs: '70%', md: '60%' },
                }}
                size="small"
                variant="outlined"
                name="name"
                type="text"
                defaultValue={formValues.name}
                onChange={handleInputChange}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center', marginTop: { xs: '10px', lg: '20px' }, width: '100%' }}>
              <Typography variant="p" sx={{ fontSize: { xs: '14px', md: '20px' }, width: { xs: '30%', md: '40%' } }}>Location</Typography>
              <TextField
                sx={{
                  backgroundColor: "#fff",
                  width: { xs: '70%', md: '60%' },
                }}
                size="small"
                variant="outlined"
                name="location"
                type="text"
                value={formValues.location}
                onChange={handleInputChange}
              />
            </Box>

            <Box>
              <Typography
                variant="h2"
                sx={{
                  color: "var(--main-color)",
                  fontWeight: "500",
                  paddingTop: 5,
                  fontSize: { xs: '22px', md: '26px', lg: '35px' },
                }}
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
                    value={formValues.Ftime}
                    onChange={handleInputChange}
                  />
                  <Typography variant="p" sx={{ margin: { xs: '0 10px', md: '0 20px' } }}>
                    To
                  </Typography>
                  <input
                    id="timeTo"
                    name="Ttime"
                    type="time"
                    value={formValues.Ttime}
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
                      checked={formValues.sunday}
                      onChange={handleInputCheckChange}
                    />
                    <label style={{ marginLeft: '-5px' }}>Su</label>
                  </Box>
                  <Box sx={{ marginRight: '5px' }}>
                    <Checkbox
                      id="mo"
                      name="monday"
                      checked={formValues.monday}
                      onChange={handleInputCheckChange}
                    />
                    <label style={{ marginLeft: '-5px' }}>Mo</label>
                  </Box>
                  <Box sx={{ marginRight: '5px' }}>
                    <Checkbox
                      id="tu"
                      name="tuesday"
                      checked={formValues.tuesday}
                      onChange={handleInputCheckChange}
                    />
                    <label style={{ marginLeft: '-5px' }}>Tu</label>
                  </Box>

                  <Box sx={{ marginRight: '5px' }}>
                    <Checkbox
                      id="we"
                      name="wednesday"
                      checked={formValues.wednesday}
                      onChange={handleInputCheckChange}
                    />
                    <label style={{ marginLeft: '-5px' }}>We</label>
                  </Box>

                  <Box sx={{ marginRight: '5px' }}>
                    <Checkbox
                      id="thr"
                      name="thersday"
                      checked={formValues.thersday}
                      onChange={handleInputCheckChange}
                    />
                    <label style={{ marginLeft: '-5px' }}>Thr</label>
                  </Box>

                  <Box sx={{ marginRight: '5px' }}>
                    <Checkbox
                      id="fr"
                      name="friday"
                      checked={formValues.friday}
                      onChange={handleInputCheckChange}
                    />
                    <label style={{ marginLeft: '-5px' }}>Fr</label>
                  </Box>
                  <Box sx={{ marginRight: '5px' }}>
                    <Checkbox
                      id="st"
                      name="saterday"
                      checked={formValues.saterday}
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
                  color: "var(--main-color)",
                  fontWeight: "500",
                  paddingTop: 5,
                  fontSize: { xs: '22px', md: '26px', lg: '35px' },
                }}
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
                  value={formValues.phonenumber}
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
                  value={formValues.mobilenumber}
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
                  value={formValues.facebook}
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
                  value={formValues.instagram}
                  onChange={handleInputChange}
                />
              </Box>
            </Box>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "var(--primary)",
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
        </form>)

      }
    </Box>
  );
};;
export default Form;