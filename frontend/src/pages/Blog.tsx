
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import FullBLog from "../components/FullBlogCard/FullBLog";
import BlogCardSkeleton from "../components/Skeleton/BlogCardSkelton";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchBlogById } from "../store/thunks/blogThunnk";
function Blog() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { currentBlog, loading } = useSelector((state: RootState) => state.blog);
  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [id, dispatch]);

  return <div>
    {loading  ? <BlogCardSkeleton className="flex justify-center mt-24"/>:
      currentBlog && <FullBLog blog={currentBlog}/>
  }
  </div>
}

export default Blog