import React, { useState, useEffect } from 'react';
import axios from 'axios';

import HeroSlide from '../../components/HeroSlide/HeroSlide';
import HorizontalCarousel from '../../components/HorizontalCarousel/HorizontalCarousel';
import { BASE_URL } from '../../../config';

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [airingTv, setAiringTv] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [topRatedTv, setTopRatedTv] = useState([]);

  const fetchMoviesData = async (endpoint) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/tmdb?endpoint=${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error.message);
      return { results: [] };
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      const [
        trendMovies,
        nowPlaying,
        popular,
        topRated,
        upcoming,
        airTv,
        tvPopular,
        tvTopRated,
      ] = await Promise.all([
        fetchMoviesData('trending/movie/day'),
        fetchMoviesData('movie/now_playing'),
        fetchMoviesData('movie/popular'),
        fetchMoviesData('movie/top_rated'),
        fetchMoviesData('movie/upcoming'),
        fetchMoviesData('tv/airing_today'),
        fetchMoviesData('tv/popular'),
        fetchMoviesData('tv/top_rated'),
      ]);

      setTrendingMovies(trendMovies.results);
      setNowPlayingMovies(nowPlaying.results);
      setPopularMovies(popular.results);
      setTopRatedMovies(topRated.results);
      setUpcomingMovies(upcoming.results);
      setAiringTv(airTv.results);
      setPopularTv(tvPopular.results);
      setTopRatedTv(tvTopRated.results);
    };

    fetchAll();
  }, []);

  if(!(trendingMovies && nowPlayingMovies && popularMovies 
    && topRatedMovies && airingTv && popularTv && topRatedTv))
  {
    return(<div>Loading</div>)
  }
  return (
    <div>
      <HeroSlide itemList={trendingMovies.slice(0, 10)} />

      {nowPlayingMovies.length > 0 && (
        <HorizontalCarousel
          category="movies"
          title="Now Playing Movies"
          itemList={nowPlayingMovies.slice(0, 15)}
        />
      )}

      {popularMovies.length > 0 && (
        <HorizontalCarousel
          category="movies"
          title="Popular Movies"
          itemList={popularMovies.slice(0, 15)}
        />
      )}

      {topRatedMovies.length > 0 && (
        <HorizontalCarousel
          category="movies"
          title="Top Rated Movies"
          itemList={topRatedMovies.slice(0, 15)}
        />
      )}

      {airingTv.length > 0 && (
        <HorizontalCarousel
          category="tv"
          title="TV Shows Airing Today"
          itemList={airingTv.slice(0, 15)}
        />
      )}

      {popularTv.length > 0 && (
        <HorizontalCarousel
          category="tv"
          title="Popular TV Shows"
          itemList={popularTv.slice(0, 15)}
        />
      )}

      {topRatedTv.length > 0 && (
        <HorizontalCarousel
          category="tv"
          title="Top Rated TV"
          itemList={topRatedTv.slice(0, 15)}
        />
      )}
    </div>
  );
}

export default Home;