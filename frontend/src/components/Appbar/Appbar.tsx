
import Avatar from '../Avatar/Avatar'
import PublishButton from '../Publish/PublishButton'
import { Link } from 'react-router-dom'
function Appbar() {
  return (
    <div className=' border-b flex justify-between px-10 py-6'>
      <Link to={"/blogs"}>
        <div className='flex flex-col justify-center curson-pointer'>Medium</div>
        </Link>
        <div>
           <PublishButton className={'mr-10'}/>
            <Avatar name="Sachin Kumar Jha" size="big"/>
        </div>
    </div>
  )
}

export default Appbar