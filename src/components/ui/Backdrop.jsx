import React from 'react';

const Backdrop = ({backPath, className, figureClass, tagline}) => {
	let imgSrc = `https://image.tmdb.org/t/p/original/${backPath}`;

	if (backPath == null) {
		imgSrc = '/none.png';
	}

	return (
		<div className='tagline'>
			<figure className={figureClass}>
				<img src={imgSrc} alt="" className={className} />
			</figure>
			<span className='white'>"{tagline}"</span>
		</div>
	);
};

export default Backdrop;
