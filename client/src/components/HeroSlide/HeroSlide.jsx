import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { IMAGE_BASE_URL } from '../../../config.js';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function HeroSlide({ itemList }) {
  return (
    <div className="w-screen min-h-[80vh] relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation
      >
        {itemList.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative min-h-[80vh] pt-24 pb-12 text-white">
              {/* blurred background */}
              <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat blur-md opacity-70 shadow-[inset_0_5px_100px_50px_rgba(0,0,0,0.98)]"
                style={{ backgroundImage: `url(${IMAGE_BASE_URL}/${item.backdrop_path})` }}
              ></div>

              {/* slide content */}
              <div className="relative w-full flex flex-col md:flex-row z-10 items-center">
                {/* text content */}
                <div className="w-full md:w-2/3 px-6 md:px-12 space-y-4">
                  <div className="text-green-400 text-2xl md:text-4xl font-bold pt-5 pb-5">
                    {item.title}
                  </div>
                  <div className="bg-black/60 w-fit px-2 py-1 rounded-md text-base">On Trending</div>

                  <div className="flex items-center space-x-4 text-base">
                    <div className="flex items-center space-x-1 text-green-400">
                      <FaStar />
                      <span>{parseFloat(item.vote_average.toFixed(1))}</span>
                    </div>
                    <div>{`Released: ${item.release_date}`}</div>
                  </div>

                  <p className="line-clamp-3 text-base">{`Overview: ${item.overview}`}</p>

                  <div className="mt-2">
                    <Link to={`/movies/${item.id}`}>
                      <button className="bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>

                {/* poster image */}
                <div className="w-full md:w-1/3 flex items-center justify-center mt-6 md:mt-0">
                  <img
                    src={`${IMAGE_BASE_URL}/${item.poster_path}`}
                    alt={item.title}
                    className="w-[45%] min-w-[110px] h-auto"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSlide;