import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { baseUrl, KEY } from '../constants';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import PageRotation from '../components/PageRotation';

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [resultsTotal, setResultsTotal] = useState(0);
	const [title, setTitle] = useState('');
	const [totalPages, setTotalPages] = useState();
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState();

	async function getMovies(title, page) {
		setIsLoading(true);
		const { data } = await axios.get(
			`${baseUrl}search/movie?api_key=${KEY}&query=${title}&page=${page}`
		);
		setMovies(data.results);
		setResultsTotal(data.total_results);
		setTotalPages(data.total_pages);
		setIsLoading(false);
	}

	function search(elm) {
		setTitle(elm);
		setPage(1);
		getMovies(title, page);
	}

	useEffect(() => {
		getMovies(title, page);
	}, [page, title]);

	function pageChange(elm) {
		setPage(elm);
		getMovies(title, elm);
	}

	// IN CASE IT DOESNT WORK

	// function prevMoviePage() {
	// 	if (page !== 1) {
	// 		setPage((prevPage) => prevPage - 1);
	// 	}
	// }

	// function nextMoviePage() {
	// 	if (page !== totalPages) {
	// 		setPage((prevPage) => prevPage + 1);
	// 	}
	// }

	return (
		<>
			<section id="movies__main">
				<div className="container ">
					<div className="row ">
						<SearchBar search={search} type={'movie'} />

						<img src="/film.png" alt="" className="film-one" />
						{title === '' && (
							<div className="default__wrapper">
								<h4 className="no-title">
									Discover Your Next Movie
								</h4>
							</div>
						)}
						<img src="/film.png" alt="" className="film-two" />
						{title !== '' && (
							<div className="results">
								<p>
									Results Found: "
									<span id="results__number">
										{resultsTotal}
									</span>
									"
								</p>
								<select
									id="filter"
									defaultValue="DEFAULT"
									
								>
									<option value="DEFAULT" disabled>
										Sort
									</option>
									<option value="LOW_TO_HIGH">
										Price, Low to High
									</option>
									<option value="HIGH_TO_LOW">
										Price, High to Low
									</option>
									<option value="RATING">Rating</option>
								</select>
							</div>
						)}
						<div className="movies">
							{isLoading ? (
								<div className="movie__skeleton">
									<div className="skeleton__body skeleton1"></div>
									<div className="skeleton__body skeleton2"></div>
									<div className="skeleton__body skeleton3"></div>
									<div className="skeleton__body skeleton4"></div>
								</div>
							) : (
								movies.map((movie) => (
									<MovieCard
										card={'movie__stack'}
										title={movie.title}
										date={movie.release_date}
										key={movie.id}
										id={movie.id}
										posterPath={movie.poster_path}
									/>
								))
							)}
						</div>
						{title !== '' && (
							<PageRotation
								pageChange={pageChange}
								totalPages={totalPages}
								pageNum={page}
							/>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default Movies;
