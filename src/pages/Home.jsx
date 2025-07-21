import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import ShowCard from '../components/ShowCard';
import axios from 'axios';
import { baseUrl, KEY } from '../constants';
import MovieCarousel from '../components/MovieCarousel';
import TvCarousel from '../components/TvCarousel copy';
const MOVIES_PER_SLIDE = 4;

const Home = () => {
	const [trendingMovies, setTrendingMovies] = useState([]);
	const [popularMovies, setPopularMovies] = useState([]);
	const [nowPlaying, setNowPlaying] = useState([]);
	const [trendingTv, setTrendingTv] = useState([]);
	const [isLoading, setIsLoading] = useState();

	async function getTrendingMovies() {
		const { data } = await axios.get(
			`${baseUrl}trending/movie/day?language=en-US&api_key=${KEY}`
		);

		setTrendingMovies(data.results);
	}

	async function getPopularMovies() {
		const { data } = await axios.get(
			`${baseUrl}movie/popular?api_key=${KEY}`
		);
		setPopularMovies(data.results);
	}
	async function getNowPlaying() {
		const { data } = await axios.get(
			`${baseUrl}movie/now_playing?api_key=${KEY}`
		);
		setNowPlaying(data.results);
	}
	async function getTrendingTv() {
		const { data } = await axios.get(
			`${baseUrl}trending/tv/day?language=en-US&api_key=${KEY}`
		);
		setTrendingTv(data.results);
	}

	function getContent() {
		setIsLoading(true);
		getTrendingTv();
		getTrendingMovies();
		getPopularMovies();
		getNowPlaying();
		setIsLoading(false);
	}

	useEffect(() => {
		getContent();
	}, []);

	return (
		<>
			<section id="home">
				<div className="container">
					<div className="row">
						<MovieCarousel
							movies={trendingMovies}
							title={'Trending Movies'}
						/>
						<MovieCarousel
							movies={popularMovies}
							title={'Popular Movies'}
						/>
						<MovieCarousel
							movies={nowPlaying}
							title={'Now Playing In Theatres'}
						/>
						<TvCarousel
							movies={trendingTv}
							title={'Trending Tv Shows'}
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
