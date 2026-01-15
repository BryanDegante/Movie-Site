import React from "react"
import Poster from "./ui/poster";

const MovieDetailsCard = ({ movie }) => {
	const genres = movie.genres || [];
	const languages = movie.spoken_languages || [];


  return (
		<>
			<div className="movie__wrapper">
				<Poster
					path={movie.poster_path}
					className={'movie__poster'}
					figureClass={'movie__description--poster'}
				/>
				<div className="movie__description--text">
					<div id='details' className="movie__realease">
						<span className="sub-heading white bold">Released</span>
						<span className="yellow">{movie.release_date}</span>
					</div>
					<div id='details' className="movie__runtime">
						<span className="sub-heading white bold">Runtime</span>
						<span className="yellow">{movie.runtime} min</span>
					</div>
					<div id='details' className="movie__Age-rating">
						<span className="sub-heading white bold">Language</span>
						<span className="yellow">
							{languages.map((l) =>(
								<span className="yellow">
									| {l.english_name} |
								</span>
							))}
						</span>
					</div>
					<div id='details' className="movie__genre">
						<span className="sub-heading white bold">Genre</span>
						{genres.map((g) => (
							<span className="yellow" key={g.id}>
								| {g.name} |
							</span>
						))}
					</div>
					<div id='details' className="movie__plot">
						<span className="white bold">{movie.overview}</span>
					</div>
				</div>
			</div>
		</>
  );
};

export default MovieDetailsCard;
