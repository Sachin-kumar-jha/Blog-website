import { SignupInput } from '@sachin.78dev/blog-common';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LabelledInput from '../LabelledInput/LabelledInput';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-toastify';
function Auth({ type }: { type: 'signup' | 'signin' }) {
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();

  // Using refs to directly capture input values
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  async function sendRequest() {
    setLoading(true);
    const postInput:SignupInput={
      name: nameRef.current?.value || '',
      desc:descRef.current?.value || '',
      username:usernameRef.current?.value || '',
      password:passwordRef.current?.value || '',
      
    }
    try {
      if (type === 'signup') {
        if (!postInput.name || !postInput.desc || !postInput.username || !postInput.password) {
          toast.warning("Please fill all the fields!");
          setLoading(false);
          return;
        }
      } else { // signin
        if (!postInput.username || !postInput.password) {
          toast.warning("Please enter email and password!");
          setLoading(false);
          return;
        }
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`,postInput);
      const jwt =await response.data;
      localStorage.setItem('token', jwt);
      toast.success(`${type} successfully!`);
      navigate('/blogs');

      if (nameRef.current) nameRef.current.value = '';
      if (usernameRef.current) usernameRef.current.value = '';
      if (descRef.current) descRef.current.value = '';
      if (passwordRef.current) passwordRef.current.value = '';
    } catch(e){
      console.log(e);
      toast.warning("User doesn't exist!");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-100 lg:bg-white h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an Account</div>
            <div className="text-slate-500">
              {type === 'signin' ? "Don't have an account" : 'Already have an account?'}
              <Link className="pl-2 underline" to={type === 'signin' ? '/signup' : '/signin'}>
                {type === 'signin' ? 'Sign up' : 'Sign in'}
              </Link>
            </div>
          </div>
          <div className="pt-4">
            {type === 'signup' && (
              <>
              <LabelledInput
                ref={nameRef}
                label="name"
                placeholder="Enter your name"
                onChange={() => {}}
                type='text'
              />
              <LabelledInput
              ref={descRef}
              label="description"
              type="text"
              placeholder="Enter about you"
              onChange={() => {}}
            />
            </>
            )}
            
            <LabelledInput
              ref={usernameRef}
              label="username"
              type="email"
              placeholder="Enter your email"
              onChange={() => {}}
            />

            <LabelledInput
              ref={passwordRef}
              label="Password"
              placeholder="Password"
              type="password"
              onChange={() => {}}
            />
            <button
              onClick={sendRequest}
              type="button"
              
              className={`text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm w-full px-5 py-2.5 me-2 mb-2  mt-4 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? <Spinner/> : type === 'signup' ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;