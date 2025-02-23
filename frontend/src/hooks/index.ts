import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { BlogType } from "../type/Blog";
export const useBlogs=()=>{
     const [loading,setLoading]=useState(true);
     const [blogs,setBlogs]=useState<BlogType[]>([]);
     const[length,setLength]=useState(0);
useEffect(()=>{
   axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
    headers:{
        Authorization:localStorage.getItem("token"),
    }
   }
   )
   .then(res => {
    setBlogs(res.data);
    setLength(res.data);
    setLoading(false);
   })
},[]);
return{
    loading,blogs,length
}
}


export const useBlog=({id}:{id:string})=>{
    const [loading,setLoading]=useState(true);
    const [blog,setBlog]=useState<BlogType>();
useEffect(()=>{
  axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
   headers:{
       Authorization:localStorage.getItem("token"),
   }
  }
  )
  .then(res =>{
   setBlog(res.data.blog);
   setLoading(false);
  })
},[id]);
return{
   loading,blog
}
}