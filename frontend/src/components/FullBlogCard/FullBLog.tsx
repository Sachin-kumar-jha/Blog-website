
import { BlogType } from '../../type/Blog';
import Avatar from '../Avatar/Avatar';
import DeleteButton from '../deleteButton/DeleteButton';
import { useParams,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BACKEND_URL } from '../../config';
import {toast} from "react-toastify"
import axios from 'axios';
const defaultBlog: BlogType = {
  title: "Untitled Blog",
  content: "No content available.",
  id: 0,
  author: {
    name: "Anonymous",
    desc:""
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function FullBlog({ blog = defaultBlog }: { blog?: BlogType }) {

  const {id}=useParams();
  const[loading,setLoading]=useState(false);
  const navigate=useNavigate();
  
  const sendDeleteRequest = async()=>{
    try {
      setLoading(true);
      const response= await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`,{
          headers:{
              Authorization:localStorage.getItem('token')
         }
      });
      const data=await response.data;
      toast.warn(`${data.message}`);
      navigate("/blogs");
      setLoading(false) 
  } catch{
      toast.warn("Something went wrong!");
    }finally{
      setLoading(false);
    } 
}
  

  return (
    <div>
      <div className='grid grid-rows-12 lg:grid-cols-12 w-full lg:max-w-screen-xl pt-20 px-8 lg:px-10'>
        <div className="row-span-8 lg:col-span-8 lg:px-5">
          <div className='text-4xl lg:text-5xl font-bold lg:font-extrabold'>
            {blog.title}
          </div>
          <div className='flex gap-5'>
          <div className='text-slate-500 pt-2 flex flex-col justify-center'>
            Post on {new Date(blog.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(',', '')}
          </div>
          <div className='flex flex-col justify-center mt-3'>
            {loading ?<div className="w-2 h-3 border-t-2 border-blue-400 border-solid rounded-full animate-spin"></div>:<DeleteButton onClick={sendDeleteRequest}/>
            }
          </div>
          </div>
          <div className='pt-4 text-lg tracking-widest '>
            {blog.content}
          </div>
        </div>
        <div className="row-span-4 lg:col-span-4 lg:border-l p-3">
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
              <div className='pt-2 text-md tracking-wider text-slate-500 font-bold'>
                {blog.author.desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
