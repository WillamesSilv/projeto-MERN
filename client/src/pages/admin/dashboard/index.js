import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import FooterAdmin from '../../../components/footer-admin';
import MenuAdmin from '../../../components/menu-admin';
import { getTypeUser } from '../../../services/auth';
import DashAdmin from './admin';
import DashGerente from './gerente';
import DashFuncionario from './funcionario';


const mdTheme = createTheme();

function DashboardContent() {

  function getDashBoard() {
    if(getTypeUser() === "1") {
      return <DashAdmin />
    }else if(getTypeUser() === "2") {
      return <DashGerente />
    }else{
      return <DashFuncionario />
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <MenuAdmin title={'DASHBOARD'}/>
        
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
              {getDashBoard()}
            </Grid>
            <FooterAdmin sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}


