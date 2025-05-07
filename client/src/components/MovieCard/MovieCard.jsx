import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

function MovieCard({
  category,
  id,
  title,
  posterPath,
  voteAverage,
  backdropPath,
  movieGenres,
  movieOverview,
  date,
}) {
  return (
    <div className="relative w-fit h-fit mb-6 group">
      {/* normal card */}
      <div className="w-[150px] rounded-lg overflow-hidden transition-all bg-transparent group-hover:opacity-0">
        <Link to={`/${category}/${id}`} className="text-white no-underline">
          <div className="relative w-full bg-transparent">
            <img src={posterPath} alt="" className="w-full" />
            <div className="absolute inset-0 z-10 shadow-[inset_-2px_-60px_45px_-24px_rgba(9,9,24,0.961)] hidden md:block" />
          </div>
          <div className="p-1 bg-transparent">
            <h3 className="text-base font-bold m-0">{title}</h3>
          </div>
        </Link>
      </div>

      {/* card on hover */}
      <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-black/70 shadow-[0_0_5px_2px_rgba(255,255,255,0.719)] 
      scale-100 opacity-0 group-hover:scale-125 group-hover:opacity-100 z-30 transition-all duration-300">
        <Link to={`/${category}/${id}`} className="w-full text-white no-underline">
          <div className="w-full rounded-lg overflow-hidden">
            <img src={backdropPath} alt="" className="w-full rounded-t-lg" />
          </div>
          <div className="text-sm px-1 pt-1 hover:text-green-500 font-semibold">{title}</div>
          <div className="flex text-xs px-1 py-1 items-center">
            <FaStar className="text-green-500 pr-1" />
            <div className="text-green-500">{parseFloat(voteAverage.toFixed(1))}</div>
            <div className="pl-2">{`| ${date}`}</div>
          </div>
          <div className="text-[11px] px-1 line-clamp-5 overflow-hidden text-ellipsis">
            {movieOverview !== '' ? movieOverview : '[ No overview available ]'}
          </div>
          <div className="text-green-500 text-[13px] px-1 pt-1">Click to view more</div>
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
