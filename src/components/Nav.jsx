import React, { useEffect, useRef, useState } from 'react';
import { Link} from 'react-router-dom';
import gsap from 'gsap';
import {useWindowScroll} from 'react-use'
const Nav = ({ openMenu }) => {

	const navContainerRef = useRef(null);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isNavVisible, setIsNavVisible] = useState(true);
	const { y: currentScrollY } = useWindowScroll();


	useEffect(() => {
		if (currentScrollY === 0) {
			setIsNavVisible(true);
			navContainerRef.current.classList.remove('floating-nav');
		} else if (currentScrollY > lastScrollY) {
			setIsNavVisible(false);
			navContainerRef.current.classList.add('floating-nav');
		} else if (currentScrollY < lastScrollY) {
			setIsNavVisible(true);
			navContainerRef.current.classList.add('floating-nav');
		}
		setLastScrollY(currentScrollY);
	}, [currentScrollY, lastScrollY]);	

	useEffect(() => {
		gsap.to(navContainerRef.current, {
			y: isNavVisible ? 0 : -100,
			opacity: isNavVisible ? 1 : 0,
			duration: 0.2,
		});
	}, [isNavVisible]);

	return (
		<div
			className='container_outer'
			ref={navContainerRef}
		>
			<header>

			<nav >
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
							</header>
		</div>
	);
};

export default Nav;
