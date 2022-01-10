import { useState, useEffect } from "react"
import Typography from "@mui/material/Typography"
import { Box, fontSize } from '@mui/system'
import MealCardOwner from "../components/MealCardOwner"
import { useParams } from "react-router"
import axios from "axios"
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import CustomTheme from '../../assets/Theme';
import { ThemeProvider } from '@mui/styles';

const MyMeals = () => {


    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { id } = useParams();

    useEffect(() => {
        axios(`http://localhost:8877/api/restaurantowner/restaurant/${id}/meals`)
            .then(result => {
                setMeals(result.data)
                setIsLoading(false)
            })
    }, [])


    return (
        <ThemeProvider theme={CustomTheme}>
            <Box sx={{ width: '100%', minHeight: '100vh', padding: { xs: '10px', lg: '50px' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: "15px 0" }}>
                    <Typography
                        variant="h3"
                        sx={{
                            marginLeft: '18px',
                            fontWeight: 600,
                            color: 'var(--primary)',
                            fontSize : '30px'
                        }}>
                        My Meals :
                    </Typography>
                </Box>
                <Box sx={{ flexWrap: 'wrap', display: 'flex', }}>
                    {
                        isLoading
                            ? Array.from(new Array(3)).map((skeletn, index) => (
                                <Box sx={{ padding: '5px', width: '350px', backgroundColor: '#ddd', borderRadius: '5px', margin: '10px' }} key={index}>
                                    <Skeleton width='100%' height='300px' sx={{ marginBottom: '-50px', marginTop: '-65px' }} />
                                    <Skeleton width='80%' height='50px' />
                                    <Skeleton width='60%' height='30px' />
                                    <Skeleton width='60%' height='30px' />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <Skeleton width='30%' height='20px' />
                                        <Skeleton width='30%' height='20px' />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <Skeleton width='30%' height='20px' />
                                        <Skeleton width='30%' height='20px' />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <Skeleton width='45%' height='50px' />
                                        <Skeleton width='45%' height='50px' />
                                    </Box>
                                </Box>
                            ))
                            : meals.length > 0
                                ? meals.map((item,index) => (
                                    <MealCardOwner key={index} meal={item} />
                                ))
                                : <Alert severity="warning">You don't have any Meals, Please add some Meals</Alert>
                    }
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default MyMeals
