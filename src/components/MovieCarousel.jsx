import React, { useEffect, useRef, useState } from 'react';
import MovieCard from './MovieCard';
import { GrFormPrevious } from 'react-icons/gr';
import { MdNavigateNext } from 'react-icons/md';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const getMoviesPerSlide = () => {
	if (window.innerWidth <= 600) return 2;
	if (window.innerWidth <= 1024) return 3;
	return 4;
};

const MovieCarousel = ({ movies, title }) => {
	const trackRef = useRef(null);
	const containerRef = useRef(null);
	const viewportRef = useRef(null);

	const [slideIndex, setSlideIndex] = useState(0);
	const [moviesPerSlide, setMoviesPerSlide] = useState(getMoviesPerSlide());
	const [viewportWidth, setViewportWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => setMoviesPerSlide(getMoviesPerSlide());
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const newTotal = Math.max(1, Math.ceil(movies.length / moviesPerSlide));
		setSlideIndex((prev) => Math.min(prev, newTotal - 1));
	}, [moviesPerSlide, movies.length]);

	const totalSlides = Math.max(1, Math.ceil(movies.length / moviesPerSlide));

	const goToSlide = (idx) => setSlideIndex(idx);
	const nextSlide = () =>
		setSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));

	const prevSlide = () => setSlideIndex((prev) => Math.max(prev - 1, 0));

	const slideWidth = `${100 / moviesPerSlide}%`;

	useGSAP(() => {
		const track = trackRef.current;
		const viewport = viewportRef.current;
		if (!track || !viewport) return;
	const x = slideIndex * viewport.offsetWidth;

		gsap.to(track, {
			x: -x,
			duration: 0.6,
			ease: 'power3.inOut',
		});
	}, [slideIndex, moviesPerSlide,viewportWidth]);

	return (
		<div className="carousel__container">
			<h3 className="white">{title}</h3>
			<div className="carousel" ref={containerRef}>
				<button
					className="arrow"
					onClick={prevSlide}
					disabled={totalSlides <= 1}
					aria-label="Previous"
				>
					<GrFormPrevious />
				</button>

				<div className="carousel__viewport" ref={viewportRef}>
					<div className="carousel__track" ref={trackRef}>
						{movies.map((movie,i) => (
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
				</div>
			<button
				className="arrow"
				onClick={nextSlide}
				disabled={totalSlides <= 1}
				aria-label="Next"
			>
				<MdNavigateNext />
			</button>
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
