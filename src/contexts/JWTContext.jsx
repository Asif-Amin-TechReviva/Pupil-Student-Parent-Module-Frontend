import { createContext, useEffect, useReducer } from 'react';
import { Chance } from 'chance';
import { jwtDecode } from 'jwt-decode';
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';
import Loader from 'components/Loader';
import axios from 'utils/axios'; // Make sure axios is configured correctly
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Import useNavigate

const chance = new Chance();

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  return decoded
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken && verifyToken(accessToken)) {
          // if (accessToken) {
          setSession(accessToken);
          const userDetailsString = localStorage.getItem('userDetails');
          const user = userDetailsString ? JSON.parse(userDetailsString) : null;
          // alert('helloo')
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          // alert('hdhhdhhdh')
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

 
  

  const login = async (schoolId, password) => {
    try {
      const response = await axios.post('/student/login', {
        schoolId,
        password
      });
      const accessToken= response.data.data.accessToken;
      const user= response.data.data.user;
      setSession(accessToken);
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user

        }
      });

    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const authenticate_me = async (userId, OTP) => {
    // try {
    //   const response = await axios.post('/auth/authenticate-admin', {
    //     userId,
    //     OTP
    //   });
    //   const { accessToken, user } = response.data.data.token;
    //   setSession(accessToken);
    //   dispatch({
    //     type: LOGIN,
    //     payload: {
    //       isLoggedIn: true,
    //       user
    //     }
    //   });
    // } catch (err) {
    //   console.error('Authentication error:', err);
    //   throw err;
    // }
  };
  
  const register = async (email, password, firstName, lastName) => {
    const id = chance.bb_pin();
    const response = await axios.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const sendOtp = async (email) => {
    console.log('email - ', email);
    window.localStorage.setItem('email', email);

    try {
      const response = await axios.post('/auth/send-OTP', { email });
      return response.data; 
      
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
  };
  const verifyOtp = async (email, OTP) => {
    try {
      const response = await axios.post('/auth/verify-OTP', {
        email,
        OTP
      });
      window.localStorage.setItem('resetToken', response.data.data.token);
      return response.data;
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      throw error;
    }
  };
  const resetPassword = async (newPassword,token) => {
    try {
      const response = await axios.post('/auth/reset-password', {
        newPassword,
        token
      });

      if (response.status === 200) {
        return { success: true };
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to reset password' };
    }
  };

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, authenticate_me,verifyOtp,sendOtp,logout, register, resetPassword, updateProfile, }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
