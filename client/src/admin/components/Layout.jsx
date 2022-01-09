import { Box } from "@mui/system"
import Path from './Router'

const Layout = (props) => {
    return (
        <Box sx={{width: '100%'}}>
           <Path id={props.id} />
        </Box>
    )
}

export default Layout
