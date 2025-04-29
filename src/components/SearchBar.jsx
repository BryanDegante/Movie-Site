import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ searchMovies }) => {
	const [searchString, setSearchString] = useState('');
	let navigate = useNavigate();


	function searchForMovies() {
		searchMovies(searchString)
	}



	

	return (
		<div class="searchbar__container">
			<div class="search__wrapper">
				<input
					type="search"
					class="search__bar"
					onChange={(event) => setSearchString(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							searchForMovies(event.target.value)
							navigate(`/Movies`)
						}
					}}
					placeholder="Search for a movie"
				/>
				<div class="icon__wrapper" onClick={() => searchForMovies()}>
					<FaSearch />
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
