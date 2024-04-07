import './App.css'
import { Routes , Route} from "react-router-dom"
import HomePage from "./Pages/HomePage"
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'


function App() {
  

  return (
    <div>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/about' element={<AboutUs/>}></Route>

          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
    </div>
  )
}

export default App
