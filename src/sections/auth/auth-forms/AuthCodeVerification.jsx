import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate,useLocation } from 'react-router-dom'; // Import useNavigate

// third-party
import OtpInput from 'react18-input-otp';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { ThemeMode } from 'config';
import useAuth from 'hooks/useAuth';

// ============================|| STATIC - CODE VERIFICATION ||============================ //

export default function AuthCodeVerification() {
  const theme = useTheme();
  const [otp, setOtp] = useState();
  const userDetailsString = localStorage.getItem('userDetails');
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const borderColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[200] : theme.palette.secondary.light;
  const userId = userDetails?.data?.id;
  const { isLoggedIn, authenticate_me ,verifyOtp} = useAuth();
  const navigation = useNavigate();
  const { state } = useLocation(); // Get state from useLocation
  const isAuthenticating = state?.isAuthenticating ?? false; // Default

  const handleSubmit = async () => {
    try {
      if (isAuthenticating) {
       const email =localStorage.getItem('email');
        // Call authenticate_me API
        await verifyOtp(email,otp);
        navigate('/password-reset');
      } else {
        // Call verify_otp API
          await authenticate_me(userId, otp);
          navigation('/dashboard/default');
      }
    } catch (error) {
      console.error('Operation failed:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <OtpInput
          value={otp}
          onChange={(otp) => setOtp(otp)}
          numInputs={6}
          containerStyle={{ justifyContent: 'space-between' }}
          inputStyle={{
            width: '100%',
            margin: '8px',
            padding: '10px',
            border: '1px solid',
            borderColor: { borderColor },
            borderRadius: 4,
            ':hover': { borderColor: theme.palette.primary.main }
          }}
          focusStyle={{
            outline: 'none',
            boxShadow: theme.customShadows.primary,
            border: '1px solid',
            borderColor: theme.palette.primary.main
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <AnimateButton>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained"
           onClick={handleSubmit}
          >
            Continue
          </Button>
        </AnimateButton>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
          <Typography>Not received Code?</Typography>
          <Typography variant="body1" sx={{ minWidth: 85, ml: 2, textDecoration: 'none', cursor: 'pointer' }} color="primary">
            Resend code
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
