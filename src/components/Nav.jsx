import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
const Nav = () => {
	function openMenu() {
		document.body.classList += ' filter--open';
	}

	function closeMenu() {
		document.body.classList.remove('filter--open');
	}

	return (
		<nav>
			<div className="nav__container">
				<a href="index.html">
					<img
						src="./assets/blinker-icon.4f9b2663.png"
						className="logo"
						alt=""
					/>
				</a>
				<div className="link__list">
					<ul>
						<li>
							<a
								href="index.html"
								className="nav__link link__hover--effect"
							>
								Home
							</a>
						</li>
					</ul>
					<button
						className="filter__menu filter__button"
						onClick={openMenu}
					>
						Filter
					</button>
					<div className="filter__backdrop">
						<button
							className="filter__menu--close"
							onClick={closeMenu}
						>
							<IoMdClose className='fas fa-times'/>
						</button>
						<div className="filter__choices">
							<h1 className="filter__choice--text">
								Filter your recently searched by:
							</h1>
							<button
								className="filter__choice--button"
								onClick="changeType('movie')"
							>
								Movie
							</button>
							<button
								className="filter__choice--button"
								onClick="changeType('show')"
							>
								Show
							</button>
							<button
								className="filter__choice--button"
								onClick="changeType('game')"
							>
								Game
							</button>
							<div className="year__wrapper">
								<input
									type="range"
									min="1900"
									max="2025"
									className="slider"
									id="slider__range"
									onchange="movieYear()"
								/>
								<p className="year white">
									Year: <span id="demo"></span>
								</p>
								<button
									className="reset__button"
									onClick="resetYear()"
								>
									Reset Year
								</button>
							</div>
							<button
								className="filter__choice--resetButtons"
								onClick="applyFilters('show')"
							>
								Apply Filters
							</button>
							<button
								className="filter__choice--resetButtons"
								onClick="resetFilters('show')"
							>
								Reset Filters
							</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
