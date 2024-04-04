//Components import
import App from './App.jsx'
// CSS import 
import './index.css'
//Library import
import React from 'react'
import ReactDOM from 'react-dom/client'
  

import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <App />
   </BrowserRouter>
)
