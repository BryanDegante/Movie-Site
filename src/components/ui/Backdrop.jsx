import React from 'react';

const Backdrop = ({backPath, className, figureClass}) => {
	let imgSrc = `https://image.tmdb.org/t/p/original/${backPath}`;

	if (backPath == null) {
		imgSrc = '/none.png';
	}

    return (
			<figure className={figureClass}>
				<img src={imgSrc} alt="" className={className} />
			</figure>
	);
};

export default Backdrop;
