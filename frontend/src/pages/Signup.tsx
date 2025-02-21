import Quote from "../components/Quote"
import Auth from "../components/Auth"
function Signup() {
  return (
    <div className="container h-screen grid grid-cols-1 lg:grid-cols-2">
     <div className="01">
        <Auth type="signup"/>
     </div>
     <div className="hidden lg:block">
     <Quote/>
     </div>
        
    </div>
  )
}

export default Signup