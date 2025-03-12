import { createSlice} from '@reduxjs/toolkit';
import { signupUser, signinUser } from '../thunks/authThunk';
import storage from 'redux-persist/lib/storage';
interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      storage.removeItem('persist:root');
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
