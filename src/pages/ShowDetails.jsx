import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl, KEY } from '../constants';
import { IoMdArrowBack, IoMdClose } from 'react-icons/io';
import { FaStar } from 'react-icons/fa';
import ShowDetailsCard from '../components/ShowDetailsCard';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import YouTube from 'react-youtube';

const ShowDetails = () => {
	const { id } = useParams();
	const [show, setShow] = useState({});
	const [videoKey, setVideoKey] = useState();
	const [filterOpen, setFilterOpen] = useState(false);
	const [filterClose, setFilterClose] = useState(false);
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

const videoOptions = {
		playsinline: 1,
		fs: 1,
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
			const results = await axios.get(`${baseUrl}tv/${id}?api_key=${KEY}`);
			setShow(results.data);
		}
		async function getVideos() {
			const { data } = await axios.get(
				`${baseUrl}tv/${id}/videos?api_key=${KEY}`
			);

			const trailer = data.results.find(
				(video) => (video.type === 'Trailer' || video.type === 'Opening Credits')
			);
			if (trailer) {
				setVideoKey(trailer.key);
			}
		}
		getVideos();
		getDetails();
	}, [ id]);

	const timeLine = gsap.timeline();

	useGSAP(() => {
		if (filterOpen && !filterClose) {
			document.body.classList.add('filter--open');
			timeLine.clear(); 
			 timeLine
					.set('.box', { scale: 0, rotation: 0, opacity: 0 })
					.fromTo(
						'.box',
						{
							scale: 0,
							opacity: 0,
						},
						{
							scale: 1,
							opacity: 1,
							rotate: 180,
							duration: 1.5,
							stagger: {
								amount: 1.5,
								ease: 'power2.inOut',
								grid: [rows, cols],
								from: 'edges',
							},
						}
			);
			  timeLine.fromTo(
					'.clip',
					{
						opacity: 0,
					},
					{
						opacity: 1,
						duration: 1.5,
						delay: 2,
					},
					'<'
				);
		}
		else if (filterClose && !filterOpen) {
			timeLine.clear(); 
			 timeLine.fromTo(
					'.box',
					{
						scale: 1,
						opacity: 1,
					},
					{
						scale: 0,
						opacity: 0,
						rotate: -180,
						duration: 0.5,
						stagger: {
							amount: 1.5,
							ease: 'power2.out',
							grid: [rows, cols],
							from: 'center',
						},
					}
				);
				timeLine.to(
					'.clip',
					{
						opacity: 0,
						duration: 1.5,
						onComplete: () => {
							document.body.classList.remove('filter--open');
							setFilterOpen(false);
							setFilterClose(false);
						},
					},
					'<'
				);
		}
	}, [filterOpen, filterClose])

	useGSAP(() => {
		window.scrollTo(0, 0)
		gsap.fromTo('#details', {
			scale: 0,
			opacity: 0,
		}, {
			scale: 1,
			opacity: 1,
			duration: 2,
			stagger: {
				amount: 0.5,
				from: 'start',
				ease: 'back.inOut',
			}
		}
		);
	}, [])

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
							<h1 className="movie__title--single white" id='details'>
								{show.name}
							</h1>
							<ul className="movie__ratings--list" id='details'>
								<li className="movie__rating">
									<span className="sub-heading white bold">
										IMDB Rating
									</span>
									<FaStar className="fa-solid fa-star" />
									<span className="yellow">
										{Math.ceil(show.vote_average).toFixed(
											1
										)}
									</span>
								</li>
							</ul>
						</div>
						<ShowDetailsCard show={show} />
					</div>
					{(filterOpen || filterClose) && (
						<div className="filter__backdrop ">
							<div className="grid_container" style={boxStyles}>
								{boxArray.map((e, index) => (
									<div className="box" key={index}></div>
								))}
							</div>
							<button
								className="filter__menu--close"
								onClick={() => {
									setFilterClose(true);
									setFilterOpen(false);
								}}
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
					<div id='details' className="trailer__wrapper">
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

export default ShowDetails;
