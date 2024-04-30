import './App.css'
import { Routes , Route} from "react-router-dom"
import HomePage from "./Pages/HomePage"
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import CourseList from './Pages/Course/CourseList'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import Description from './Pages/Description'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EditProfile'
import Checkout from './Pages/Payment/Checkout'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
import CheckoutFailure from './Pages/Payment/CheckoutFailure'
import DisplayLectures from './Pages/Dashboard/DisplayLectures'
import AddLectures from './Pages/Dashboard/AddLectures'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'
import ResetPassword from './Pages/Password/ResetPassword'
import ForgetPassword from './Pages/Password/ForgetPassword'
import ChangePassword from './Pages/Password/ChangePassword'

function App() {

  return (
    <div>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/about' element={<AboutUs/>}></Route>
          <Route path='/signup'element={<SignUp></SignUp>} ></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/courses' element={<CourseList/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/denied' element={<Denied/>}></Route>
          <Route path='/course/description' element={<Description/>}></Route>
          <Route path='/forget-password' element={<ForgetPassword/>}></Route>
          <Route path='/reset-password/:token' element={<ResetPassword/>}></Route>



          <Route element={<RequireAuth allowedRoles={['ADMIN']}/>}>
            <Route path='/course/create' element={<CreateCourse/>}></Route>
            <Route path='/course/addlecture' element={<AddLectures/>}></Route>
            <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
          </Route>


          <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]}/>}>
            <Route path='/user/profile' element={<Profile/>}></Route>
            <Route path='/user/editprofile' element={<EditProfile/>}></Route>
            <Route path='/user/profile/changepassword' element={<ChangePassword/>}></Route>
            <Route path='/checkout' element={<Checkout/>}></Route>
            <Route path='/checkout/success' element={<CheckoutSuccess/>}></Route>
            <Route path='/checkout/failed' element={<CheckoutFailure/>}></Route>
            <Route path='/course/displayLectures' element={<DisplayLectures/>}></Route>
            <Route path='/user/profile/changepassword' element={<DisplayLectures/>}></Route>
          </Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
    </div>
  )
}

export default App
