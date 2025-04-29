import axios from 'axios';
import React, { useEffect, useState } from 'react';


async function getMovies(page) {
}

const getMovies = async () => {
    const [movies, setMovies] = useState([]);
    
    const { data } = await axios.get(
        `${baseUrl}search/movie?api_key=${KEY}&query=superman&page=${page}`
    );
    console.log(data);
    setMovies(data.results);
    setResultsTotal(data.total_results);
    setTotalPages(data.total_pages);

    useEffect(() => {
            console.log(movies);
            getMovies(page);
        }, [page]);
}