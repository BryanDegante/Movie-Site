import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Poster from './ui/poster';

const ShowCard = ({ title, date, id, posterPath,card }) => {
	let navigate = useNavigate();

	return (
		<div
			className={card}
			onClick={() => navigate(`/ShowDetails/${id}`)}
			key={id}
		>
			<Poster path={posterPath} className={'show__list--poster'} />
			<div className="show__description">
				<h3 className="white">{title}</h3>
				<p className="white">{(date || []).slice(0, 4)} </p>
			</div>
		</div>
	);
};

export default ShowCard;
