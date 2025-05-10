import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GenreTags({ category, genreList }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const toggleGenre = (genre) => {
    if (genre === "All") {
      setSelectedGenres([]);
    } else {
      setSelectedGenres((prev) => {
        if (prev.includes(genre)) {
          const updated = prev.filter((g) => g !== genre);
          return updated;
        } else {
          return [...prev, genre];
        }
      });
    }
  };

  useEffect(() => {
    if (selectedGenres.length === 0) {
      navigate(`/${category}`);
    } else {
      navigate(`/${category}?genres=${selectedGenres.join(",")}`);
    }
  }, [selectedGenres]);

  return (
    <div className="flex flex-wrap gap-2 p-2 mb-4">
      <div className="text-green-400 font-bold text-lg">Genre</div>

      <button
        className={`px-2 py-1 rounded cursor-pointer text-sm font-medium transition ${
          selectedGenres.length === 0
            ? 'bg-green-500 text-white'
            : 'bg-white/20 text-white/60 hover:text-white'
        }`}
        onClick={() => toggleGenre("All")}
      >
        All Genres
      </button>

      {genreList.map((genre) => (
        <button
          key={genre.id}
          onClick={() => toggleGenre(genre.id)}
          className={`px-2 py-1 rounded cursor-pointer text-sm font-medium transition ${
            selectedGenres.includes(genre.id)
              ? 'bg-green-500 text-white'
              : 'bg-white/20 text-white/60 hover:text-white'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default GenreTags;