import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { IMAGE_BASE_URL } from '../../../config.js';
import axios from 'axios';
import { BASE_URL } from '../../../config';

function TVInfo({ id }) {
  const [tv, setTv] = useState([]);
  const [genres, setGenres] = useState([]);
  const [prodCompanies, setProdCompanies] = useState([]);
  const [lang, setLang] = useState([]);

  useEffect(() => {
    const fetchTV = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/tmdb?endpoint=tv/${id}`);
        const data = await response.data
        setTv(data);
        setGenres(data.genres);
        setProdCompanies(data.production_companies);
        setLang(data.spoken_languages);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchTV();
  }, [id]);

  return (
    <div className="text-white">
      <div className="text-[30px] font-bold text-[#1CC749] py-5">{tv.name}</div>
      <div className="flex flex-wrap gap-2">
        {genres.map((item) => (
          <button key={item.id} className="rounded bg-white/40 px-2 py-1 text-white text-sm">{item.name}</button>
        ))}
      </div>

      <div className="flex items-center py-4 gap-2">
        <b>Ratings:</b>
        <FaStar className="text-[#1CC749]" />
        <span className="text-[#1CC749]">{tv.vote_average}</span>
        from <span className="text-[#1CC749]">{tv.vote_count}</span> users
      </div>

      <div className="py-1"><b>First Air Date:</b> {tv.first_air_date}</div>
      <div className="flex flex-wrap py-4"><b>Languages:</b>&nbsp;
        {lang.map((item, i) => `${item.english_name}${i !== lang.length - 1 ? "," : ""}`)}
      </div>
      <div className="pb-4"><b>Number of episodes:</b> {tv.number_of_episodes || 'N/A'}</div>
      <div className="pb-4"><b>Number of seasons:</b> {tv.number_of_seasons || 'N/A'}</div>
      <div className="pb-4"><b>Overview:</b> <div>{tv.overview || 'N/A'}</div></div>

      <div className="pb-4"><b>Poster:</b>
        <div className="mt-1">
          <img src={`${IMAGE_BASE_URL}/${tv.poster_path}`} alt="" width="200px" />
        </div>
      </div>

      <div><b>Production Companies:</b>
        <div className="flex flex-col gap-4 max-h-96 overflow-auto">
          {prodCompanies.length === 0 ? (
            <div>N/A</div>
          ) : (
            prodCompanies.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full border-2 border-[#1CC749]">
                  <img src={`${IMAGE_BASE_URL}/${item.logo_path}`} alt="" className="w-10" />
                </div>
                <div>{item.name}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default TVInfo