import React, { useEffect, useRef, useState } from 'react';
import ShowCard from './ShowCard';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const getShowsPerSlide = () => {
	if (window.innerWidth <= 600) return 2;
	if (window.innerWidth <= 1024) return 3;
	return 4;
}

const TvCarousel = ({ shows, title }) => {
	const trackRef = useRef(null);
	const containerRef = useRef(null);
	const viewportRef = useRef(null);

	const [slideIndex, setSlideIndex] = useState(0);
	const [showsPerSlide, setShowsPerSlide] = useState(getShowsPerSlide());

	useEffect(() => {
		const handleResize = () => setShowsPerSlide(getShowsPerSlide());
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const newTotal = Math.max(1, Math.ceil(shows.length / showsPerSlide));
		setSlideIndex((prev) => Math.min(prev, newTotal - 1));
	}, [showsPerSlide, shows.length])

	const totalSlides = Math.max(1, Math.ceil(shows.length / showsPerSlide))

	const goToSlide = (idx) => setSlideIndex(idx);
	const nextSlide = () =>
		setSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));

	const prevSlide = () => setSlideIndex((prev) => Math.max(prev - 1, 0));

	const slideWidth = `${100 / showsPerSlide}%`;

	useGSAP(() => {
		const track = trackRef.current;
		const viewport = viewportRef.current;
		if (!track || !viewport) return;
		const x = slideIndex * viewport.offsetWidth;

		gsap.to(track, {
			x: -x,
			duration: 0.6,
			ease: 'power3.inOut'
		})
	}, [slideIndex, showsPerSlide])

	return (
		<div className="carousel__container">
			<h3 className="white">{title}</h3>
			<div className="carousel" ref={containerRef}>
				<div className="carousel__viewport" ref={viewportRef}>
					<div className="carousel__track" ref={trackRef}>
						{shows.map((show, i) => (
							<div
								className="slide"
								key={show.id}
								style={{
									flex: `0 0 ${slideWidth}`,
									maxWidth: slideWidth,
								}}
							>
								<ShowCard
									title={show.name}
									date={show.release_date}
									id={show.id}
									posterPath={show.backdrop_path}
									card={'show'}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="carousel__dots">
				<button
					className="arrow"
					onClick={prevSlide}
					disabled={totalSlides <= 1}
					aria-label="Previous"
				>
					<GrFormPrevious className='arrow__icon'/>
				</button>
				{Array.from({ length: totalSlides }).map((_, idx) => (
					<span
						key={idx}
						className={`carousel__dot${
							slideIndex === idx ? ' active' : ''
						}`}
						onClick={() => goToSlide(idx)}
					/>
				))}
				<button
					className="arrow"
					onClick={nextSlide}
					disabled={totalSlides <= 1}
					aria-label="Next"
				>
					<GrFormNext className='arrow__icon'/>
				</button>
			</div>
		</div>
	);
};

export default TvCarousel;
