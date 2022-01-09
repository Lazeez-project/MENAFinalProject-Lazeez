import { useState,useEffect } from "react";

import {Box} from "@mui/system";
import Button from "@mui/material/Button";
import Skeleton from '@mui/material/Skeleton';
import Numbers from "../../resturantOwner/components/Numbers";
import OwnerTable from "../../resturantOwner/components/OwnerTable";

import { useParams } from "react-router";
import axios from "axios";


const Orders = () => {
    const {id} = useParams()

    const header = [
        { field: 'name', headerName : 'Name', minWidth: 200 },
        { field: 'location', headerName : 'Location', minWidth: 200 },
        { field: 'phonenumber', headerName : 'Phone', minWidth: 150 },
        { field: 'email', headerName : 'Email', minWidth: 240 },
        { field: 'state', headerName : 'State', minWidth: 100 },
        {
            field: "Control",
            align : "center",
            minWidth: 300,
            renderCell: (cellValues) => {
                let isActive = cellValues.row.state == 1 ? true : false
                return  <div>
                            <Button
                                sx={{margin: "3px"}}
                                variant="contained"
                                color="primary"
                                size="small"
                                href={`updateRes/${cellValues.row.id}`}
                                >
                                Update
                            </Button>
    
                            <Button
                                size="small"
                                sx={{
                                    margin: "3px",
                                    backgroundColor: isActive ? '#E08E12' : '#07C13B',
                                    width: '92px',
                                    ':hover':{backgroundColor: isActive ? '#dfa900' : '#008000'}
                                }}
                                variant="contained"
                                onClick={(event) => {
                                    handleClickActive(event, cellValues);
                                }}
                                >
                                {isActive ? 'Disactive' : 'Active'}
                            </Button>
                            
    
                            <Button
                                sx={{margin: "3px"}}
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={(event)=>handleDeleteClick(event, cellValues.row.id)}
                                href={`#`}
                                >
                                Delete
                            </Button>

                        </div>;
            }
        }
    ]
    
    const [tableBody, setTableBody] = useState([])
    const [reFetch, setReFetch] = useState(1)
    const [numbers, setNumbers] = useState([])
    const [isloadingNum, setIsLoadingNum] = useState(true)
    
    const handleClickActive = (event, cellValues) => {
        if(cellValues.row.state === 1){
            console.log(cellValues.row.state);
            axios({
                method : 'put',
                url : `http://localhost:8877/api/admin/resDisactive/${cellValues.row.id}`,
                data : 2
            })
            .then(response => {})
            setReFetch(reFetch + 1);
        }
        else if(cellValues.row.state == 2) {
            axios({
                method : 'put',
                url : `http://localhost:8877/api/admin/resActive/${cellValues.row.id}`,
                data : 1
            })
            .then(response => {})
            setReFetch(reFetch + 1);
        }
    };

    const handleDeleteClick = (event, id) => {
        axios.delete(`http://localhost:8877/api/restaurantowner/restaurant/${id}`)
        .then(response => {
            window.location.reload(false)
        })
        .catch(err => window.location.reload(false))
        
        setReFetch(reFetch + 1)
        };

    useEffect(()=>{
        axios.get('http://localhost:8877/api/restaurantowner/restaurants')
        .then(response => setTableBody(response.data[0]))
        
        axios.get(`http://localhost:8877/api/admin/restaurants/numbers`)
        .then(response => {
            setNumbers(response.data)
            setIsLoadingNum(false)
        })
    },[reFetch])

    return (
        <Box sx={{maxWidth: '100%', minHeight: '100vh', padding: {xs : '5px' , md : '10px', lg : '20px'}}}>
            <Box 
                className="Number__Box" 
                sx={{
                    width: '100%',
                    padding: {xs : '10px 0', md : '10px 20px' , lg : '10px 40px'},
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap : 'wrap'
                }}
            >
                
                    {
                        isloadingNum ? Array.from(new Array(4)).map(item => (
                            <Box sx={{background : '#ddd',width : '250px', padding : 2, margin : '10px', borderRadius : '10px',display:'flex',flexDirection:'column',alignItems : 'center' }}>
                                <Skeleton width="100%" height="40px" sx={{marginBottom : '10px'}} />
                                <Skeleton width="70%" height="40px" />
                            </Box>
                        )) : numbers.map(item => (
                            <Numbers key={item.id} title={item.name} num={item.count} background={item.background} />
                        ))
                    }
                
            </Box>
            <OwnerTable header={header} body={tableBody} />
        </Box>
    )
}

export default Orders
