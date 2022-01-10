import { useState, useEffect } from "react"
import Input from '../components/Input'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import { useParams } from "react-router"
import axios from 'axios'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import CustomTheme from '../../assets/Theme';
import { ThemeProvider } from '@mui/styles';

const EditMeal = () => {

    const { id, mealId } = useParams();

    const [meal, setMeal] = useState({})
    const [isLoading, setIsloading] = useState(true)


    const [alert, setAlert] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8877/api/restaurantowner/restaurant/${id}/meal/${mealId}`)
            .then(response => {
                setMeal(response.data[0])
                setIsloading(false)
            })
    }, [])

    const makeMeal = (name, e) => {
        setMeal((prevState) => ({
            ...prevState,
            [name]: e.value
        }))
    }

    const makeMealImage = (name, e) => {
        setMeal((prevState) => ({
            ...prevState,
            [name]: e.files[0]
        }))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const sendData = () => {
        let fd = new FormData();
        fd.append('id', meal.id)
        fd.append('resId', meal.resId)
        fd.append('mealname', meal.mealname)
        fd.append('price', parseInt(meal.price))
        fd.append('Ingredints', meal.Ingredients)
        fd.append('newpictures', meal.newpictures)
        fd.append('pictures', meal.pictures)

        axios({
            method: 'put',
            url: `http://localhost:8877/api/restaurantowner/restaurant/${id}/meal/${meal.id}`,
            data: fd
        })
            .then(response => {
                setAlert(<Alert variant='filled' severity="success">Meal has been Edited</Alert>)
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
                {
                    isLoading
                        ? 'loading'
                        : <>
                            <h2 className="page__title" style={{ fontSize: '70px' }}>Edit Meal</h2>
                            <Input inputValue={makeMeal} value={meal.mealname} name="mealname" title="Meal's Name" plaseholder="The Meal Name" type="text" />
                            <Input inputValue={makeMeal} value={meal.price} name="price" title="Meal's Price" plaseholder="The Meal price" type="number" />
                            <Input inputValue={makeMealImage} name="newpictures" title="Meal's Picture" type="file" />
                            <Input inputValue={makeMeal} value={meal.Ingredients} name="Ingredients" title="Meal's Ingredints" plaseholder="The Meal Ingredints" type="text" />
                            <Button variant="contained" color="success" onClick={sendData} sx={{ width: "200px", height: '50px', backgroundColor: 'var(--primary)' }}>Edit</Button>
                        </>
                }
            </Box>
        </ThemeProvider>
    );
};

export default EditMeal
