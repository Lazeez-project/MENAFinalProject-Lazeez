import axios from "axios"
import Box from "@mui/system/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const PendingBox = (props) => {

    const data = { ...props.data }

    return (
        <Box sx={{
            minWidth: '300px',
            maxWidth: { xs: '300px', lg: '350px' },
            margin: { xs: '5px', md: '10px', lg: '20px' },
            backgroundColor: 'var(--ternary)',
            border: '2px solid var(--secondary)',
            borderRadius: '10px',
            padding: { xs: '10px', md: '20px' },
            margin: '20px'
        }}>
            <Typography variant="h6" component="div">
                Name : <Typography variant="body1" component="span">{data.name}</Typography>
            </Typography>
            <Typography variant="h6" component="div">
                Location : <Typography variant="body1" component="span">{data.location}</Typography>
            </Typography>
            <Typography variant="h6" component="div">
                Email : <Typography variant="body1" component="span">{data.email}</Typography>
            </Typography>
            <Typography variant="h6" component="div">
                Phone Number : <Typography variant="body1" component="span">{data.phoneNumber}</Typography>
            </Typography>

            <Button
                onClick={(e) => props.active(e, data.id)}
                sx={{
                    backgroundColor: 'var(--primary)',
                    color: '#fff',
                    width: '140px',
                    display: 'inline-block',
                    margin: '0 5px',
                    marginTop: '20px',
                    textAlign: 'center',
                    ':hover': { backgroundColor: '#009200' }
                }}
            >Active</Button>
            <Button
                href="#"
                onClick={(e) => props.delete(e, data.id)}
                sx={{
                    backgroundColor: '#aa0000',
                    color: '#fff',
                    width: '140px',
                    display: 'inline-block',
                    margin: '0 5px',
                    marginTop: '20px',
                    textAlign: 'center',
                    ':hover': { backgroundColor: '#ee0000' }
                }}
            >Delete</Button>

        </Box>
    )
}

export default PendingBox
