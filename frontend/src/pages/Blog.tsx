import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"
import FullBLog from "../components/FullBlogCard/FullBLog";
import BlogCardSkeleton from "../components/Skeleton/BlogCardSkelton";
function Blog() {
  const {id}=useParams();
  const {loading,blog}=useBlog({
    id:id || ""
  });
  return <div>
    {loading  ? <BlogCardSkeleton className="flex justify-center mt-24"/>:
    <FullBLog blog={blog}/>
  }
  </div>
}

export default Blog