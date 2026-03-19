import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SortDropdown = ({ options, selected, onChange, label = 'Sort' }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const dropdownMenuRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(e) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target)
			) {
				setIsOpen(false);
			}
		}
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, []);

	useEffect(() => {
		if (isOpen && dropdownMenuRef.current) {
			gsap.fromTo(
				dropdownMenuRef.current,
				{ opacity: 0, y: -8 },
				{ opacity: 1, y: 0, duration: 0.2 },
			);
		}
	}, [isOpen]);

	return (
		<div className="sort" ref={dropdownRef}>
			<div
				className={`sort__selected ${isOpen ? 'active' : ''}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span>
					{options.find((opt) => opt.value === selected)?.label ||
						label}
				</span>
				<span className={`arrow--dropdown ${isOpen ? 'rotate' : ''}`}>
					▾
				</span>
			</div>
			{isOpen && (
				<div className="sort__dropdown" ref={dropdownMenuRef}>
					{options.map((option) => (
						<div
							key={option.value}
							className={`sort__item ${selected === option.value ? 'selected' : ''} ${option.value === '' ? 'reset' : ''}`}
                            onClick={() => {
                                onChange(option.value); 
                                setIsOpen(false);
                            }}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SortDropdown;
