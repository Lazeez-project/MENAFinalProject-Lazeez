import Path from './Routes'
import { Box } from "@mui/system"

const Layout = (props) => {
    return (
        <Box>
           <Path id={props.id} />
        </Box>
    )
}

export default Layout
