import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const fetchData = async(req, res) => {
    const { endpoint, ...queryParams } = req.query;

    if (!endpoint) {
      return res.status(400).json({ error: 'Missing endpoint parameter' });
    }

    try {
        // construct full URL
        const url = `${TMDB_BASE_URL}/${endpoint}`;
        
        // make call to tmdb
        const response = await axios.get(url, {
          params: {
            api_key: TMDB_API_KEY,
            ...queryParams,
          },
        });
    
        res.status(200).json(response.data);
      } catch (error) {
        console.error('TMDB fetch error:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from TMDB' });
      }
}

const tmbdController = {
    fetchData,
};

export default tmbdController;
