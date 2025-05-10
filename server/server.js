import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import movieRoutes from './routes/movieRoutes.js';
import tmdbRoutes from './routes/tmdbRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// uncaught errors
app.use((err, req, res, next) => {
    console.log(`Uncaught error: ${err}`);
    res.status(500).json({
        success: false,
        message: "Something went wrong, please try again later."
    })
})

// map routes
// app.use('/api/movies', movieRoutes);
app.use('/api/tmdb', tmdbRoutes);

// // connect to mongoDB
// mongoose.connect(process.env.MONGODB_URI)
//  .then(() => {console.log("Database Connected")})
//  .catch((error) => console.log(`Error connecting to DB: ${error}`))

// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;