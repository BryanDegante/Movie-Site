import React from 'react';

const Poster = ({ path, className,figureClass }) => {
	let imgSrc = `https://image.tmdb.org/t/p/original/${path}`;

	if (path == null) {
		imgSrc = '/none.png';
	}

	return (
		<figure id="movieDetails" className={figureClass}>
			<img src={imgSrc} alt="" className={className} />
		</figure>
	);
};

export default Poster;
