import BlogCard from '../components/BlogCard/BlogCard';
import BlogCardSkeleton from '../components/Skeleton/BlogCardSkelton';
import { useBlogs } from '../hooks';
function Blog(){
const{loading,blogs}=useBlogs();
  //console.log(blogs);
  return <div>
      <div className="flex justify-center">
    <div>
      { loading
  ? Array(3).fill(0).map((_, index) => <BlogCardSkeleton className='flex' key={index}/>): blogs.length > 0 ? (
    blogs.map(blog => (
      <BlogCard
        authorName={blog.author?.name || "Anonymous"}
        title={blog.title}
        content={blog.content}
        publishDate={`${new Date(`${blog.createdAt}`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(',', '')}`}
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