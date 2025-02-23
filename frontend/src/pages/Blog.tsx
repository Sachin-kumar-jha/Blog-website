import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"
import FullBLog from "../components/FullBLog"
import BlogCardSkeleton from "../components/Skeleton/BlogCardSkelton";
function Blog() {
  const {id}=useParams();
  const {loading,blog}=useBlog({
    id:id || ""
  });
  return <div>
    {loading  ? <BlogCardSkeleton/>:
    <FullBLog blog={blog}/>
  }
  </div>
}

export default Blog