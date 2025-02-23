
import axios from 'axios'
import Avatar from '../Avatar/Avatar'
import PublishButton from '../Publish/PublishButton'
import { Link } from 'react-router-dom'
import { BACKEND_URL } from '../../config'
import { useEffect, useState } from 'react'
function Appbar(){
  const [name,setName]=useState('');
const user = async()=>{
  const response=await axios.get(`${BACKEND_URL}/api/v1/user`,{
    headers:{
      Authorization:localStorage.getItem("token")
    }
  });
  setName(response.data.user.name);
}
useEffect(()=>{
  user();
},[]);
  return (
    <div className=' border-b flex justify-between px-10 py-6'>
      <Link to={"/blogs"}>
        <div className='flex flex-col justify-center curson-pointer'>Medium</div>
        </Link>
        <div>
           <PublishButton className={'mr-10'}/>
            <Avatar name={name} size="big"/>
        </div>
    </div>
  )
}

export default Appbar