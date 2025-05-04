import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Poster from './ui/poster';

const ShowCard = ({ title, date, id, posterPath }) => {
	let navigate = useNavigate();

	return (
		<div
			className="show"
			onClick={() => navigate(`/MovieDetails/${id}`)}
			key={id}
		>
			<Poster path={posterPath} className={'show__list--poster'} />
			<div className="show__description">
				<h3 className=" white">{title}</h3>
				<p className="white">{date} </p>
			</div>
		</div>
	);
};

export default ShowCard;
