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
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
    </div>
  )
}

export default App
