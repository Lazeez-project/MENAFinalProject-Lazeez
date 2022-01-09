import { useState } from 'react'
import Input from '../components/Input'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import { useParams } from 'react-router'
import axios from 'axios'

const AddMeal = () => {

    const { id } = useParams();

    const [mealname, setName] = useState('')
    const [mealprice, setPrice] = useState('')
    const [ingredints, setIngredints] = useState('')
    const [pictures, setPictures] = useState({})

    const [alert, setAlert] = useState('');
    const [open, setOpen] = useState(false);


    const makeMeal = (name, e) => {
        if (name === 'name') {
            setName(e.value)
        }
        else if (name === 'price') {
            setPrice(e.value)
        }
        else if (name === 'ingredints') {
            setIngredints(e.value)
        }
    }
    const makeMealImage = (name, e) => {
        setPictures(e.files[0])
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const sendData = () => {

        let fd = new FormData();
        fd.append('resId', id)
        fd.append('mealname', mealname)
        fd.append('price', parseInt(mealprice))
        fd.append('Ingredints', ingredints)
        fd.append('pictures', pictures)
        console.log(pictures);
        if (pictures.type === "image/jpeg" || pictures.type === "image/png" || pictures.type === "image/jpg") {
            axios({
                method: 'post',
                url: `http://localhost:8877/api/restaurantowner/restaurant/${id}/meals`,
                data: fd
            })
                .then(response => {
                    setAlert(<Alert variant='filled' severity="success">Meal has been Added</Alert>)
                    setOpen(true)
                    setTimeout(() => {
                        window.location.reload(false)
                    }, 1500)
                })
                .catch(err => {
                    setOpen(true)
                    setAlert(<Alert onClose={handleClose} variant='filled' severity="warning">Please, Fill all Inputs</Alert>)
                })
        }
        else {
            setOpen(true)
            setAlert(<Alert onClose={handleClose} variant='filled' severity="warning">Please, Add Picture</Alert>)
        }
    }

    return (
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
            <h2 className="page__title" style={{ fontSize: '40px', marginTop: '50px' }}>Add New Meal</h2>
            <Input inputValue={makeMeal} name="name" title="Meal's Name" plaseholder="The Meal Name" type="text" />
            <Input inputValue={makeMeal} name="price" title="Meal's Price" plaseholder="The Meal price" type="number" />
            <Input inputValue={makeMealImage} name="picture" title="Meal's Picture" type="file" />
            <Input inputValue={makeMeal} name="ingredints" title="Meal's Ingredints" plaseholder="The Meal Ingredints" type="text" />
            <Button variant="contained" color="success" onClick={sendData} sx={{ width: "200px", backgroundColor: 'var(--primary)', '&:hover': { backgroundColor: 'var(--secondary)' } }}>Add</Button>
        </Box>
    )
}

export default AddMeal
