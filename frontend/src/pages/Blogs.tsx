
import BlogCard from '../components/BlogCard'
import { useBlogs } from '../hooks'
import BlogCardSkeleton from '../components/Skeleton/BlogCardSkelton';

function Blog() {
  const{loading,blogs}=useBlogs();

  return <div>
      <div className="flex justify-center">
    <div>
      { loading
  ? Array(3).fill(0).map((_, index) => <BlogCardSkeleton key={index}/>): blogs.length > 0 ? (
    blogs.map(blog => (
      <BlogCard
        authorName={blog.author?.name || "Anonymous"}
        title={blog.title}
        content={blog.content}
        publishDate={"21 Feb 2025"}
        id={blog.id}
        key={blog.id}
      />
    ))
  ):<p>Blogs not found</p> 
}
        
    </div>
    </div>
    </div>
}

export default Blog