import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Poster from './ui/poster';

const Slide = ({ title, date, id, posterPath ,className }) => {
	let navigate = useNavigate();

    return (
		<div className='slide'
			
		>
			<Poster path={posterPath} className={className} />

		</div>
	);
};

export default Slide;
