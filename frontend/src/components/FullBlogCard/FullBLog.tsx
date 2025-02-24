
import { BlogType } from '../../type/Blog';
import Avatar from '../Avatar/Avatar';

const defaultBlog: BlogType = {
  title: "Untitled Blog",
  content: "No content available.",
  id: 0,
  author: {
    name: "Anonymous",
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function FullBlog({ blog = defaultBlog }: { blog?: BlogType }) {
  return (
    <div>
      <div className='grid grid-rows-12 lg:grid-cols-12 w-full lg:max-w-screen-xl pt-20 px-8 lg:px-10'>
        <div className="row-span-8 lg:col-span-8 lg:px-5">
          <div className='text-4xl lg:text-5xl font-bold lg:font-extrabold'>
            {blog.title}
          </div>
          <div className='text-slate-500 pt-2'>
            Post on {new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(',', '')}
          </div>
          <div className='pt-4 text-xl'>
            {blog.content}
          </div>
        </div>
        <div className="row-span-4 lg:col-span-4">
          <div className='text-slate-600 text-lg'>
            Author
          </div>
          <div className='flex'>
            <div className='pr-4 flex flex-col justify-center'>
              <Avatar name={blog.author.name.toUpperCase()} size='big' />
            </div>
            <div>
              <div className='text-xl font-bold'>
                {blog.author.name.toUpperCase() || "Anonymous"}
              </div>
              <div className='pt-2 text-slate-500'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus placeat.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
