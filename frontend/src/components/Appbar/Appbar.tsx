import { useState } from 'react';
import Avatar from '../Avatar/Avatar'
import PublishButton from '../Publish/PublishButton'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import { useUser } from '../../hooks'
import { useDispatch} from 'react-redux';
import { logout} from '../../store/slice/authSlice';
import axios, { AxiosError } from 'axios';

import {AppDispatch } from '../../store';
import Spinner from '../Spinner/Spinner';


function Appbar(){
const {loading,name}=useUser();
const [loader,setLoader]=useState(false);
const dispatch =useDispatch<AppDispatch>();
const navigate =useNavigate();

const handleLogout = async () => {
  try {
    // Clear the backend cookie
    setLoader(true);
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`, {}, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json', 
    }
    });
    // Update Redux state
    dispatch(logout());
    setLoader(false);
    toast.success('Logged out successfully!');
    navigate('/signin');
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    console.error('Logout failed:', error.message);
    toast.error('Failed to log out. Please try again.');
  }
};
  return (
    <div className=' border-b flex flex-row items-center justify-between px-8 py-1'>
      <Link to={"/"}>
  
  
        <div className='flex text-xl text-extrabold flex-col justify-center  curson-pointer'>
          <h1 className="text-2xl sm:text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#6F42C1]">
    BlogHaven
  </h1></div>
        </Link>
           <div className='flex justify-center gap-5'>
            <div className='flex flex-col justify-center mt-2'>
            <PublishButton className={'mr-2 lg:mr-8 '}/>
            </div>
           
            <div className='flex flex-col justify-center'>
            <Link to={"/user"}>
            {
            loading ? <div className='w-10 h-10 animate-pulse rounded-full bg-indigo-300'></div>:<Avatar name={name} size="big"/>
            }
           </Link>
            </div>
            <div className='flex flex-col justify-center'>
            <button className='mt-1' onClick={handleLogout}>{loader ?<Spinner/>:<img src='./logout.png'  className='w-6 h-6 object-cover'/>}</button>
            </div>
          
      </div>
        </div>
        
  )
}

export default Appbar