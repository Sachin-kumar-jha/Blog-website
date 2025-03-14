import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosError } from 'axios';
import { SignupInput} from '@sachin.78dev/blog-common';
import { signin } from '../../type/signin';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`;

// export const signupUser = createAsyncThunk(
//   'auth/signupUser',
//   async (data:SignupInput, { rejectWithValue }) => {
//     try {
//       await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, data, { withCredentials: true });
//       return true;
//     } catch (err) {
//       const error = err as AxiosError<{ message: string }>;
//       return rejectWithValue(error.response?.data?.message || 'Signup failed');
//     }
//   }
// );

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (data: SignupInput, { rejectWithValue }) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, data, { 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json', // Ensure it's set
        },
      });
      return true; // success
    }catch(err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);


export const signinUser = createAsyncThunk(
  'auth/signinUser',
  async (data:signin, { rejectWithValue }) => {
    try {
       await axios.post(`${API_URL}/signin`,data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json', 
        },
        });
      return true;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);
