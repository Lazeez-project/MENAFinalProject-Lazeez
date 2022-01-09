import Typography from '@mui/material/Typography'
import Paper from "@mui/material/Paper"
import CustomTheme from '../../assets/Theme';
import { ThemeProvider } from '@mui/styles';
const Numbers = (props) => {
    return (
        <ThemeProvider theme={CustomTheme}>
            <Paper
                className="numCard"
                elevation="3"
                sx={{
                    minWidth: "250px",
                    p: 2,
                    display: "inline-block",
                    textAlign: "center",
                    borderRadius: "10px",
                    border: `2px solid ${props.background}`,
                    margin: '10px',
                }}>
                <Typography variant="h4" marginBottom sx={{ fontWeight: 700, color: props.background }}>
                    {props.title}
                </Typography>
                <Typography variant="h4" borderBottom sx={{ color: '#666' }}>
                    {props.num}
                </Typography>
            </Paper>
        </ThemeProvider>
    );
};

export default Numbers
