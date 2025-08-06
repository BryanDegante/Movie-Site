import React, { useEffect, useState } from 'react';
import { baseUrl, KEY } from '../constants';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import PageRotation from '../components/PageRotation';
import ShowCard from '../components/ShowCard';
const TvShows = () => {

const [shows,setShows] = useState([]);
  const [resultsTotal, setResultsTotal] = useState(0);
  const [title, setTitle] = useState('');
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState();
	
	async function getShows(title, page) {
		setIsLoading(true);
		const { data } = await axios.get(
			`${baseUrl}search/tv?api_key=${KEY}&query=${title}&page=${page}`
		);
		setShows(data.results);
		setResultsTotal(data.total_results);
		setTotalPages(data.total_pages);
		setIsLoading(false);
	}

	function search(elm) {
		setTitle(elm);
		setPage(1);
		getShows(title, page);
	}

	function pageChange(elm) {
		setPage(elm);
		getShows(title, elm);
	}

	useEffect(() => {
			getShows(title, page);
		}, [page, title]);


	return (
		<>
			<section id="tv__main">
				<div className="container">
					<div className="row">
						<SearchBar search={search} type={'show'} />
						<img src="/film.png" alt="" className="film-one" />
						{title === '' && (
							<div className="default__wrapper">
								<h4 className="no-title">
									Discover Your Next Tv Show
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
								shows.map((show) => (
									<ShowCard
										title={show.name}
										date={show.first_air_date}
										key={show.id}
										id={show.id}
										posterPath={show.poster_path}
										card={'show__stack'}
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

export default TvShows;
