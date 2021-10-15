import * as React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import LinearProgress from '@mui/material/LinearProgress';


import FooterAdmin from '../../../components/footer-admin';
import MenuAdmin from '../../../components/menu-admin';
import api from '../../../services/api';
import { getNameType } from '../../../functions/static.data';


const mdTheme = createTheme();

function UsuariosListagem() {

  const [usuarios, setUsuarios] = React.useState([]);
  const [ loading, setLoading ] = React.useState(true)


  React.useEffect(() => {
    async function loadUsuarios() {
      const response = await api.get('/api/users')
      setUsuarios(response.data)
      setLoading(false)
    }
    loadUsuarios()
  }, [])

  async function handleDelete(id) {
    if(window.confirm('Deseja realmente deletar este usuário?')) {
      var result = await api.delete('/api/users/'+id)
      if(result.status === 200 ) {
        window.location.href = '/admin/usuarios'
      } else {
        alert('Ocorreu um erro, tente novamente')
      }
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
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 500,
                  }}
                >
                  <h2>Lista de Usuários</h2>
      
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <Button 
                        style={{marginBottom: 10}}
                        variant="contained" 
                        size="small" 
                        endIcon={<AddIcon />}
                        href={'/admin/usuarios/cadastrar'}
                        >
                          Cadastrar
                      </Button>
                      <TableContainer component={Paper}>
                        
                        {loading?(<LinearProgress style={{margin: "200px auto", width: "70vw"}} />):(
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nome</TableCell>
                              <TableCell align="left">Email</TableCell>
                              <TableCell align="left">Tipo</TableCell>
                              <TableCell align="left">Data do Cadastro</TableCell>
                              <TableCell align="center">Opções</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {usuarios.map((row) => (
                              <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.name_user}
                                </TableCell>
                                <TableCell align="left">{row.email_user}</TableCell>
                                <TableCell align="left">{getNameType(row.type_user)}</TableCell>
                                <TableCell align="left">{new Date(row.createdAt).toLocaleDateString('pt-br')}</TableCell>
                                <TableCell align="right">
                                <ButtonGroup size="small" aria-label="small button group">
                                  <Button 
                                  style={{marginRight: 5}}
                                  variant="contained" 
                                  size="small" 
                                  endIcon={<UpdateIcon />}
                                  href={'/admin/usuarios/editar/'+row._id}
                                  >
                                    Atualizar
                                  </Button>
                                  <Button 
                                  variant="contained" 
                                  color="error" 
                                  size="small" 
                                  endIcon={<DeleteIcon />}
                                  onClick={() => handleDelete(row._id)}
                                  >
                                    Deletar
                                  </Button>
                                </ButtonGroup>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>)}
                      </TableContainer>
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
  return <UsuariosListagem />;
}


