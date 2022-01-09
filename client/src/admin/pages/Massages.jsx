import { useState, useEffect } from 'react'
import axios from 'axios'
import { Box } from '@mui/system'
import Massage from '../components/Massage'
import Skeleton from '@mui/material/Skeleton'
import Alert from "@mui/material/Alert";

const Massages = () => {

    const [msgs, setMsgs] = useState([]);
    const [reFetch, setReFatch] = useState(1)
    const [isloading, setIsloading] = useState(true)

    const activeMessages = (id, value) => {
        console.log(value, "This is valueee");
        axios({
            method: 'put',
            url: `http://localhost:8877/api/admin/messages/${id}`,
            data: { isread: value }
        }).then((response) => console.log(response));

        setReFatch(reFetch + 1)
    }

    const deleteMessage = (id) => {

        setTimeout(() => {
            setReFatch(reFetch + 1)
        }, 1000)

        axios({
            method: "delete",
            url: `http://localhost:8877/api/admin/messages/${id}`,
        }).then((response) => console.log(response));
    };

    useEffect(() => {
        axios
            .get("http://localhost:8877/api/admin/messages")
            .then(response => {
                setMsgs(response.data)
                setIsloading(false)
            });
    }, [reFetch]);

    return (
        <Box sx={{ margin: '0 auto', width: '100%', minHeight: '60vh', padding: { xs: '10px', md: '30px', lg: '50px' }, display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start' }}>
            {
                isloading ? Array.from(new Array(4)).map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: '100%',
                            backgroundColor: '#ddd',
                            borderRadius: '5px',
                            margin: '10px',
                            overflow: 'hidden',
                            borderRadius: '8px'
                        }}>
                        <Box sx={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', backgroundColor: '#cfcfcf' }}>
                            <Skeleton width='200px' height='50px' />
                            <Skeleton width='300px' height='50px' />
                        </Box>
                        <Box sx={{ padding: '0 20px', }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Skeleton width='35px' height='50px' />
                                <Skeleton width='35px' height='50px' />
                            </Box>
                            <Skeleton width='100%' height='40px' />
                        </Box>
                    </Box>
                )) : msgs.length > 0 ?
                    msgs.map(msg => (
                        <Massage active={activeMessages} delete={deleteMessage} key={msg.id} isread={msg.isread} id={msg.id} name={`${msg.Fname} ${msg.Lname}`} email={msg.email} massage={msg.massege} />
                    )) : <Alert severity="info">There are not any Messages</Alert>
            }
        </Box>
    )
}

export default Massages
