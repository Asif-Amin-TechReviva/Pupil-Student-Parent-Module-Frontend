import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// project-imports
import AuthCard from './AuthCard';

// assets
import AuthSideImg from 'assets/images/auth/login2.jpg';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper2({ children }) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.paper'
        }}
      >
        <Grid item xs={12} style={{backgroundColor:'#fcfbfb'}}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
          >
            <Grid item md={7} sx={{ display: { xs: 'none', md: 'flex' }, alignSelf: 'center', justifyContent: 'flex-start' }}>
              <img src={AuthSideImg} alt="Authimg" style={{ height: '100vh', minHeight: '100%', width: '100%' }} />
            </Grid>
            <Grid item md={5} sx={{ display: 'flex', justifyContent: 'center' }} >
              <AuthCard border={false}>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

AuthWrapper2.propTypes = { children: PropTypes.node };
