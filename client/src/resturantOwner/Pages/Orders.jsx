import { useState, useEffect } from 'react';
import axios from 'axios'
import { Box } from "@mui/system";
import Skeleton from '@mui/material/Skeleton';
import Numbers from "../components/Numbers";
import OwnerTable from "../components/OwnerTable";
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useParams } from "react-router";
import CustomTheme from '../../assets/Theme';
import { ThemeProvider } from '@mui/styles';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
const Orders = () => {

    const header = [
        { field: 'name', headerName: 'Username', minWidth: 219, },
        { field: 'location', headerName: 'Location', minWidth: 219, },
        { field: 'phonenumber', headerName: 'Phone No.', minWidth: 191, },
        { field: 'email', headerName: 'Email', minWidth: 191, },
        { field: 'create_time', headerName: 'Creation Time', minWidth: 191, ttype: 'dateTime', valueGetter: ({ value }) => value && new Date(value) },
        { field: 'numberofseats', headerName: 'Seats No.', minWidth: 10, },
        { field: 'ordertype', headerName: 'Type', minWidth: 20, },
        { field: 'order_time', headerName: 'Time', minWidth: 20, },
        { field: 'mealname', headerName: 'Meal', minWidth: 219, },
        { field: 'count', headerName: 'Count', minWidth: 10, },
        { field: 'price', headerName: 'Price', minWidth: 10, renderCell: (cellvalues) => cellvalues.row.price[0] },
        {
            field: 'state', renderCell: (cellValues) => {
                if (cellValues.row.state === 0) {
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton size='small' disabled >
                                <ArrowBackIosRoundedIcon fontSize='10px' />
                            </IconButton>
                            <p style={{ color: '#f66', margin: '0 5px' }}>{'Waiting'}</p>
                            <IconButton size='small' onClick={() => convertState((cellValues.row.id), (cellValues.row.state + 1))}>
                                <ArrowForwardIosRoundedIcon fontSize='10px' />
                            </IconButton>
                        </Box>)
                }
                else if (cellValues.row.state === 1) {
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton size='small' onClick={() => convertState((cellValues.row.id), (cellValues.row.state - 1))}>
                                <ArrowBackIosRoundedIcon fontSize='10px' />
                            </IconButton>
                            <p style={{ color: '#fa5', margin: '0 5px' }}>{'Preparing'}</p>
                            <IconButton size='small' onClick={() => convertState((cellValues.row.id), (cellValues.row.state + 1))}>
                                <ArrowForwardIosRoundedIcon fontSize='10px' />
                            </IconButton>
                        </Box>
                    )
                }
                else if (cellValues.row.state === 2) {
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton size='small' onClick={() => convertState((cellValues.row.id), (cellValues.row.state - 1))}>
                                <ArrowBackIosRoundedIcon fontSize='10px' />
                            </IconButton>
                            <p style={{ color: '#5af', margin: '0 5px' }}>{'Finished'}</p>
                            <IconButton size='small' onClick={() => convertState((cellValues.row.id), (cellValues.row.state + 1))}>
                                <ArrowForwardIosRoundedIcon fontSize='10px' />
                            </IconButton>
                        </Box>
                    )
                }
                else if (cellValues.row.state === 3) {
                    return (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton size='small' onClick={() => convertState((cellValues.row.id), (cellValues.row.state - 1))}>
                                <ArrowBackIosRoundedIcon fontSize='10px' />
                            </IconButton>
                            <p style={{ color: '#5a5', margin: '0 5px' }}>{'Done'}</p>
                            <IconButton size='small' disabled >
                                <ArrowForwardIosRoundedIcon fontSize='10px' />
                            </IconButton>
                        </Box>
                    )
                }
            }, minWidth: 160
        }
    ]

    const [reFetch, setReFetch] = useState(1)

    const convertState = (listId, state) => {
        axios({
            method: 'put',
            url: `http://localhost:8877/api/restaurantowner/restaurant/${id}/orderstate`,
            data: { listId: listId, state: state }
        }).then(response => {
            setReFetch(reFetch + 1)
        })
            .catch(err => {
                window.location.reload(false)
            })
    }

    const [body, setBody] = useState([])
    const [numbers, setNumbers] = useState([])
    const [isloading, setIsLoading] = useState(true)
    const [isloadingNum, setIsLoadingNum] = useState(true)

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8877/api/restaurantowner/restaurant/${id}/orders`)
            .then(response => {
                setBody(response.data)
                setIsLoading(false)
            })

        axios.get(`http://localhost:8877/api/restaurantowner/restaurant/${id}/orders/numbers`)
            .then(response => {
                setNumbers(response.data)
                setIsLoadingNum(false)
            })
    }, [])

    return (
        <ThemeProvider theme={CustomTheme}>

            <Box sx={{ maxWidth: '100%', minHeight: '100vh', padding: { xs: '5px', md: '10px', lg: '20px' } }}>
                <Box
                    className="Number__Box"
                    sx={{
                        width: '100%',
                        padding: { xs: '10px 0', md: '10px 20px', lg: '10px 40px' },
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    }}
                >
                    {
                        isloadingNum ? Array.from(new Array(5)).map((item, index) => (
                            <Box key={index} sx={{ background: '#ddd', width: '250px', padding: 2, margin: '10px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Skeleton width="100%" height="40px" sx={{ marginBottom: '10px' }} />
                                <Skeleton width="70%" height="40px" />
                            </Box>
                        )) : numbers.map((item, index) => (
                            <Numbers key={index} title={item.name} num={item.count} background={item.background} />
                        ))
                    }
                </Box>
                <OwnerTable body={body} header={header} loading={isloading} />
            </Box>
        </ThemeProvider>
    )
}

export default Orders
