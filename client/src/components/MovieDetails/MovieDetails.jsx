import React from 'react'
import { useParams } from 'react-router-dom'
import VideoFrame from '../VideoFrame/VideoFrame'
import MovieInfo from '../MovieInfo/MovieInfo'
import TVInfo from '../TVInfo/TVInfo'

function MovieDetails({ category }) {
  const { id } = useParams()

  return (
    <div className="pt-[70px] px-6 md:px-[6vw]">
      <VideoFrame id={id} category={category} />
      {category === "movie" ? <MovieInfo id={id} /> : <TVInfo id={id} />}
    </div>
  )
}

export default MovieDetails