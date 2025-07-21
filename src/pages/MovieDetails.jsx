import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl, KEY } from '../constants';
import Poster from '../components/ui/poster';
import { IoMdArrowBack } from 'react-icons/io';
import MovieDetailsCard from '../components/MovieDetailsCard';
import { FaStar } from 'react-icons/fa';
import Backdrop from '../components/ui/Backdrop';

const MovieDetails = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState({});
	let navigate = useNavigate();
	async function getDetails() {
		const results = await axios.get(`${baseUrl}movie/${id}?api_key=${KEY}`);
		setMovie(results.data);
	}

	useEffect(() => {
		getDetails();
	}, [JSON.stringify(movie), id]);

	return (
		<section id="movie__info">
			<div className="container ">
				<div className="row">
					<div className="back__button--wrapper">
						<button
							className="back__button"
							onClick={() => navigate(-1)}
						>
							<IoMdArrowBack className="fa-arrow-left" />
							Back
						</button>
					</div>
					<div className="movie__description--single">
						<div className="movie__description--header">
							<h1 className="movie__title--single white">
								{movie.original_title}
							</h1>
							<ul className="movie__ratings--list">
								<li className="movie__rating">
									<span className="sub-heading white bold">
										IMDB Rating
									</span>
									<FaStar className="fa-solid fa-star" />
									<span className="yellow">
										{Math.ceil(movie.vote_average).toFixed(
											1
										)}
									</span>
								</li>
							</ul>
						</div>
						<MovieDetailsCard movie={movie} />
					</div>
					<Backdrop
						backPath={movie.backdrop_path}
						className={''}
						figureClass={'backdrop'}
					/>
				</div>
			</div>
		</section>
	);
};

export default MovieDetails;
