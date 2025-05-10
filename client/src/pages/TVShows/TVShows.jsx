import React, { useEffect, useState } from 'react';
import { IMAGE_BASE_URL } from '../../../config.js';
import MovieCard from '../../components/MovieCard/MovieCard.jsx';
import GenreTags from '../../components/GenreTags/GenreTags.jsx';
import NoMatch from '../../components/NoMatch/NoMatch.jsx';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import { useSearchParams } from 'react-router-dom';

function TVShows() {
  const [shows, setShows] = useState([]);
  const [allShows, setAllShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchParams] = useSearchParams();
  const endpoint = 'discover/tv';
  const query = '';
  const [selectedGenres, setSelectedGenres] = useState([]); 

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/tmdb?endpoint=discover/tv`);
        const data = await response.data
        setShows(data.results);
        setAllShows(data.results);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/tmdb?endpoint=genre/tv/list`);
        const data = await response.data
        setGenres(data.genres);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchShows();
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
      setShows(allShows);
    } else {
      const filtered = allShows.filter((show) =>
        show.genre_ids.some((id) => selectedGenres.includes(id))
      );
      setShows(filtered);
    }
  }, [selectedGenres]);

  if (allShows.length === 0) {
    return <p>Loading shows...</p>;
  }

  return (
    <div className="tv-page pt-16 px-[6vw]">
      <h2 className="text-white text-center">Discover Your TV Shows Here</h2>
      <GenreTags category="tv" genreList={genres} />
      {shows.length === 0 ? (
        <NoMatch text="No TV shows matched your filtering :(" />
      ) : (
        <div className="tv-grid grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] gap-2 justify-center items-start mx-auto">
          {shows.map((show) => (
            <MovieCard
              key={show.id}
              category="tv"
              id={show.id}
              title={show.name}
              posterPath={`${IMAGE_BASE_URL}/${show.poster_path}`}
              voteAverage={show.vote_average}
              backdropPath={`${IMAGE_BASE_URL}/${show.backdrop_path}`}
              movieGenres={`${show.genre_ids}`}
              movieOverview={`${show.overview}`}
              date={`${show.first_air_date}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TVShows;