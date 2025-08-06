import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ search, type }) => {
	const [searchString, setSearchString] = useState('');
	let navigate = useNavigate();

	function searchTitle() {
		search(searchString);
	}

	return (
		<div className="searchbar__container">
			<div className="search__wrapper">
				<input
					type="search"
					className="search__bar"
					onChange={(event) => setSearchString(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === 'Enter' && type ==='movie') {
							searchTitle();
							navigate(`/Movies`);
						}
						if (event.key === 'Enter' && type === 'show') {
							searchTitle();
							navigate(`/TvShows`);
						}
					}}
					placeholder="Search"
				/>
				<div className="icon__wrapper" onClick={() => searchTitle()}>
					<FaSearch />
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
