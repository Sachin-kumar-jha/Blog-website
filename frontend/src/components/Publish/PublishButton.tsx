import { Link } from "react-router-dom"

function PublishButton({className}:{className:string}) {
  return (
  <Link to={"/publish"}>
<button type="button" 
className={`text-white bg-gradient-to-r from-blue-500 to-purple-600 font-medium rounded-full 
text-sm px-5 py-1.5 text-center  mb-2 ${className}`}>
  Publish
  </button>
  </Link>
 
  )
}

export default PublishButton