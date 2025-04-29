import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl, KEY } from '../constants';
import Poster from '../components/ui/poster';
import { IoMdArrowBack } from 'react-icons/io';
import DetailsCard from '../components/DetailsCard';

const MovieDetails = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState({});

	async function getDetails() {
		const results = await axios.get(`${baseUrl}movie/${id}?api_key=${KEY}`);
		setMovie(results.data);
	}

	useEffect(() => {
		getDetails();
	}, [JSON.stringify(movie), id]);

	return (
		<section id="movie__info">
			<div className="container">
				<div className="row">
					<div className="back__button--wrapper">
						<button
							className="back__button"
							onClick="javascript:window.history.back();"
						>
                            <IoMdArrowBack className='fa-arrow-left' />
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
									<i className="fa-solid fa-star"></i>
									<span className="blue">
										{movie.imdbRating}
									</span>
								</li>
							</ul>
                        </div>
                        <DetailsCard movie={movie} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default MovieDetails;
