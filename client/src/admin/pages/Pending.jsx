import {useState,useEffect} from 'react'
import axios from 'axios';
import { Box } from '@mui/system'
import Skeleton from '@mui/material/Skeleton'
import Alert from "@mui/material/Alert";

import PendingBox from '../components/PendingBox'


const Pending = () => {
    
    
      const [pending, setPending] = useState([])
      const [isLoading, setIsLoading] = useState(true)
      const [reFetch, setReFetch] = useState(1)

    const activeResturant = (e, id) => {
        console.log('yes');
        console.log(id);
        axios({
            method : 'put',
            url : `http://localhost:8877/api/admin/pending/${id}`,
            data : 1
        }).then(response => {console.log(response)})
        .catch(err => alert('error'))

        setReFetch(reFetch + 1)
    };
    
    const deleteResturant = (e, id) => {
        setTimeout(()=>{
            setReFetch(id + 1)
        },1000)
        axios({
            method : 'delete',
            url : `http://localhost:8877/api/admin/pending/${id}`,
        })
    };

      useEffect(()=>{
        axios.get('http://localhost:8877/api/admin/pending')
        .then(response => {
            setPending(response.data)
            setIsLoading(false)
        })
    },[reFetch])


    return (
        <Box 
            sx={{
                maxWidth: '100%', 
                minHeight: '100vh', 
                padding: '50px', 
                display: 'flex', 
                flexWrap: 'wrap',
                alignContent: 'flex-start'
            }}>
            {
                isLoading ? Array.from(new Array(9)).map(item => (
                    <Box sx={{padding : '5px', width : '350px', backgroundColor : '#ddd',borderRadius : '5px', margin : '10px'}}>
                        <Skeleton width='95%' height='40px'/>
                        <Skeleton width='95%' height='40px'/>
                        <Skeleton width='95%' height='40px'/>
                        <Skeleton width='95%' height='40px'/>
                        <Box sx={{display : 'flex', justifyContent : 'space-around'}}>
                            <Skeleton width='49%' height='50px'/>
                            <Skeleton width='49%' height='50px'/>
                        </Box>
                    </Box>
                )) : pending.length > 0 ?
                    pending.map(res => (
                    <PendingBox active={activeResturant} delete={deleteResturant} key={res.id} data={res} />
                ))  : <Alert severity="info">There are not any Requests</Alert>
            }
        </Box>
    )
}

export default Pending
