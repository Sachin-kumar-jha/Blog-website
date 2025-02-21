
import { signinInput, SignupInput } from '@sachin.78dev/blog-common';
import { ChangeEvent, useState,} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { BACKEND_URL } from '../config';
function Auth({type}:{type:"signup" | "signin"}) {
  const navigate=useNavigate();
  const [postInput,setPostInput]=useState<SignupInput>({
    name:"",
    username:"", 
    password:"",

  });

  async function sendRequest(){
    try {
      const response= await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signup"? "signup":"signin"}`,postInput);
      const jwt=response.data;
      localStorage.setItem("token",jwt);
      navigate("/blogs");
  }catch (e) {
      //aleertmessage
      alert("Something went wrong");
    }
  }

  return (
  <div className="bg-slate-100 lg:bg-white  h-screen flex justify-center flex-col">
    <div className="flex justify-center">
      <div>
    <div className='px-10'>
    <div className='text-3xl font-extrabold'>
        Create an Account
    </div>
    <div className='text-slate-500'>
       {type=="signin"?"Don't have an account" :"Already have an account?" }
        <Link className='pl-2 underline' to={type=="signin"?"/signup":"/signin"}>{type=="signin"?"Sign up":"Sign in"}</Link>
    </div>
    </div>
    <div className='pt-4'>
  {type=="signup" ?<LabelledInput label ="Name"  placeholder='Sachin Kumar jha' onChange={(e)=>{
      setPostInput(c =>({
        ...c,
        name:e.target.value,
      }))
    }}/> :null}  
    <LabelledInput label="username" type={"email"} placeholder='enter your email' onChange={(e)=>{
      setPostInput(c =>({
        ...c,
        username:e.target.value,
      }))
    }}/>
    <LabelledInput label ="password" placeholder='password' type={"password"} onChange={(e)=>{
      setPostInput(c =>({
        ...c,
        password:e.target.value,
      }))
    }}/>
    <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4">{
      type=="signup" ?"Sign up" :"Sign in"}</button>
    </div>
    </div>
    </div>
  </div>

  )
}

export default Auth

interface LabelledInputType{
  label:string;
  placeholder:string;
  onChange:(e : ChangeEvent<HTMLInputElement>)=>void;
  type?:string;
}
function LabelledInput({label,placeholder,onChange,type}:LabelledInputType){
  return <div className="w-full max-w-sm min-w-[200px]">
  <label className="block mb-2 text-sm text-black font-semibold pt-2">
     {label}
  </label>
  <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md p-2.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
    placeholder={placeholder} onChange={onChange} type={ type || "text"} required />
</div>

}