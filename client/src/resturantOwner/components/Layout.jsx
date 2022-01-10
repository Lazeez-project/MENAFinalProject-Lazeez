import Path from './Routes'
import { Box } from "@mui/system"

const Layout = (props) => {
    return (
        <Box sx={{width : '100%'}}>
           <Path id={props.id} />
        </Box>
    )
}

export default Layout
