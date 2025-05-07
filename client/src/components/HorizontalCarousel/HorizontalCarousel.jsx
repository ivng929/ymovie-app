import React from 'react'
import MovieCard from '../MovieCard/MovieCard.jsx';
import { IMAGE_BASE_URL } from '../../../config.js';

function HorizontalCarousel({category, title, itemList}) {
  return (
    <div data-aos="fade-down" className="pl-[6vw] pr-[6vw] pt-10 overflow-visible">
      <div className="font-bold text-lg">{title}</div>
      <div className="flex space-x-4 overflow-x-auto pl-[2vw] pr-[2vw] py-10 scrollbar-thin 
                      scrollbar-thumb-green-400 scrollbar-track-transparent">
        {itemList.map((item) => (
          <MovieCard
            key={item.id}
            category={category}
            id={item.id}
            title={category === "movies" ? item.title : item.name}
            posterPath={`${IMAGE_BASE_URL}/${item.poster_path}`}
            voteAverage={item.vote_average}
            backdropPath={`${IMAGE_BASE_URL}/${item.backdrop_path}`}
            movieGenres={`${item.genre_ids}`}
            movieOverview={`${item.overview}`}
            date={category === "movies" ? `${item.release_date}` : `${item.first_air_date}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HorizontalCarousel;