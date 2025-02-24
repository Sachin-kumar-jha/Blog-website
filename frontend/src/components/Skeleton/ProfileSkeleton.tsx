

function ProfileSkeleton() {
  return (
    <div>
   <div className='grid h-screen grid-cols-12'>
{/* Main content section */}
<div className='col-span-8 p-12'>
  <div className='px-8'>
    <div className='h-10 w-3/4 bg-gray-300 rounded animate-pulse'></div>
  </div>
  <div className='mt-10 px-8'>
    <div className='border-b border-gray-200 flex gap-6'>
      <div className='h-6 w-16 bg-gray-300 rounded animate-pulse'></div>
      <div className='h-6 w-16 bg-gray-300 rounded animate-pulse'></div>
    </div>
  </div>
</div>

{/* Sidebar/Profile section */}
<div className='col-span-4 border-l p-12'>
  <div className='flex flex-col gap-5 items-center'>
    <div className='w-20 h-20 bg-gray-300 rounded-full animate-pulse'></div>
    <div className='h-6 w-40 bg-gray-300 rounded animate-pulse'></div>
    <div className='h-5 w-24 bg-gray-300 rounded animate-pulse'></div>
  </div>
</div>

</div>


  </div>
  )
}

export default ProfileSkeleton