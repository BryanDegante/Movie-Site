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
				<Link to ="/">
					<img
						src="/blinker-icon.4f9b2663.png"
						className="logo"
						alt=""
					/>
				</Link>
				<div className="link__list">
					<ul>
						<li>
							<Link
								to="/"
								className="nav__link link__hover--effect"
							>
								Home
							</Link>
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
							>
								Movie
							</button>
							<button
								className="filter__choice--button"
							>
								Show
							</button>
							<button
								className="filter__choice--button"
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
								>
									Reset Year
								</button>
							</div>
							<button
								className="filter__choice--resetButtons"
							>
								Apply Filters
							</button>
							<button
								className="filter__choice--resetButtons"
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
