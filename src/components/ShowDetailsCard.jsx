import React from 'react';
import Poster from './ui/poster';
import Backdrop from './ui/Backdrop';

const ShowDetailsCard = ({ show }) => {
	const genres = show.genres || [];
    const networks = show.networks || [];
    const directors = show.created_by || []; 

	return (
		<>
			<div className="movie__wrapper">
				<Poster
					path={show.poster_path}
					className={'movie__poster'}
					figureClass={'movie__description--poster'}
				/>
				<div className="movie__description--text">
					<div id='details'>
						<span className="sub-heading white bold">
							First Aired
						</span>
						<span className="yellow">{show.first_air_date}</span>
					</div>
					<div id='details'>
						<span className="sub-heading white bold">
							Number of ep
						</span>
						<span className="yellow">{show.number_of_episodes} </span>
					</div>
					<div id='details'>
						<span className="sub-heading white bold">
							Number of Seasons
						</span>
						<span className="yellow">{show.number_of_seasons}</span>
					</div>
					<div id='details'>
						<span className="sub-heading white bold">
							Watch it on{' '}
						</span>
						{networks.map((net) => (
							<span className="yellow" key={net.id}>
								| {net.name} |
							</span>
						))}
					</div>
					<div id='details'>
						<span className="sub-heading white bold">Language</span>
						<span className="yellow">{show.original_language}</span>
					</div>
					<div id='details'>
						<span className="sub-heading white bold">
							Created By{' '}
						</span>
						{directors.map((person) => (
							<span className="yellow" key={person.id}>
								| {person.name} |
							</span>
						))}
					</div>
					<div id='details'>
						<span className="sub-heading white bold">Genre</span>
						{genres.map((g) => (
							<span className="yellow" key={g.id}>
								| {g.name} |
							</span>
						))}
					</div>
					<div className="movie__plot" id='details'>
						<span className="white bold">{show.overview}</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default ShowDetailsCard;
