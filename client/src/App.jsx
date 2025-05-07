import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppNavbar from './components/AppNavbar/AppNavbar.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import './App.css'
import Footnote from './components/Footnote/Footnote.jsx';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      // once: true,
      easing: 'ease-out-cubic',
      offset: 100
    });
  }, []);

  return (
    <BrowserRouter>
      <div>
        <AppNavbar/>
        <div className="bg-black"><AppRoutes/></div>
        <Footnote/>
      </div>
    </BrowserRouter>
  )
}

export default App

