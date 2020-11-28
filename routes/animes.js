import express from 'express';
// import { 
//   trendingAnime,
//   lastUpdatedAnimes,
//   all,
//   getResourceById,
//   getAnimeByName, 
//   getAnimeByCategoryTag
// } from '../controllers/animes.js';

import animeController from '../controllers/animes.js';

const router = express.Router();

// GET all
router.get('/', animeController.all)

// GET latest
router.get('/latest', animeController.lastUpdatedAnimes);

// GET trending anime
router.get('/trending', animeController.trendingAnime);

// GET search anime
router.get('/search', animeController.getAnimeByName);

// GET anime by category and tags
router.get('/category', animeController.getAnimeByCategoryTag)

// GET animes popular this season
router.get('/popular/now', animeController.popularThisSeason);

// GET animes popular next season
router.get('/popular/next', animeController.upcomingNextSeason);

// GET all time popular
router.get('/popular/all', animeController.allTimePopular);

router.post('/animeList', animeController.getAnimesById);

// GET anime by id
router.get('/:id', animeController.getResourceById);


export default router;