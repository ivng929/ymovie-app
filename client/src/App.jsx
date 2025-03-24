import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppNavbar from './components/AppNavbar/AppNavbar.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import './App.css'
import Footnote from './components/Footnote/Footnote.jsx';

function App() {
  return (
    <BrowserRouter>
      <div>
        <AppNavbar/>
        <div className="page-content"><AppRoutes/></div>
        <Footnote/>
      </div>
    </BrowserRouter>
  )
}

export default App

