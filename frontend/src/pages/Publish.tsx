import { useState } from "react";
import TextArea from "../components/TextArea/TextArea";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../components/Spinner/ButtonSpinner";
function Publish() {
const [title,setTitle]=useState('');
const[content,setContent]=useState('');
const[loading,setLoading]=useState(false);
const navigate=useNavigate();

const PostData = async()=>{
  setLoading(true);
  const response= await axios.post(`${BACKEND_URL}/api/v1/blog`,{
    title,
    content,
  },{
    headers:{
      Authorization:localStorage.getItem("token")
    }
  });
  navigate(`/blog/${response.data.id}`);
}
  return (
    <div className="flex justify-center">
    <div className="max-w-screen-lg w-full mt-10">
      <input  type="text" onChange={c=>setTitle(c.target.value)}
       className=" w-full bg-white  border-b  text-gray-900 text-md 
       rounded-md focus:outline-none focus:border-slate-200 block
        w-full p-5  " placeholder="Title"/>
        <TextArea onChange={c=>setContent(c.target.value)}/>

        <button onClick={PostData}
         type="submit" 
         className="inline-flex items-center px-3 py-2.5 text-sm font-medium 
 text-center text-white bg-green-600 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
        {
            loading ? <ButtonSpinner/>:" Publish post"
          }
   </button>
    </div>
    </div>
  );

}

export default Publish