import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

const Movies = ({ movies, page, totalPages, resultsTotal, prevPage,nextPage }) => {
	let navigate = useNavigate();


	function prevMoviePage() {
		if (page !== 1) {
			page = page - 1;
			prevPage(page);
		}
	}

	function nextMoviePage() {
		if (page !== totalPages) {
			page = page + 1;
			nextPage(page)
		}
	}


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
							onClick={prevMoviePage}
						/>
						<p className="total-pages">
							{page} of {totalPages}
						</p>
						<MdNavigateNext
							className="page__button"
							onClick={nextMoviePage}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Movies;
