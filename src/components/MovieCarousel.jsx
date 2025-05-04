import React, { useState } from 'react';
import MovieCard from './MovieCard';
import Slide from './Slide';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

const MovieCarousel = ({ trending }) => {
  const [movieSlide, setMovieSlide] = useState(0);

  const nextSlide = () => {
    setMovieSlide(movieSlide === trending.length -1 ? 0 :movieSlide+1)
  }
  const prevSlide = () => {
    setMovieSlide(movieSlide === 0 ? trending.length -1  : movieSlide-1)
  }

	return (
    <div className="carousel">
      <BsArrowLeftCircleFill className='arrow arrow-left' onClick={prevSlide}/>
			{trending.map((movie, idx) => {
				return (
					<Slide
						title={movie.title}
						date={movie.release_date}
						key={idx}
						id={movie.id}
            posterPath={movie.poster_path}
            className={movieSlide === idx ? "slide" : "slide-hidden"}
					/>
				);
      })}
      <BsArrowRightCircleFill className='arrow arrow-right' onClick={nextSlide}/>
		</div>
	);
};

export default MovieCarousel;
