import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl, KEY } from '../constants';
import { IoMdArrowBack, IoMdClose } from 'react-icons/io';
import MovieDetailsCard from '../components/MovieDetailsCard';
import { FaStar } from 'react-icons/fa';
import YouTube from 'react-youtube';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { PiWindowsLogo } from 'react-icons/pi';
import { TiKey } from 'react-icons/ti';

const MovieDetails = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState({});
	const [videos, setVideos] = useState({});
	const [videoKey, setVideoKey] = useState();
	const [filterOpen, setFilterOpen] = useState(false);
	const windowLength = window.innerWidth;
	const windowHeight = window.innerHeight;
	const cols = Math.ceil(windowLength / 50);
	const rows = Math.ceil(windowHeight / 50);
	let boxArray = new Array(cols * rows).fill(0);
	const boxStyles = {
		gridTemplateColumns: `repeat(${cols}, 50px)`,
		gridTemplateRows: `repeat(${rows}, 50px)`,
	};

	
	let navigate = useNavigate();
	
	useEffect(() => {
		if (filterOpen) {
			document.body.classList.add('filter--open');
		} else {
			document.body.classList.remove('filter--open');
		}
	}, [filterOpen]);

	const videoOptions = {
		playerVars: {
			autoplay: 1,
			controls: 0,
			rel: 0,
			showinfo: 0,
			loop: 1,
		},
	};

	useEffect(() => {
		async function getDetails() {
			const results = await axios.get(
				`${baseUrl}movie/${id}?api_key=${KEY}`
			);
			setMovie(results.data);
		}
		async function getVideos() {
			const { data } = await axios.get(
				`${baseUrl}movie/${id}/videos?api_key=${KEY}`
			);
			setVideos(data.results);

			for (let i = 0; i < videos.length; i++) {
				if (videos[i].type === 'Trailer') {
					return setVideoKey(`${videos[i].key}`);
				}
			}
		}

		getDetails();
		getVideos();
	}, [id, videos]);

	const timeLine = gsap.timeline();


	useGSAP(() => {
		
		timeLine.fromTo('.box', {
			scale: 0,
		},{
			scale: 1,
			rotate: 360,
			stagger: {
				amount: 2,
				ease: 'power1.in',
				grid: [rows,cols],
				from: 'center',
			},
		});
		
	}, [filterOpen]);
	

	return (
		<section id="movie__info">
			<div className="container ">
				<div className="row">
					<div className="back__button--wrapper">
						<button
							className="back__button"
							onClick={() => navigate(-1)}
						>
							<IoMdArrowBack className="fa-arrow-left" />
							Back
						</button>
					</div>
					<div className="movie__description--single">
						<div className="movie__description--header">
							<h1 className="movie__title--single white">
								{movie.original_title}
							</h1>
							<ul className="movie__ratings--list">
								<li className="movie__rating">
									<span className="sub-heading white bold">
										IMDB Rating
									</span>
									<FaStar className="fa-solid fa-star" />
									<span className="yellow">
										{Math.ceil(movie.vote_average).toFixed(
											1
										)}
									</span>
								</li>
							</ul>
						</div>
						<MovieDetailsCard movie={movie} />
					</div>
					{filterOpen && (
						<div className="filter__backdrop ">
							<div
								className="grid_container"
								style={boxStyles}
							>
								{
									boxArray.map((e,index) => (
										<div className='box' key={index}>
										</div>
									))
								}
							</div>
							<button
								className="filter__menu--close"
								onClick={() => setFilterOpen(false)}
							>
								<IoMdClose className="fas fa-times" />
							</button>

							<YouTube
								className="clip"
								videoId={videoKey}
								opts={videoOptions}
							/>
						</div>
					)}
					<div className="trailer__wrapper">
						<button
							className="trailer--button"
							onClick={() => setFilterOpen(true)}
						>
							Watch Trailer
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MovieDetails;
