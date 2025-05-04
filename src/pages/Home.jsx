import React from 'react';
import MovieCard from '../components/MovieCard';
import MovieCarousel from '../components/MovieCarousel';
import ShowCard from '../components/ShowCard';


const Home = ({trendingMovies, trendingTv}) => {
	return (
		<>
			<section id = 'home'>
				<div className="container">
					<div className="row">
						<div className="trending__container--movies">
							<h3 className='white'>Trending Movies Today</h3>
							<div className="movies">
								{trendingMovies.slice(0, 5).map((movie) => (
									<MovieCard
										title={movie.title}
										date={movie.release_date}
										key={movie.id}
										id={movie.id}
										posterPath={movie.poster_path}
									/>
								))}
							</div>
						</div>
						<div className="trending__container--tv-shows">
							<h3 className='white'>Trending Tv Shows Today</h3>
							<div className="movies">
								{trendingTv.slice(0, 5).map((show) => (
									<ShowCard
										title={show.original_name}
										date={show.release_date}
										key={show.id}
										id={show.id}
										posterPath={show.poster_path}
									/>
								))}
							</div>
						</div>
						<div className="trending__container">
							
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
