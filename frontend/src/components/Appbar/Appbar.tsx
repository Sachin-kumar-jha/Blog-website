
import axios from 'axios'
import Avatar from '../Avatar/Avatar'
import PublishButton from '../Publish/PublishButton'
import { Link } from 'react-router-dom'
import { BACKEND_URL } from '../../config'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";

function Appbar(){
const [name,setName]=useState('');
const navigate=useNavigate();
const user = async()=>{
  const response=await axios.get(`${BACKEND_URL}/api/v1/user`,{
    headers:{
      Authorization:localStorage.getItem("token")
    }
  });
  setName(response.data.user.name);
};

const handleLogout = () => {
  localStorage.removeItem('token');
  toast.success('Logged out successfully!');
  navigate("/signin");
   
};
useEffect(()=>{
  user();
},[]);
  return (
    <div className=' border-b flex flex-row items-center justify-between px-8 py-1'>
      <Link to={"/blogs"}>
        <div className='flex text-xl text-extrabold flex-col justify-center  curson-pointer'>Medium</div>
        </Link>
           <div className='flex justify-center gap-5'>
            <div className='flex flex-col justify-center mt-2'>
            <PublishButton className={'mr-2 lg:mr-8 '}/>
            </div>
           
            <div className='flex flex-col justify-center'>
            <Link to={"/user"}>
           <Avatar name={name} size="big"/>
           </Link>
            </div>
            <div className='flex flex-col justify-center'>
            <button className='mt-1' onClick={handleLogout}><img src='./logout.png' className='w-6 h-6 object-cover'/></button>
            </div>
          
      </div>
           
           
          
        </div>
        
  )
}

export default Appbar