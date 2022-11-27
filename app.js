const express = require('express');
const app = express();
const movieRouter = require('./routes/movie');
const videoRouter = require('./routes/video');
const userMiddleware = require('./middleware/user');
const notfoundRouter = require('./routes/404');
const cors = require('cors')
app.use(cors());

app.use(userMiddleware)

app.use('/api/movies', movieRouter);

app.use('api/movies', videoRouter);

app.use(notfoundRouter);

app.listen(5001);