import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Poster from './ui/poster';

const MovieCard = ({ title, date, id, posterPath,card }) => {
	let navigate = useNavigate();

	return (
		<div
			className={card}
			onClick={() => navigate(`/MovieDetails/${id}`)}
			key={id}
		>
				<Poster path={posterPath} className={'movie__list--poster'} />
				<div className="movie__description">
					<h3 className="movie__title white">{title}</h3>
				<p className="movie__year white">{(date || []).slice(0,4)} </p>
				</div>
		</div>
	);
};

export default MovieCard;
