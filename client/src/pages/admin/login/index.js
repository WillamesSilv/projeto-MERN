import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { login, setIdUser, setNameUser, setTypeUser } from '../../../services/auth';
import api  from '../../../services/api';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Curso M.E.R.N.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [ email, setEmail] = React.useState("")
  const [ senha, setSenha] = React.useState("")
  const [ showPassword, setShowPassword ] = React.useState(false)
  const [ loading, setLoading ] = React.useState(false)

  async function handleSubmitData() {
    setLoading(true)
      await api.post('/api/users/login', {email, senha})
      .then(res => {
          if(res.status === 200){
            if(res.data.status === 1) {
                login(res.data.token)
                setIdUser(res.data.id_client)
                setNameUser(res.data.user_name)
                setTypeUser(res.data.user_type)

                window.location.href='/admin'
            }else if(res.data.status === 2){
                alert("Atenção: "+ res.data.erro)
            }
            setLoading(false)
          }else {
              alert("Erro no servidor")
              setLoading(false)
          }
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <FormControl sx={{ mt: 1 }} variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password" required>Senha</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={senha}
                onChange={e => setSenha(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={e => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, padding: 2 }}
              onClick={handleSubmitData}
              disabled={loading}
            >
                {loading ? <CircularProgress color="primary" /> : "Entrar"}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
