import * as React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';

import FooterAdmin from '../../../components/footer-admin';
import MenuAdmin from '../../../components/menu-admin';
import api from '../../../services/api';

const mdTheme = createTheme();

function UsuarioCadastrar() {

  const [nome, setNome] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [tipo, setTipo] = React.useState('')
  const [senha, setSenha] = React.useState('')

  async function handleSubmit() {
    const data = {
      name_user:nome, 
      email_user:email,
      type_user:tipo, 
      password_user:senha
    }

    if(nome !== '' && email !== '' && tipo !== '' && senha !== '') {
      const response = await api.post('/api/users', data)
      if(response.status === 200) {
        window.location.href='/admin/usuarios'
      }else {
        alert('Deu ruim')
      }
    }else {
      alert('Por Favor Preencha os campos')
    } 
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <MenuAdmin title={'USUÁRIOS'}/>
        
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
              <Paper
                  sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                  }}
                >
                  <h2>Cadastro de Usuário</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        id="nome"
                        name="nome"
                        label="Nome completo"
                        fullWidth
                        autoComplete="nome"
                        variant="standard"
                        value={nome}
                        onChange={ e => setNome(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        autoComplete="email"
                        variant="standard"
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl variant="standard" sx={{minWidth: "100%" }}>
                        <InputLabel id="labelTipo">Tipo</InputLabel>
                        <Select
                          labelId="labelTipo"
                          id="tipo"
                          value={tipo}
                          onChange={e => setTipo(e.target.value)}
                          label="Tipo"
                        >
                          <MenuItem value={1}>Adminstrador</MenuItem>
                          <MenuItem value={2}>Gerente</MenuItem>
                          <MenuItem value={3}>Funcionário</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        type="password"
                        required
                        id="senha"
                        name="senha"
                        label="Senha"
                        fullWidth
                        autoComplete="senha"
                        variant="standard"
                        value={senha}
                        onChange={ e => setSenha(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Button 
                      variant="contained" 
                      endIcon={<SaveIcon />} 
                      onClick={handleSubmit} 
                      sx={{marginLeft: "90%"}}
                      >
                        Salvar
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>

              </Grid>
              
            </Grid>
            <FooterAdmin sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <UsuarioCadastrar />;
}



  