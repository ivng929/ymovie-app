import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../config';

function VideoFrame({ id, category }) {
    const [count, setCount] = useState(0);
    const [videos, setVideos] = useState([]);
  
    useEffect(() => {
      const fetchVideos = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/tmdb?endpoint=${category}/${id}/videos`);
            const data = await response.data
          setVideos(data.results);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchVideos();
    }, [id, category]);
  
    if (videos.length === 0) return null;
  
    const numVideos = Math.min(videos.length, 3);
    const buttons = Array.from({ length: numVideos }, (_, i) => (
      <button
        key={i}
        className={`min-w-[70px] px-4 py-2 m-1 rounded cursor-pointer ${i === count ? 'bg-green-400 text-white' : 'bg-white/25 text-white/70 hover:text-white'}`}
        onClick={() => setCount(i)}>
        {`Video ${i + 1}`}
      </button>
    ));
  
    return (
      <div className="flex flex-col md:flex-row justify-between w-full mb-10">
        <iframe
          src={`https://www.youtube.com/embed/${videos[count].key}?autoplay=1`}
          className="w-[70vw] h-[35vw] min-w-[300px] min-h-[150px]"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="flex md:flex-col items-start mt-4 md:mt-0">
          {buttons}
        </div>
      </div>
    );
}

export default VideoFrame