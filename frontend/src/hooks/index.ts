import axios from "axios";
import { useEffect, useState } from "react"

import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setBlogs,setLoading } from '../store/slice/blogSlice';
//import { fetchBlogById } from "../store/thunks/blogThunnk";

export const useBlogs=()=>{
     //const [loading,setLoading]=useState(true);
//      const [blogs,setBlogs]=useState<BlogType[]>([]);
//      const[length,setLength]=useState(0);
// useEffect(()=>{
//    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`,{
//     headers:{
//         Authorization:localStorage.getItem("token"),
//     }
//    }
//    )
//    .then(res => {
//     setBlogs(res.data);
//     setLength(res.data);
//     setLoading(false);
//    })
// },[]);
 const {blogs,loading} = useSelector((state: RootState) => state.blog);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(setLoading(true));
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`,{
     withCredentials:true,
     headers: {
        "Content-Type": 'application/json', 
    },
    })
    .then(res => {
     dispatch(setBlogs(res.data));
    //  setLength(res.data);
     dispatch(setLoading(false));
    })
 },[dispatch]);
return{
    loading,blogs
}
}




// export const useBlog=({id}:{id:string})=>{

// //     const [loading,setLoading]=useState(true);
// //     const [blog,setBlog]=useState<BlogType>();
// // useEffect(()=>{
// //   axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`,{
// //    headers:{
// //        Authorization:localStorage.getItem("token"),
// //    }
// //   }
// //   )
// //   .then(res =>{
// //    setBlog(res.data.blog);
// //    setLoading(false);
// //   })
// // },[id]);
// const dispatch = useDispatch<AppDispatch>();

//   const { currentBlog, loading } = useSelector((state: RootState) => state.blog);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchBlogById(id));
//     }
//   }, [id, dispatch]);
//   console.log(currentBlog);
// return{
//    loading,currentBlog
// }
// };




export const useUser=()=>{
    const[loading,setLoading]=useState(false);
    const [name,setName]=useState("");
    const[id,setId]=useState('');
    useEffect(()=>{
        try {
            setLoading(true);
             axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/admin`,{
                withCredentials:true,
                headers: {
                    'Content-Type': 'application/json', 
                },
              })
              .then(res=>{
                  //console.log(res.data.user.name);
                  console.log('Response headers:', res.headers);
                  console.log('Response data:', res.data);
                  setName(res.data.user.name);
                  setId(res.data.user.id);
                  setLoading(false);
              
              });
            
        }catch{
            toast.warning("Check your connection!");
        }
      
    },[id]);
    return{
        name,id,loading
    }
};