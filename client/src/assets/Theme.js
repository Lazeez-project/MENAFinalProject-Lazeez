import { createTheme } from '@mui/material/styles';
import '../App.css'
/*const primaryColor = '#654c2e';
const secondaryColor = '#836b5d';*/
const CustomTheme = createTheme({
    palette: {
        primary: {
            main: '#007200',
            contrastText: 'white',
        },
        secondary: {
            main: '#45CE67',
        },
        ternary: {
            main: '#e7e7e7',
        }
    }
});

export default CustomTheme;