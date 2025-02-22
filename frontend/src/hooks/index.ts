import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
interface Blog{
    "title":string;
    "content":string;
    "id":number;
    "author":{
        "name":string;
    }
  
  }
export const useBlogs=()=>{
     const [loading,setLoading]=useState(true);
     const [blogs,setBlogs]=useState<Blog[]>([]);
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
    setLength(res.data.length);
    setLoading(false);
   })
},[]);
return{
    loading,blogs,length
}
}