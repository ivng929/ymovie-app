import React from 'react';

function Footnote() {
  return (
    <div className="p-[60px] bg-black text-white text-center">
      <p>Made by Ivy Nguyen</p>
      <p>This product uses the TMDB API but is not endorsed or certified by TMDB</p>
      <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          alt="TMDB Logo"
          className="w-[45px] h-[45px] mx-auto mt-2"
        />
      </a>
    </div>
  );
}

export default Footnote;
