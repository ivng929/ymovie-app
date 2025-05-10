import express from 'express';
import tmdbController from '../controllers/tmdbController.js';

const router = express.Router();

router.get('/', tmdbController.fetchData);

export default router;