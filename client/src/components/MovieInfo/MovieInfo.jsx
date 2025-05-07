import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { IMAGE_BASE_URL } from '../../../config.js';
import axios from 'axios';
import { BASE_URL } from '../../../config';

function MovieInfo({ id }) {
  const [movie, setMovie] = useState([])
  const [genres, setGenres] = useState([])
  const [prodCompanies, setProdCompanies] = useState([])
  const [lang, setLang] = useState([])

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/tmdb?endpoint=movie/${id}`);
        const data = await response.data
        setMovie(data)
        setGenres(data.genres)
        setProdCompanies(data.production_companies)
        setLang(data.spoken_languages)
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchMovie()
  }, [])

  return (
    <div className="text-white">
      <div className="text-[30px] font-bold text-green-400 py-5">
        {movie.title}
      </div>

      <div className="flex flex-wrap gap-2">
        {genres.map((item) => (
          <button
            key={item.id}
            className="bg-white/40 text-white px-2 py-1 rounded"
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="flex items-center py-4">
        <b>Ratings:</b>
        <FaStar className="text-green-400 mx-2" />
        <div className="text-green-400 mr-2">{movie.vote_average}</div>
        from
        <div className="text-green-400 mx-2">{movie.vote_count}</div>
        users
      </div>

      <div className="pb-4">
        <b>Release Date:</b> {movie.release_date}
      </div>

      <div className="flex flex-wrap py-4">
        <b>Languages:&nbsp;</b>
        {lang.map((item, index) => (
          <span key={index}>
            {item.english_name}
            {index < lang.length - 1 ? ',' : ''}
          </span>
        ))}
      </div>

      <div className="pb-4">
        <b>Running time:</b>
        {movie.runtime ? ` ${movie.runtime} minutes` : ' N/A'}
      </div>

      <div className="pb-4">
        <b>Overview:</b>
        <div>{movie.overview || 'N/A'}</div>
      </div>

      <div className="pb-4">
        <b>Poster:</b>
        <div className="mt-2">
          <img
            src={`${IMAGE_BASE_URL}/${movie.poster_path}`}
            alt="Poster"
            className="w-[200px]"
          />
        </div>
      </div>

      <div className="pb-4">
        <b>Production Companies:</b>
        <div className="flex flex-col gap-4">
          {prodCompanies.length === 0 && <div>N/A</div>}
          {prodCompanies.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-green-400 bg-white flex items-center justify-center">
                {item.logo_path && (
                  <img
                    src={`${IMAGE_BASE_URL}/${item.logo_path}`}
                    alt={item.name}
                    className="w-10 h-10 object-contain"
                  />
                )}
              </div>
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieInfo
