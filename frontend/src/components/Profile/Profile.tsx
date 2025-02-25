import Avatar from "../Avatar/Avatar"
import { Link, } from "react-router-dom"
import ProfileSkeleton from "../Skeleton/ProfileSkeleton";
import { useUser } from "../../hooks";
import { useState, useEffect } from "react";


function Profile() {
  const { name, loading } = useUser();
  const [username, setUsername] = useState('');
  useEffect(() => {
    if (name) {
      setUsername(name);
    }
  }, [name]);
  return (
    <div>
      {loading ? <ProfileSkeleton /> :
        <div className='grid h-screen grid-cols-12'>
          <div className=' col-span-12 lg:col-span-8 px-2 py-3  lg:p-12'>
            <div className='px-4 lg:px-8 flex justify-center gap-4 '>
              <div className=" block lg:hidden flex flex-col justify-center">
                <Avatar spanClass="text-1xl" name={username} className="w-12 h-12" size="big" />
              </div>
              <div className=' text-3xl lg:text-4xl font-bold w-full max-w-screen-xl flex flex-col justify-center'>{username}</div>
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

              <div className=" grid grid-cols-12 w-full max-w-screen-md mt-12">
                <div className="flex flex-col col-span-6 gap-4  p-4 rounded-l-md bg-zinc-50">
                  <div className="flex gap-2 col-span-5 flex-row justify-center">
                    <div className=" flex flex-col justify-center">
                      <Avatar name={name} size="small" />
                    </div>
                    <div className='font-bold w-full max-w-screen-xl flex flex-col justify-center'>
                      {username}
                    </div>
                  </div>
                  <div className="text-xl font-bold">
                    Reading List
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col justify-center text-gray-400">No stories &#x1F513;</div>
                    <div className="flex flex-col justify-center center text-2xl font-semibold mb-2">&#8230;</div>
                  </div>
                </div>


                <div className="col-span-3 bg-zinc-100 p-5 mr-0.5">
                </div>
                <div className="col-span-2 border mr-0.5 bg-zinc-100"></div>
                <div className="col-span-1 border rounded-r-md bg-zinc-100"></div>




              </div>

            </div>
          </div>

          <div className='col-span-4 border-l border-black-300 flex flex-col justify-between lg:flex-row  p-12 hidden lg:block'>

            <div className="flex flex-col jusitfy-center gap-5">
              <div>
                <Avatar spanClass="text-4xl" className="w-20 h-20" name={username} size="big" />
              </div>
              <div className="font-bold text-xl">{username}</div>
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