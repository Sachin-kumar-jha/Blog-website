import axios from "axios";
import { useEffect, useState } from "react"
import { BlogType } from "../type/Blog";
import { toast } from "react-toastify";
export const useBlogs=()=>{
     const [loading,setLoading]=useState(true);
     const [blogs,setBlogs]=useState<BlogType[]>([]);
     const[length,setLength]=useState(0);
useEffect(()=>{
   axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`,{
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
  axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`,{
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
};



export const useUser=()=>{
    const[loading,setLoading]=useState(true);
    const [name,setName]=useState("");
    const[id,setId]=useState('');
    useEffect(()=>{
        try {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user`,{
                headers:{
                  Authorization:localStorage.getItem("token")
                }
              })
              .then(res=>{
                  setName(res.data.user.name);
                  setLoading(false);
                  setId(res.data.user.id);
              
              });
            
        }catch{
            toast.warning("Check your connection!");
        }
      
    },[]);
    return{
        name,id,loading
    }
};