
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation } from 'react-router-dom';

// third-party
import OtpInput from 'react18-input-otp';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { ThemeMode } from 'config';
import useAuth from 'hooks/useAuth';
import { openSnackbar } from 'api/snackbar'; // Import the openSnackbar function
import axiosServices from 'utils/axios';
import ColorScheme from 'components/Customization/ColorScheme';

// ============================|| STATIC - CODE VERIFICATION ||============================ //

export default function AuthCodeVerification() {
  const theme = useTheme();
  const [otp, setOtp] = useState('');
  const [isResendEnabled, setIsResendEnabled] = useState(true); // Controls whether the button is enabled or not
  const [timer, setTimer] = useState(15); // Timer to count down from 15 seconds
  const [countdownInterval, setCountdownInterval] = useState(null); // Holds the interval ID
  const userDetailsString = localStorage.getItem('userDetails');
  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const borderColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[200] : theme.palette.secondary.light;
  const userId = userDetails?.data?.id;
  const { isLoggedIn, authenticate_me, verifyOtp, resendOtp } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const isAuthenticating = state?.isAuthenticating ?? false;

  // Function to send OTP
  const sendOtp = async (email) => {
    try {
      const response = await axiosServices.post('/auth/forgot-password', { email });
      return response.data; 
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };

  // Handle OTP submission
  const handleSubmit = async () => {
    try {
      const otpAsNumber = Number(otp);
      if (isNaN(otpAsNumber)) {
        openSnackbar({
          open: true,
          message: 'Invalid OTP. Please enter a valid number.',
          variant: 'alert',
          alert: { color: 'error' },
        });
        return;
      }

      if (isAuthenticating) {
        // Verify OTP API call
        await verifyOtp(otpAsNumber);
        openSnackbar({
          open: true,
          message: 'OTP verified successfully!',
          variant: 'alert',
          alert: { color: 'success' },
        });
        navigate('/auth/reset-password');
      } else {
        // Authenticate API call
        await authenticate_me(userId, otpAsNumber);
        openSnackbar({
          open: true,
          message: 'Authentication successful!',
          variant: 'alert',
          alert: { color: 'success' },
        });
        navigate('/dashboard/default');
      }
    } catch (error) {
      openSnackbar({
        open: true,
        message: error.message || 'Operation failed.',
        variant: 'alert',
        alert: { color: 'error' },
      });
    }
  };

  // Resend OTP with 15 seconds cooldown
  const handleResendOtp = async () => {
    try {
      openSnackbar({
        open: true,
        message: 'Resending OTP...',
        variant: 'alert',
        alert: { color: 'info' },
      });

      // Disable the button and start the timer
      setIsResendEnabled(false);
      setTimer(15); // Set the timer to 15 seconds

      // Start the countdown
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval); // Stop the countdown when it reaches 0
            setIsResendEnabled(true); // Enable the button again
            return 15; // Reset the timer to 15 seconds
          }
          return prev - 1; // Decrease the timer by 1 each second
        });
      }, 1000);

      // Store the interval ID to clean it up later if needed
      setCountdownInterval(interval);

      // Retrieve the email from localStorage
      const email = localStorage.getItem('ResendEmail'); // Assuming the email is stored in 'ResendEmail' in localStorage
      console.log('Sending OTP to:', email); // Log to make sure email is there
      if (email) {
        await sendOtp(email);
        console.log('OTP sent successfully');
      } else {
        openSnackbar({
          open: true,
          message: 'Email not found in localStorage.',
          variant: 'alert',
          alert: { color: 'error' },
        });
      }
    } catch (error) {
      openSnackbar({
        open: true,
        message: 'Failed to resend OTP. Please try again.',
        variant: 'alert',
        alert: { color: 'error' },
      });
    }
  };

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval); // Clear the countdown interval on unmount
      }
    };
  }, [countdownInterval]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <OtpInput
            value={otp}
            onChange={(otp) => setOtp(otp)}
            numInputs={6}
            isInputNum // Only allow numbers as OTP
            containerStyle={{ justifyContent: 'space-between' }}
            inputStyle={{
              width: '100%',
              margin: '8px',
              padding: '10px',
              border: '1px solid',
              borderColor: borderColor,
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
            <Button
              disableElevation
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={handleSubmit}
            >
              Continue
            </Button>
          </AnimateButton>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography>Not received Code?</Typography>
            <Typography
              variant="body1"
              sx={{
                minWidth: 85,
                ml: 2, 
                cursor: isResendEnabled ? 'pointer' : 'not-allowed', 
                color: '#4680ff' , 
              }}
              onClick={isResendEnabled ? handleResendOtp : undefined} 
              >
              {isResendEnabled ? 'Resend code' : `Resend in ${timer}s`}
              
            </Typography>
            </Stack>
            </Grid>


      </Grid>
    </>
  );
}