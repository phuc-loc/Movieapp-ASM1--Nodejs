const express = require('express');
const router = express.Router();
const videoController = require('../controller/video')

router.post('/video', videoController.postTrailer);

module.exports = router;