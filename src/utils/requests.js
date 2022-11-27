// const API_KEY = '504b85f6fe0a10a9c7f35945e14e7ddf';

const token = "8qlOkxz4wq";

const requests = {
	// fetchTrending: `/api/movies/trending`,
	// fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	// fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	// fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	// fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	// fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	// fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,

	fetchNetflixOriginals: `/api/movies/discover/tv?token=${token}`,
	
	fetchSearch: `/api/movies/search?token=${token}`,
	
	fetchTrending: `/api/movies/trending?token=${token}`,
 
	fetchTopRated: `/api/movies/top-rate?token=${token}`,

	fetchActionMovies: `/api/movies/discover?genre=28&token=${token}`,
	fetchComedyMovies: `/api/movies/discover?genre=35&token=${token}`,
	fetchHorrorMovies: `/api/movies/discover?genre=27&token=${token}`,
	fetchRomanceMovies: `/api/movies/discover?genre=10749&token=${token}`,
	fetchDocumentaries: `/api/movies/discover?genre=99&token=${token}`
};

export default requests;
