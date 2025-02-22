import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Blogs from "./pages/Blogs"
import Blog from "./pages/Blog"
import { BrowserRouter,Route,Routes } from "react-router-dom"
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/blogs" element={<Blogs/>}></Route>
        <Route path="/blog/:id" element={<Blog/>}></Route>
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
