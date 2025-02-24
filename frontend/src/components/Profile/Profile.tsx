import Avatar from "../Avatar/Avatar"
import { useState,useEffect} from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { Link, } from "react-router-dom"
import ProfileSkeleton from "../Skeleton/ProfileSkeleton";


function Profile() {
  const [name,setName]=useState('');
  const [loading,setLoading]=useState(true);
//const [visible,setVisible]=useState('');
const user = async()=>{
  setLoading(true);
  const response=await axios.get(`${BACKEND_URL}/api/v1/user`,{
    headers:{
      Authorization:localStorage.getItem("token")
    }
  });
  setName(response.data.user.name);
  setLoading(false);
}

useEffect(()=>{
  user();
},[]);
  return (
    <div>
    {loading ?<ProfileSkeleton/> :
    <div className='grid h-screen grid-cols-12'>
      <div className=' col-span-12 lg:col-span-8 px-2 py-3  lg:p-12'>
        <div className='px-4 lg:px-8 flex justify-center gap-4 '>
        <div className=" block lg:hidden flex flex-col justify-center">
          <Avatar spanClass="text-1xl" name={name} className="w-12 h-12" size="big"/>
          </div>
        <div className=' text-3xl lg:text-4xl font-bold w-full max-w-screen-xl flex flex-col justify-center'>{name}</div>
        </div>
        <div className='mt-6 lg:mt-10 px-4 lg:px-8'>
        <div className='border-b border-gray-200 flex justify-start gap-6'>
          <div className='text-slate-600 hover:text-slate-900 hover:border-b hover:border-slate-500 pb-3'>
          <span>Home</span>
          </div>
          <div className=' text-slate-600 hover:text-slate-900 hover:border-b hover:border-slate-500 pb-3'>
          <span>About</span>
          </div>
        </div>
        </div>
      </div>

      <div className='col-span-4 border-l border-black-300 flex flex-col justify-between lg:flex-row  p-12 hidden lg:block'>

        <div className="flex flex-col jusitfy-center gap-5">
          <div>
          <Avatar spanClass="text-4xl" className="w-20 h-20" name={name} size="big"/>
          </div>
        <div className="font-bold text-xl">{name}</div>
        <div>
          <Link to={"/user/edit"} className="text-green-700 text-sm font-semibold ">
          Edit profile
          </Link>
        </div>
        </div>
      </div>
    </div>
      }
    </div>
  )
}

export default Profile