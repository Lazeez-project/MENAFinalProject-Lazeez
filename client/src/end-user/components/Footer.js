import Link from "@mui/material/Link";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsappRoundedIcon from "@mui/icons-material/WhatsappRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import CustomTheme from '../../assets/Theme';
import '../../App.css';
import { useState } from "react";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const FooterBox = {
    display: 'flex',
    flexDirection: { xs: 'row', md: 'column' },
    justifyContent: 'space-between',
    paddingLeft: 2,
}

const typoTitle = {
    color: "var(--dark-ternary)",
    textAlign: 'left',
    fontWeight: 'bold',
    pb: 3,
}

const socialLinks = {
    pb: 2,
    pl: 1,
    '&:hover': { color: "var(--dark-ternary)" }
}
const Footer = () => {

    const [contact, setContact] = useState({
        Fname: '',
        Lname: '',
        email: '',
        messege: ''
    });
    const [isSent, setSent] = useState(false);
    const vertical = 'bottom';
    const horizontal = 'right';
    const handleContact = (event) => {
        const { name, value } = event.target;
        setContact({
            ...contact,
            [name]: value,
        });
    }
    const handleSend = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8877/api//admin/msg',
            data: contact
        })
            .then((res) => {
                setContact({
                    Fname: '',
                    Lname: '',
                    email: '',
                    messege: ''
                });
                setSent(true);
            }).catch((err) => {
                console.log(err);
            })

    }
    return (
        <Box sx={{
            backgroundColor: "var(--primary)",
            pt: 8,
            pb: 6,
        }}
        >
            <ThemeProvider theme={CustomTheme}>
                <Container fixed >

                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' }
                    }}
                    >

                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={typoTitle}>Web Pages: </Typography>
                            <Box sx={FooterBox}>
                                <NavLink to="/" className="nav-link" style={{ borderBottom: 'none' }}>Home</NavLink>
                                <NavLink to="/restaurants" className="nav-link" >Restaurants</NavLink>
                                <NavLink to="/track" className="nav-link" >Order Track</NavLink>
                                <NavLink to="/about" className="nav-link">About</NavLink>
                                <NavLink to="/contact" className="nav-link">Contact</NavLink>
                            </Box>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={typoTitle}>Follow Us: </Typography>
                            <Box sx={FooterBox}>
                                <Link
                                    href="https://www.facebook.com/Lazeez-105861395321223/"
                                    target="_blank"
                                    underline="none"
                                    color="ternary.main"
                                    sx={socialLinks}
                                >
                                    <FacebookRoundedIcon sx={{ color: "#4267B2" }} /> Facebook
                                </Link>
                                <Link
                                    href="https://instagram.com/lazeez._.11?utm_medium=copy_link"
                                    target="_blank"
                                    underline="none"
                                    color="ternary.main"
                                    sx={socialLinks}
                                >
                                    <InstagramIcon sx={{ color: "#C13584" }} /> Instagram
                                </Link>
                                <Link
                                    href="https://web.whatsapp.com/"
                                    target="_blank"
                                    underline="none"
                                    color="ternary.main"
                                    sx={socialLinks}
                                >
                                    <WhatsappRoundedIcon sx={{ color: "#25D366" }} /> Whatsapp
                                </Link>
                                <Link
                                    href="https://github.com/"
                                    target="_blank"
                                    underline="none"
                                    color="ternary.main"
                                    sx={socialLinks}
                                >
                                    <GitHubIcon sx={{ color: "#333" }} /> GitHub
                                </Link>
                                <Link
                                    href="https://twitter.com"
                                    target="_blank"
                                    underline="none"
                                    color="ternary.main"
                                    sx={socialLinks}
                                >
                                    <TwitterIcon sx={{ color: '#1DA1F2' }} /> Twitter
                                </Link>
                            </Box>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={typoTitle}>Our Team: </Typography>
                            <Box sx={FooterBox}>
                                <Typography color="ternary.main" variant="body1" sx={{ pb: 2 }}>Mohamed Ubeid</Typography>
                                <Typography color="ternary.main" variant="body1" sx={{ pb: 2 }}>Mahmoud Nwiry</Typography>
                                <Typography color="ternary.main" variant="body1" sx={{ pb: 2 }}>Ashjan Nairat</Typography>
                                <Typography color="ternary.main" variant="body1" sx={{ pb: 2 }}>Nida Awawdeh</Typography>
                            </Box>
                        </Box>

                        <form id='footer' sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={typoTitle}>Contact Us: </Typography>
                            <Box sx={{ display: 'flex', flexDirection: "row", width: '100%', pl: 2 }}>
                                <TextField sx={{ backgroundColor: "var(--ternary)" }} fullWidth id="filled-basic" label="First Name" variant="filled" type="text" name="Fname" value={contact.Fname} onChange={handleContact} required />
                                <TextField sx={{ backgroundColor: "var(--ternary)", ml: 2 }} fullWidth id="filled-basic" label="Last Name" variant="filled" type="text" name="Lname" value={contact.Lname} onChange={handleContact} required />
                            </Box>
                            <br />
                            <Box sx={{ pl: 2 }}>
                                <TextField sx={{ backgroundColor: "var(--ternary)" }} fullWidth id="filled-basic" label="Email" variant="filled" type="email" name="email" value={contact.email} onChange={handleContact} required />
                                <br /><br />
                                <TextareaAutosize
                                    minRows={3}
                                    maxRows={4}
                                    aria-label="Message"
                                    placeholder="Message"
                                    style={{ backgroundColor: "var(--ternary)", width: '100%' }}
                                    name="messege"
                                    value={contact.messege} onChange={handleContact}
                                    required
                                />
                                <br />
                                <Button fullWidth sx={{ backgroundColor: "var(--ternary)", color: 'var(--primary)', border: "1px solid var(--ternary)", '&:hover': { backgroundColor: "var(--primary)", color: 'var(--ternary)' } }} onClick={handleSend}>Send</Button>
                            </Box>
                        </form>

                    </Box >
                </Container >
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={isSent}
                    onClose={() => setSent(false)}
                    key={'empty'}
                    autoHideDuration={2500}
                >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        {"Your Messege sent successfully >_0"}
                    </Alert>
                </Snackbar>
            </ThemeProvider >
        </Box >
    )
};

export default Footer
