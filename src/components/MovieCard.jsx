import React from 'react';

const MovieCard = ({ title, date, id, poster }) => {
	let imgSrc = `https://image.tmdb.org/t/p/original/${poster}`;

	if (poster == null) {
		imgSrc = "/none.png"
	}

	return (
		<div className="movie">
			<figure>
				<img src={imgSrc} alt="" className="movie__list--poster" />
			</figure>
			<div className="movie__description">
				<h3 className="movie__title white">{title}</h3>
				<p className="movie__year white">{date} </p>
			</div>
		</div>
	);
};

export default MovieCard;
