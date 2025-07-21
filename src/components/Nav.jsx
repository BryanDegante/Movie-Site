import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
const Nav = ({openMenu}) => {
	let navigate = useNavigate();
	

	return (
		<nav>
			<div className="nav__container">
				<Link to="/">
					<img
						src="/blinker-icon.4f9b2663.png"
						className="logo"
						alt=""
					/>
				</Link>
				<div className="link__list">
					<ul>
						<li>
							<a
								href="/"
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
				</div>
			</div>
			
		</nav>
	);
};

export default Nav;
