import React from "react"
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
					<div class="searchbar__container">
						<div class="search__wrapper">
							<input
								type="text"
								class="search__bar"
								onchange="onSearchChange(event)"
								placeholder="Search for a movie"
							/>
							<div class="icon__wrapper">
								<FaSearch />
							</div>
						</div>
					</div>
  );
};

export default SearchBar;
