import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteBlog } from '../thunks/blogThunnk';
import { BlogType } from '../../type/Blog';

interface BlogState {
  blogs: BlogType[];
  currentBlog: BlogType | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs: (state, action: PayloadAction<BlogType[]>) => {
      state.blogs = action.payload;
    },
    setCurrentBlog: (state, action: PayloadAction<BlogType>) => {
      state.currentBlog = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteBlog.pending, (state) => {
        //state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        //state.loading=true;
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload.id);
        if (state.currentBlog?.id === action.payload.id) {
          state.currentBlog = null;
          //state.loading = false;
        }
        
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        //state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setBlogs, setCurrentBlog, setLoading } = blogSlice.actions;
export default blogSlice.reducer;
