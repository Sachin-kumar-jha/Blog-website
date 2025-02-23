
import { SignupInput } from '@sachin.78dev/blog-common';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LabelledInput from './LabelledInput/LabelledInput';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import Spinner from './Spinner/Spinner';

function Auth({ type }: { type: 'signup' | 'signin' }) {
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();

  // Using refs to directly capture input values
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  async function sendRequest() {
    setLoading(true);
    const postInput: SignupInput = {
      name: nameRef.current?.value || '',
      username: usernameRef.current?.value || '',
      password: passwordRef.current?.value || '',
    };

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`,
        postInput
      );
      const jwt = response.data;
      localStorage.setItem('token', jwt);
      navigate('/blogs');

      if (nameRef.current) nameRef.current.value = '';
      if (usernameRef.current) usernameRef.current.value = '';
      if (passwordRef.current) passwordRef.current.value = '';
    } catch (err) {
      alert('Error: ' + err);
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
              <LabelledInput
                ref={nameRef}
                label="Name"
                placeholder="Sachin Kumar Jha"
                onChange={() => {}}
              />
            )}
            
            <LabelledInput
              ref={usernameRef}
              label="Username"
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
              disabled={loading}
              className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4 ${
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