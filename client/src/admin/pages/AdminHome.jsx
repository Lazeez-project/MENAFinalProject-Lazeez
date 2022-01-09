import Layout from "../components/Layout"
import Sidebar from "../components/Sidebar"
import {Box} from "@mui/system"
import { useParams } from "react-router"

const Home = () => {

    const {id} = useParams();

    return (
        <Box sx={{display: 'flex'}}>
            <Sidebar id={id} />
            <Layout id={id} />
        </Box>
    )
}

export default Home
