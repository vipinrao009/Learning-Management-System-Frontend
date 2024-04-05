import './App.css'
import { Routes , Route} from "react-router-dom"
import HomePage from "./Pages/HomePage"


function App() {
  

  return (
    <div>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
        </Routes>
    </div>
  )
}

export default App
