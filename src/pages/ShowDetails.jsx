import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl, KEY } from '../constants';
import Poster from '../components/ui/poster';
import { IoMdArrowBack } from 'react-icons/io';
import DetailsCard from '../components/MovieDetailsCard';
import { FaStar } from 'react-icons/fa';
import Backdrop from '../components/ui/Backdrop';
import ShowDetailsCard from '../components/ShowDetailsCard';

const ShowDetails = () => {
	const { id } = useParams();
	const [show, setShow] = useState({});
	let navigate = useNavigate();
	async function getDetails() {
		const results = await axios.get(`${baseUrl}tv/${id}?api_key=${KEY}`);
		setShow(results.data);
	}

	useEffect(() => {
		getDetails();
	}, [JSON.stringify(show), id]);

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
								{show.name}
							</h1>
							<ul className="movie__ratings--list">
								<li className="movie__rating">
									<span className="sub-heading white bold">
										IMDB Rating
									</span>
									<FaStar className="fa-solid fa-star" />
									<span className="yellow">
										{Math.ceil(show.vote_average).toFixed(
											1
										)}
									</span>
								</li>
							</ul>
						</div>
						<ShowDetailsCard show={show} />
					</div>
					<Backdrop
						backPath={show.backdrop_path}
						className={''}
                        figureClass={'backdrop'}
                        tagline={show.tagline}
					/>
				</div>
			</div>
		</section>
	);
};

export default ShowDetails;
