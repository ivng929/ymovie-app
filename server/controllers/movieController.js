import axios from 'axios';
import Movie from '../models/movie.js';
import dotenv from 'dotenv';

dotenv.config();
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// get all movies
const fetchMovies = async (req, res) => {
    console.log()
    try{
        // check if number of movies in db is less than 20
        const movieCount = await Movie.countDocuments();
        if (movieCount < 20){
            const response = await axios.get(`${BASE_URL}/discover/movie`, {
                params: {
                    api_key: TMDB_API_KEY
                }
            });
    
            const returnedMovies = response.data.results;
    
            // insert or update movies in db
            for (const movie of returnedMovies){
                await Movie.findOneAndUpdate(
                    {movieId: movie.id},
                    {movieId: movie.id, data: movie},
                    { upsert: true } // insert if not found
                );
            }
        }
        
        const movies = await Movie.find();
        if(movies.length === 0) {
            return res.status(400).json({message: "No movies found in the database"});
        }
        return res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Failed to fetch movies"});
    }
};

const movieController = {
    fetchMovies,
};

export default movieController;