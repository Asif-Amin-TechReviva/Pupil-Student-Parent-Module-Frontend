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

const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded = jwtDecode(serviceToken);
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          const userDetailsString = localStorage.getItem('userDetails');
          const user = userDetailsString ? JSON.parse(userDetailsString) : null;

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
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

  // const login = async (email, password) => {
  //   try {
  //     // Make the API call
  //     const response = await axios.post('https://api.qa.lx-medical2.techreviva.com/v1/auth/admin-login', {
  //       email,
  //       password
  //     });
      
  //     // Extract user data from the response
  //     const { user } = response.data;
  
  //     // Hardcoded service token (for testing only)
  //     const serviceToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4NjllNjRlLWIyMzItNDIzMC05OGY0LWI5MWNjYzg2NzkzOSIsImlhdCI6MTcyMzAxOTM1NH0.BcJTbmTm8OAUEgRXOPpKL0KrMvByjfdGrN4_vdRhKMk';
      
  //     // Set session with the hardcoded token
  //     setSession(serviceToken);
  
  //     // Dispatch login action with user data
  //     dispatch({
  //       type: LOGIN,
  //       payload: {
  //         isLoggedIn: true,
  //         user
  //       }
  //     });
  //   } catch (err) {
  //     // Log the error for debugging
  //     console.error('Login error:', err);
  
  //     // Re-throw the error for handling in the component
  //     throw err;
  //   }
  // };
  

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/admin-login', {
        email,
        password
      });
      const user  = response.data;
      localStorage.setItem('userDetails', JSON.stringify(user));
      const placeholderToken = 'temporary-token-for-navigation';

      setSession(placeholderToken);

      // Dispatch login action with user data
      // dispatch({
      //   type: LOGIN,
      //   payload: {
      //     isLoggedIn: true,
      //     user
      //   }
      // });
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const authenticate_me = async (userId, OTP) => {
    try {
      const response = await axios.post('/auth/authenticate-admin', {
        userId,
        OTP
      });
      const { serviceToken, user } = response.data;
      setSession(serviceToken);
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user
        }
      });
    } catch (err) {
      console.error('Authentication error:', err);
      throw err;
    }
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

  const resetPassword = async (email) => {
    console.log('email - ', email);
    window.localStorage.setItem('email', email);

    try {
      const response = await axios.post('/auth/send-OTP', { email });
      // navigation('/auth/code-verification');
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
      // Assuming the response contains user information or token
      setUser(response.data.user);
      // Handle the success case, e.g., storing token or navigating
      return response.data;
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      throw error;
    }
  };

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, authenticate_me,verifyOtp,logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
