import { Link } from "react-router-dom"

function PublishButton({className}:{className:string}) {
  return (
  <Link to={"/publish"}>
<button type="button" 
className={`text-white bg-green-700 hover:bg-green-800 
focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full 
text-sm px-5 py-1.5 text-center me-2 mb-2 ${className}`}>
  Publish
  </button>
  </Link>
 
  )
}

export default PublishButton