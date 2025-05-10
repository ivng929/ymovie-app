import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../config';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery().get('q');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      try {
        const response = await axios.get(
          `${BASE_URL}/api/tmdb?endpoint=search/multi&query=${encodeURIComponent(query)}`
        );
        setResults(response.data.results);
      } catch (error) {
        console.error('Search failed:', error.message);
        setResults([]);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="pt-20 px-[6vw]">
      <h2 className="text-2xl font-semibold mb-4">Search Results for
        <span className="text-green-500"> "{query}"</span>
      </h2>
      <div className="space-y-4">
        {results.length === 0 && <div className="text-2xl min-h-screen">No result matched your search</div>}
        {results.map((item) => (
          (item.media_type === "tv" || item.media_type === "movie" ) && 
          (<div
            key={item.id}
            className="flex bg-black text-white rounded"
          >
            <img
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                  : 'https://via.placeholder.com/200x300?text=No+Image'
              }
              alt={item.title || item.name}
              className="w-32 object-cover cursor-pointer"
              onClick={(e) => navigate(item.media_type === "movie" 
                                        ? `/movies/${item.id}` 
                                        : `/tv/${item.id}`)}
            />
            <div className="p-4">
              <Link to={item.media_type === "movie" ? `/movies/${item.id}` 
                                                    : `/tv/${item.id}`
              }>
                <h3 className="text-xl font-bold text-green-500">
                    {item.title || item.name}
                </h3>
              </Link>
              <div className="flex text-sm mt-1 px-1 bg-gray-700 rounded w-fit items-center justify-center">
                {item.media_type === "tv" ? "TV Show" : "Movie"}
              </div>
              <p className="text-sm my-2 text-gray-400">
                {item.release_date || item.first_air_date || 'Unknown Release Date'}
              </p>
              <p className="mt-2 text-gray-300 line-clamp-3">
                <span className="font-bold">Overview: </span>
                {item.overview || 'No overview available.'}
              </p>
            </div>
          </div>)
        ))}
      </div>
    </div>
  );
}

export default Search;