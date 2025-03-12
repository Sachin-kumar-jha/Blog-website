import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCurrentBlog,setLoading} from '../slice/blogSlice';
import axios from 'axios';
import { AxiosError } from 'axios';

export const fetchBlogById = createAsyncThunk(
  'blog/fetchById',
  async (id:string, { dispatch }) =>{
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`,
        {
        withCredentials:true,
        headers: {
          'Content-Type': 'Authorization', 
      },
        }
      );
      const data = await response.data;
      dispatch(setCurrentBlog(data.blog));
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Failed to fetch blog:', error);
      dispatch(setLoading(false));
    }
  }
);



export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`,
        {
          withCredentials:true,
          headers: {
            'Content-Type': 'application/json', 
        },
        }
      );
      return { id, message: response.data.message };
    } catch(err){
      const error = err as AxiosError<{ message: string }>; // Specify Axios error type
      return rejectWithValue(error.response?.data?.message || "Failed to delete blog");
    }
  }
);





