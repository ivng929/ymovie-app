import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  movieId: { type: Number, required: true, unique: true},
  data: { type: Object, default: {}}
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;