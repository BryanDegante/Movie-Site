import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './pages/Movies';
import Nav from './components/Nav';
import MovieDetails from './pages/MovieDetails';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import TvShows from './pages/TvShows';
import ShowDetails from './pages/ShowDetails';

function App() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const baseUrl = process.env.REACT_APP_TMBD_BASE_URL;
  const KEY = process.env.REACT_APP_TMBD_API_KEY;
  const [resultsTotal, setResultsTotal] = useState(0);
  const [trendingMovies, setTrendingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])
  const [trendingTv, setTrendingTv] = useState([])
  const [name, setName] = useState('')
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);


  async function getMovies(page, name) {
    const { data } = await axios.get(
      `${baseUrl}search/movie?api_key=${KEY}&query=${name}&page=${page}`
    );
    setMovies(data.results);
    setResultsTotal(data.total_results);
    setTotalPages(data.total_pages);
  }
  async function getTrendingMovies() {
    const { data } = await axios.get(
      `${baseUrl}trending/movie/day?language=en-US&api_key=${KEY}`
    );
    
    setTrendingMovies(data.results)
  }
  async function getTrendingTv() {
    const { data } = await axios.get(
      `${baseUrl}trending/tv/day?language=en-US&api_key=${KEY}`
    );
    setTrendingTv(data.results)
  }
  
  async function getPopularMovies() {
    const { data } = await axios.get(
      `${baseUrl}movie/popular?api_key=${KEY}`
    );
    setPopularMovies(data.results)
  }
  async function getNowPlaying() {
    const { data } = await axios.get(
      `${baseUrl}movie/now_playing?api_key=${KEY}`
      
    );
    setNowPlaying(data.results)
  }
  
  
  function searchMovies(name) {
    setName(name)
    setPage(1)
    getMovies(page,name)
  }
  
  function prevPage(page) {
    
    setPage(page);
    
  }
  function nextPage(page) {
    setPage(page);
  }
  
  useEffect(() => {
    getMovies(page, name)
    console.log(page)
  }, [page,name]);
  useEffect(() => {
    getTrendingTv()
    getTrendingMovies()
    getPopularMovies()
    getNowPlaying()
  }, []);

  return (
    <Router>
      <div className='App'>
        <Nav />
        <SearchBar searchMovies={searchMovies} />
        <Routes>
          <Route path='/' element={<Home trendingMovies={trendingMovies} trendingTv={trendingTv} popularMovies={popularMovies} nowPlaying={nowPlaying}/>} />
          <Route path="/Movies" element={<Movies movies={movies} page={page} totalPages={totalPages} resultsTotal={resultsTotal} prevPage={prevPage} nextPage={nextPage} />}></Route>
          <Route path="/TvShows" element={<TvShows movies={movies} page={page} totalPages={totalPages} resultsTotal={resultsTotal} prevPage={prevPage} nextPage={nextPage} />}></Route>
          <Route path="/MovieDetails/:id" element={<MovieDetails />}></Route>
          <Route path="/ShowDetails/:id" element={<ShowDetails />}></Route>
        </Routes>
        <Footer />
      </div>

    </Router>
  );
}

export default App;
