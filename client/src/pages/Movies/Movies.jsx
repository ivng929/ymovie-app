import React, { useEffect, useState } from 'react';
import { IMAGE_BASE_URL } from '../../../config.js';
import MovieCard from '../../components/MovieCard/MovieCard.jsx';
import GenreTags from '../../components/GenreTags/GenreTags.jsx';
import NoMatch from '../../components/NoMatch/NoMatch.jsx';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../config';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchParams] = useSearchParams();
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/tmdb?endpoint=discover/movie`);
        const data = await response.data
        setMovies(data.results);
        setAllMovies(data.results);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/tmdb?endpoint=genre/movie/list`);
        const data = await response.data
        setGenres(data.genres);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchMovies();
    fetchGenres();
  }, []);

  useEffect(() => {
    if (searchParams.get("genres")) {
      setSelectedGenres(searchParams.get("genres").split(",").map(Number));
    } else {
      setSelectedGenres([]);
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedGenres.length === 0) {
      setMovies(allMovies);
    } else {
      const filtered = allMovies.filter((movie) =>
        movie.genre_ids.some((id) => selectedGenres.includes(id))
      );
      setMovies(filtered);
    }
  }, [selectedGenres]);

  if (allMovies.length === 0) {
    return <p className="text-white text-center mt-10">Loading movies...</p>;
  }

  return (
    <div className="pt-20 px-[6vw] min-h-screen bg-black">
      <h2 className="text-white text-center text-2xl font-semibold mb-4">
        Discover Your Movies Here
      </h2>
      <GenreTags category="movies" genreList={genres} />
      {movies.length === 0 ? (
        <NoMatch text="No movies matched your filtering :("/>
      ) : (
        <div className="grid gap-4 justify-center
                grid-cols-[repeat(auto-fill,_minmax(90px,_1fr))] 
                sm:grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] 
                md:grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))]">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              category="movies"
              id={movie.id}
              title={movie.title}
              posterPath={`${IMAGE_BASE_URL}/${movie.poster_path}`}
              voteAverage={movie.vote_average}
              backdropPath={`${IMAGE_BASE_URL}/${movie.backdrop_path}`}
              movieGenres={`${movie.genre_ids}`}
              movieOverview={`${movie.overview}`}
              date={`${movie.release_date}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Movies;
