import React, { useEffect, useState } from 'react';
import ShowCard from './ShowCard';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';

const getShowsPerSlide = () => { 
	if (window.innerWidth < 600) return 2;
	if (window.innerWidth < 1024) return 3;
	return 4;
}

const TvCarousel = ({ shows, title }) => {
	const [slideIndex, setSlideIndex] = useState(0);
		const [showsPerSlide, setShowsPerSlide] = useState(getShowsPerSlide());
	
		useEffect(() => {
			const handleResize = () => setShowsPerSlide(getShowsPerSlide());
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}, []);
	
		const totalSlides = Math.ceil(shows.length / showsPerSlide);
		const goToSlide = (idx) => setSlideIndex(idx);
		const nextSlide = () => setSlideIndex((prev) => (prev + 1) % totalSlides);
		const prevSlide = () =>
			setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
	
		const start = slideIndex * showsPerSlide;
		const end = start + showsPerSlide;
		const visibleShows = shows.slice(start, end);
		const slideWidth = `${100 / showsPerSlide}%`;

	return (
		<div className="carousel__container">
			<h3 className="white">{title}</h3>
			<div className="carousel">
				<GrFormPrevious
					className="arrow"
					onClick={prevSlide}
				></GrFormPrevious>
				<div className="carousel__track">
					{visibleShows.map((movie, i) => (
						<div
							className="slide"
							key={movie.id}
							style={{
								flex: `0 0 ${slideWidth}`,
								maxWidth: slideWidth,
							}}
						>
							<ShowCard
								title={movie.original_name}
								date={movie.release_date}
								id={movie.id}
								posterPath={movie.backdrop_path}
								card={'show'}
							/>
						</div>
					))}
				</div>
				<MdNavigateNext
					className="arrow"
					onClick={nextSlide}
				></MdNavigateNext>
			</div>
			<div className="carousel__dots">
				{Array.from({ length: totalSlides }).map((_, idx) => (
					<span
						key={idx}
						className={`carousel__dot${
							slideIndex === idx ? ' active' : ''
						}`}
						onClick={() => goToSlide(idx)}
					/>
				))}
			</div>
		</div>
	);
};

export default TvCarousel;
