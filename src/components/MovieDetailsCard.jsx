import React from "react"
import Poster from "./ui/poster";
import Backdrop from "./ui/Backdrop";

const MovieDetailsCard = ({ movie }) => {
  const genres = movie.genres || [];

  return (
		<>
			<div className="movie__wrapper">
				
				<Poster
					path={movie.poster_path}
					className={'movie__poster'}
					figureClass={'movie__description--poster'}
				/>
				<div className="movie__description--text">
					<div className="movie__realease">
						<span className="sub-heading white bold">Released</span>
						<span className="yellow">{movie.release_date}</span>
					</div>
					<div className="movie__runtime">
						<span className="sub-heading white bold">Runtime</span>
						<span className="yellow">{movie.runtime} min</span>
					</div>
					<div className="movie__Age-rating">
						<span className="sub-heading white bold">Language</span>
						<span className="yellow">{movie.original_language}</span>
					</div>
					<div className="movie__Director">
						<span className="sub-heading white bold">Director</span>
						<span className="yellow">${movie.Director}</span>
					</div>
					<div className="movie__writer">
						<span className="sub-heading white bold">Writer</span>
						<span className="yellow">${movie.Writer}</span>
					</div>
					<div className="movie__actors">
						<span className="sub-heading white bold">Actors</span>
						<span className="yellow">${movie.Actors}</span>
					</div>
					<div className="movie__genre">
						<span className="sub-heading white bold">Genre</span>
						{genres.map((g) => (
							<span className="yellow" key={g.id}>
								
								| {g.name} |
							</span>
						))}
					</div>
					<div className="movie__plot">
						<span className="white bold">{movie.overview}</span>
					</div>
				</div>
			</div>
		</>
  );
};

export default MovieDetailsCard;
