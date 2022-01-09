import Layout from "../components/Layout"
import Sidebar from "../components/Sidebar"
import {Box} from "@mui/system"
import { useParams } from "react-router"

const OwnerHome = () => {

    const {id} = useParams();

    return (
        <Box sx={{minWidth : '100%',maxWidth: '100%' ,display: 'flex'}}>
            <Sidebar id={id} />
            <Layout id={id} />
        </Box>
    )
}

export default OwnerHome
