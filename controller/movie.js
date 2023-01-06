const GenreModel = require('../model/genre');
const MovieModel = require('../model/movie');

//test
// exports.getAllMovie = (req, res, next) => {
//     MovieModel.fetchtAll((movies) => {
//         res.send(movies);
//         });
//     // res.send("ac")
//     // MovieModel.fetchAll( (movies) => {
//     //     console.log(movies);
//     // })
//     //MovieModel.fetchAll(); 
// } 

const limit = 20;

//Hàm tính trang 
function paginate(movies, page) {

    const result = {
        movies: [],
        page: 1,
        totalPage: 0
    }

    let tempArray = [];

    movies.forEach( movie => {

        if (tempArray.length === limit) {
            result.movies.push(tempArray);
            result.totalPage ++ ;
            tempArray = [];
            tempArray.push(movie);

        } else {
            tempArray.push(movie);
        }

    });

    result.movies.push(tempArray);
    
    result.movies = [ ...result.movies[page - 1] ]; //?

    // console.log('length2', result.movies.length ) 

    if (page > 1 && page != undefined) {
        result.page = page;
    }

    return result;
}//


//4. trending
exports.getTrendingMovie = (req, res, next) => { 

    const currentPage = req.query.page || 1;
    // console.log(currentPage);
    MovieModel.fetchAll((movies) => {
        movies.sort( (a, b) => a.popularity - b.popularity );
        const result = paginate(movies, currentPage);
        res.json(result);
    });


}

//5. rating
exports.getRatingMovie = (req, res, next) => {

    const currentPage = req.query.page || 1;

    MovieModel.fetchAll((movies) => {
        movies.sort((a, b) => a.vote_average - b.vote_average);
        const result = paginate(movies, currentPage);
        res.json(result);
    });
}


//6. genre
exports.getMovieByGenre = (req, res, next) => {

    const genreId = parseInt(req.query.genre);

    if (!genreId) {
        res.statusMessage = "Not found genre params";
        res.status(400).end();

    } else {

        const currentPage = req.query.page || 1;

        MovieModel.fetchAll((movies) => {
            GenreModel.fetchtAll((genres) => {
                const genreArray = [];
                const genre = genres.find(g => g.id === genreId);
                if (genre) {

                    movies.forEach((movie) => {
                        if (movie.genre_ids != undefined) {
                            const foundGenreId = movie.genre_ids.find(m => m === genreId);
                            if (foundGenreId) {
                                genreArray.push(movie);
                            }
                        }
                    })

                    const result = paginate(genreArray, currentPage);
                    
                    res.json({
                        ...result,
                        genreName: genre.name
                    })

                } else {
                    res.statusMessage = `Not found genre id ${genreId}`;
                    res.status(400).end();
                }
            })
        })
    }

}


//**banner
exports.getMovieByMediatype = (req, res, next) => {
    console.log('Hello')

    const currentPage = req.query.page || 1; //Đúng

    MovieModel.fetchAll((movies) => {
        // movies.sort((a, b) => a.vote_average - b.vote_average);
        // const result = paginate(movies, currentPage);
        // res.json(result);
        const movieArray = [];

        movies.filter(movie => {
            if (movie.media_type = "tv") {
                movieArray.push(movie)
            }
        })

        const result = paginate(movieArray, currentPage);
        
        res.json(result);

    });

}

//8 tìm kiếm theo từ khoá 
exports.getMovieByKeyword = (req, res, next) => {
    // res.send("hello")
    const keyword = req.query.query;

    console.log('//keyword', keyword);

    MovieModel.fetchAll((movies) => {

        if (keyword !== '') {

            const searchArray = movies.filter( (movie) => {

                if (movie.title) {
                    return movie.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
                }
                if (movie.overview) {
                    return movie.overview.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
                }
                
            })

            const result = paginate(searchArray, 2);

            return res.json(result);

        } else {

            const result = paginate(movies, 1);

            return res.json(result);
        }


    })
}