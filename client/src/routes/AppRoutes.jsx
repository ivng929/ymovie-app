import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home.jsx';
import Movies from '../pages/Movies/Movies.jsx'
import TVShows from '../pages/TVShows/TVShows.jsx'
import MovieDetails from '../components/MovieDetails/MovieDetails.jsx';
import { useLocation } from 'react-router-dom';

function AppRoutes() {
  const { pathname } = useLocation();

  // scroll to top of pages after navigate
  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname])

  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/tv" element={<TVShows/>} />
        <Route path="/movies/:id" element={<MovieDetails category="movie"/>}/>
        <Route path="/tv/:id" element={<MovieDetails category="tv"/>}/>
    </Routes>
  )
}

export default AppRoutes
