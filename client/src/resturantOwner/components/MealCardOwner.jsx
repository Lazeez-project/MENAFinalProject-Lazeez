import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router';
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import CustomTheme from '../../assets/Theme';
import { ThemeProvider } from '@mui/styles';

const MealCardOwner = (props) => {

    const { id } = useParams()
    const meal = { ...props.meal }

    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alert, setAlert] = useState('');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const deleteMeal = () => {
        axios.delete(`http://localhost:8877/api/restaurantowner/restaurant/${id}/meal/${meal.id}`)
            .then(response => {
                window.location.reload(false)
            })
            .catch(err => {
                setAlertOpen(true)
                setAlert(<Alert onClose={handleClose} variant='filled' severity="warning">Oops, Somthing happend, please try again</Alert>)
            })
    }

    return (
        <ThemeProvider theme={CustomTheme}>
            <Card sx={{ maxWidth: 340, boxShadow: "0 10px 20px #00000033", margin: '18px' }} >
                <Snackbar
                    autoHideDuration={6000}
                    open={alertOpen}
                    onClose={handleAlertClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    message="The Username or Password is not exist"
                    key={'top' + 'center'}
                >
                    {alert}
                </Snackbar>
                <CardMedia
                    component="img"
                    height="200"
                    image={require(`../../../public/Images/${meal.pictures}`).default}
                    alt={meal?.name}
                />
                <CardContent>
                    <Typography variant="h4" component="div" className="card__title" sx={{ fontSize: '40px', fontWeight: '500' }}>
                        {meal?.mealname}
                    </Typography>
                    <Typography gutterBottom variant="p" className="card__rate">
                        Rate : <Rating name="read-only" value={meal?.rate} readOnly />
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Ingredints :
                        <ul className="ingredints">
                            {
                                (meal.Ingredients !== null) ?
                                    meal.Ingredients.split(',').map(item => (
                                        <li key={meal.id}>{item}</li>
                                    ))
                                    : ''
                            }
                        </ul>
                    </Typography>
                    <div className="card__footer">
                        <Typography variant="h5" className="price">
                            Price : <span>{`${meal?.price}$`}</span>
                        </Typography>
                        <div className="card__inputs">
                            <Button href={`editmeal/${meal?.id}`} variant="contained" className="btn" style={{ backgroundColor: 'var(--primary)', marginBottom: '10px' }}>Edit</Button>
                            <Button variant="contained" onClick={handleClickOpen} sx={{ backgroundColor: '#ac0808', '&:hover': { backgroundColor: 'rgb(79 0 0)' }, mb: '10px', ml: '10px' }}>Delete</Button>


                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Are your sure?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        You are going to Remove and Cansel all Orders, Thoose ordered with this meal
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Disagree</Button>
                                    <Button onClick={() => {
                                        deleteMeal();
                                        handleClose();
                                    }} autoFocus>
                                        Agree
                                    </Button>
                                </DialogActions>
                            </Dialog>

                        </div>
                    </div>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};

export default MealCardOwner
