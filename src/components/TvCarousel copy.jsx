import React, { useState } from 'react';
import MovieCard from './MovieCard';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';
const MOVIES_PER_SLIDE = 4;

const TvCarousel = ({ movies, title }) => {
	const [slideIndex, setSlideIndex] = useState(0);
	const totalSlides = Math.ceil(movies.length / MOVIES_PER_SLIDE);
	const goToSlide = (idx) => setSlideIndex(idx);
	const nextSlide = () => setSlideIndex((prev) => (prev + 1) % totalSlides);
	const prevSlide = () =>
		setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

	const start = slideIndex * MOVIES_PER_SLIDE;
	const end = start + MOVIES_PER_SLIDE;
	const visibleMovies = movies.slice(start, end);

	return (
		<div className="carousel__container--movies">
			<h3 className="white">{title}</h3>
			<div className="carousel">
				<GrFormPrevious
					className="arrow"
					onClick={prevSlide}
				></GrFormPrevious>
				<div className="carousel__track">
					{visibleMovies.map((movie, i) => (
						<div className="slide" key={movie.id}>
							<MovieCard
								title={movie.original_name}
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

export default TvCarousel;
