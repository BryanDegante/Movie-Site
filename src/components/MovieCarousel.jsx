import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';


const getMoviesPerSlide = () => {
	if (window.innerWidth < 600) return 2;
	if (window.innerWidth < 1024) return 3;
	return 4;
};

const MovieCarousel = ({ movies, title }) => {
	const [slideIndex, setSlideIndex] = useState(0);
	const [moviesPerSlide, setMoviesPerSlide] = useState(getMoviesPerSlide());

	useEffect(() => {
		const handleResize = () => setMoviesPerSlide(getMoviesPerSlide());
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const totalSlides = Math.ceil(movies.length / moviesPerSlide);
	const goToSlide = (idx) => setSlideIndex(idx);
	const nextSlide = () => setSlideIndex((prev) => (prev + 1) % totalSlides);
	const prevSlide = () =>
		setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

	const start = slideIndex * moviesPerSlide;
	const end = start + moviesPerSlide;
	const visibleMovies = movies.slice(start, end);
	const slideWidth = `${100 / moviesPerSlide}%`;

	return (
		<div className="carousel__container">
			<h3 className="white">{title}</h3>
			<div className="carousel">
				<GrFormPrevious
					className="arrow"
					onClick={prevSlide}
				></GrFormPrevious>
				<div className="carousel__track">
					{visibleMovies.map((movie, i) => (
						<div
							className="slide"
							key={movie.id}
							style={{
								flex: `0 0 ${slideWidth}`,
								maxWidth: slideWidth,
							}}
						>
							<MovieCard
								title={movie.title}
								date={movie.release_date}
								id={movie.id}
								posterPath={movie.backdrop_path}
								card={'movie'}
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

export default MovieCarousel;
