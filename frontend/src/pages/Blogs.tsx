
import BlogCard from '../components/BlogCard'
import Appbar from '../components/Appbar'
import { useBlogs } from '../hooks'
import BlogCardSkeleton from '../components/BlogCardSkelton';

function Blog() {
  const{loading,blogs,length}=useBlogs();

  // if(loading){
  //   return <div>
  //     <BlogCardSkeleton/>
  //   </div>
  // }
  return <div>
      <Appbar/>
      <div className="flex justify-center">
    <div>
      { loading
  ? Array(3).fill(0).map((_, index) => <BlogCardSkeleton key={index}/>):blogs.map(blog=>
      <BlogCard
        authorName={blog.author.name || "Anonymous"}
        title={blog.title}
        content={
          blog.content
        }
        publishDate={"21 Feb 2025"}
        id={blog.id}
        key={blog.id}
        />)
        }
        
      
    </div>
    </div>
    </div>
}

export default Blog