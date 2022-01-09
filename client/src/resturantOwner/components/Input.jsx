import { Box } from '@mui/system'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CustomTheme from '../../assets/Theme';
import { ThemeProvider } from '@mui/material/styles';
const Input = (props) => {
    return (
        <ThemeProvider theme={CustomTheme}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px', width: '100%' }}>
                <Typography variant="h4" sx={{ color: 'var(--main-color)', fontSize: '1.5rem' }}>
                    {props.title}
                </Typography>
                <TextField
                    name={props.name}
                    defaultValue={props.value}
                    type={props.type}
                    variant="outlined"
                    label={props.placeholder}
                    sx={{ width: '50%', backgroundColor: '#fff' }}
                    onChange={(e) => props.inputValue(props.name, e.target)}
                />
            </Box>
        </ThemeProvider>
    );
}

export default Input
