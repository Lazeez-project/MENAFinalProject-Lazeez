import { Box } from '@mui/system'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'

// Icons
import DeleteIcon from '@mui/icons-material/Delete'

const Massage = (props) => {
    console.log(props);
    return (
        <Box sx={{
            minWidth: '100%',
            margin: { xs: '5px', lg: '10px' },
            padding: 0,
            backgroundColor: '#fff',
            border: '2.5px solid var(--primary)',
            borderRadius: '8px',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>

            <Box sx={{
                width: "100%",
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 20px',
                borderBottom: '2px solid #777777',
                backgroundColor: 'var(--primary)'
            }}>
                <Typography variant='body1' sx={{ fontWeight: 500, color: '#ddd' }}>{props.name}</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#ddd' }}>{props.email}</Typography>
            </Box>
            <Box sx={{ margin: '0 20px', display: 'flex', justifyContent: 'space-between' }}>
                <Checkbox checked={props.isread == 1 ? true : false} onClick={(e) => props.active(props.id, e.target.checked)} />
                <Box>
                    <IconButton onClick={() => props.delete(props.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Box>
            <Typography variant="body1" component='h6' sx={{ padding: '0 20px 5px', color: '#666' }}>
                {props.massage}
            </Typography>
        </Box>
    );
};

export default Massage