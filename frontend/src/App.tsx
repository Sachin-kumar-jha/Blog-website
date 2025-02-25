import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Blogs from './pages/Blogs';
import Blog from "./pages/Blog"
import { BrowserRouter,Route,Routes } from "react-router-dom"
import Publish from "./pages/Publish"
import MainLayout from "./components/Mainlayout/MainLayout"
import Profile from "./components/Profile/Profile"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import Working from "./components/Working/Working"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <div>
      <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/" element={<Blogs/>}/>
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/user" element={<Profile />}/>
          <Route path="/user/edit" element={<Working/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  )
}

export default App
