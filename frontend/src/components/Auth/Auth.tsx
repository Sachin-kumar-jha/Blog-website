import {  SigninInput, SignupInput } from '@sachin.78dev/blog-common';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, signinUser } from '../../store/thunks/authThunk';
import { RootState } from '../../store';
import LabelledInput from '../LabelledInput/LabelledInput';
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-toastify';
import { AppDispatch } from '../../store';
function Auth({ type }: { type: 'signup' | 'signin' }) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  // Using refs to directly capture input values
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  // const handleSubmit = async () => {
  //   const postInput: SignupInput = {
  //     name: nameRef.current?.value || '',
  //     desc: descRef.current?.value || '',
  //     username: usernameRef.current?.value || '',
  //     password: passwordRef.current?.value || '',
  //   };

  //   try {
  //     let result;
  //     if (type === 'signup') {
  //       if (!postInput.name || !postInput.desc || !postInput.username || !postInput.password) {
  //         toast.warning('Please fill all the fields!');
  //         return;
  //       }
  //      result= await dispatch(signupUser(postInput)).unwrap();
  //     } else {
  //       if (!postInput.username || !postInput.password) {
  //         toast.warning('Please enter email and password!');
  //         return;
  //       }
  //      result=await dispatch(signinUser(postInput)).unwrap();
  //     }
  //     console.log(result);
  //      if(result){
  //       toast.success(`${type === 'signup' ? 'Signup' : 'Signin'} successful!`);
  //       navigate('/');
  //      }
  //   } catch (err:any) {
  //     toast.error(err?.message || 'Something went wrong');
  //   }
  // };

  const handleSubmit = async () => {
    const postInput = {
      name: nameRef.current?.value || '',
      desc: descRef.current?.value || '',
      username: usernameRef.current?.value || '',
      password: passwordRef.current?.value || '',
    };
  
    try {
      let result: boolean;
      if (type === 'signup') {
        if (!postInput.name || !postInput.desc || !postInput.username || !postInput.password) {
          toast.warning('Please fill all the fields!');
          return;
        }
        result = await dispatch(signupUser(postInput as SignupInput)).unwrap();
      } else {
        if (!postInput.username || !postInput.password) {
          toast.warning('Please enter email and password!');
          return;
        }
        result = await dispatch(signinUser(postInput as SigninInput)).unwrap();
      }
  
      if (result) {
        toast.success(`${type === 'signup' ? 'Signup' : 'Signin'} successful!`);
        navigate('/');
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || 'Something went wrong');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };
  
  return (
    <div className="bg-slate-100 lg:bg-white h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">{type === 'signup' ? 'Create an Account' : 'Sign in'}</div>
            <div className="text-slate-500">
              {type === 'signin' ? "Don't have an account?" : 'Already have an account?'}
              <Link className="pl-2 underline" to={type === 'signin' ? '/signup' : '/signin'}>
                {type === 'signin' ? 'Sign up' : 'Sign in'}
              </Link>
            </div>
          </div>
          <div className="pt-4">
            {type === 'signup' && (
              <>
                <LabelledInput ref={nameRef} label="Name" placeholder="Enter your name" type="text" onChange={() => {}} />
                <LabelledInput ref={descRef} label="Description" placeholder="Enter about you" type="text" onChange={() => {}} />
              </>
            )}

            <LabelledInput ref={usernameRef} label="Username" type="email" placeholder="Enter your email" onChange={() => {}} />
            <LabelledInput ref={passwordRef} label="Password" placeholder="Password" type="password" onChange={() => {}} />

            <button
              onClick={handleSubmit}
              type="button"
              className={`text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm w-full px-5 py-2.5 mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? <Spinner /> : type === 'signup' ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
