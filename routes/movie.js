const express = require('express');
const router = express.Router();
const movieController = require('../controller/movie') 

// router.get('/all' , movieController.getAllMovie)

router.get('/trending' , movieController.getTrendingMovie ); 

router.get('/top-rate' , movieController.getRatingMovie );

router.get('/discover' , movieController.getMovieByGenre ); //genre : the loai 

router.get('/discover/tv' , movieController.getMovieByMediatype); //banner 

router.get('/search', movieController.getMovieByKeyword);

module.exports = router;
