import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';
import {  useNavigate } from 'react-router-dom';

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [resultsTotal, setResultsTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState();
	let navigate = useNavigate();

	const baseUrl = process.env.REACT_APP_TMBD_BASE_URL;
	const KEY = process.env.REACT_APP_TMBD_API_KEY;

	async function getMovies(page) {
		const { data } = await axios.get(
			`${baseUrl}search/movie?api_key=${KEY}&query=superman&page=${page}`
		);
		console.log(data);
		setMovies(data.results);
		setResultsTotal(data.total_results);
		setTotalPages(data.total_pages);
	}

	function prevPage() {
		if (page !== 1) {
			setPage(page - 1);
		}
	}
	function nextPage() {
		if (page !== totalPages) {
			setPage(page + 1);
		}
	}
	

	useEffect(() => {
		console.log(movies);
		getMovies(page);
	}, [page]);

	return (
		<section id="movies__main">
			<div className="container">
				<div className="row">
					<div className="results">
						<p>
							Results Found: "
							<span id="results__number">{resultsTotal}</span>"
						</p>
					</div>
					<div className="movies">
						{movies.map((movie) => (
							<MovieCard
								title={movie.title}
								date={movie.release_date}
								key={movie.id}
								id={movie.id}
								posterPath={movie.poster_path}
							/>
						))}
					</div>
					<div className="page__list">
						<GrFormPrevious
							className="page__button"
							onClick={prevPage}
						/>
						<p className="total-pages">
							{page} of {totalPages}
						</p>
						<MdNavigateNext
							className="page__button"
							onClick={nextPage}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Movies;
