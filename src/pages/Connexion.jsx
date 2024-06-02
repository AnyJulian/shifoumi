import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { enregistrement } from '../services/apiBackend';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    orange: {
      main: '#ff8906',
      secondary: 'black',
      light: 'red',
      dark: '#D67000',
      contrastText: 'white',
    },
  },
});

function SignInSide() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await enregistrement(username, password, navigate);
    if (!response) {
        console.log("Login failed");
    };
  };



  return (
    
    <ThemeProvider theme={theme}>
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <Box
            sx={{
              my: "50%",
              mx: 4,
              p:3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.21)',
              borderRadius: '16px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(6.7px)',
              WebkitBackdropFilter: 'blur(6.7px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              color:'white',
              
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#ff8906' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color={'white'}>
              Connexion
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nom d'utilisateur"
                name="username"
                autoComplete="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoFocus
                color="orange"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                color="orange"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="orange"
                sx={{ mt: 3, mb: 2}}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;