import { BrowserRouter as Router, Routes, Route,  Link } from 'react-router-dom';
import Movies from './pages/Movies';
import Nav from './components/Nav';
import MovieDetails from './pages/MovieDetails';
import Footer from './components/Footer';
import  {  useEffect, useState } from 'react';
import Home from './pages/Home';
import TvShows from './pages/TvShows';
import ShowDetails from './pages/ShowDetails';
import { IoMdClose } from 'react-icons/io';

function App() {
  const [filterOpen, setFilterOpen] = useState(false);

  // Prevent scrolling when filter is open
  useEffect(() => {
    if (filterOpen) {
      document.body.classList.add('filter--open');
    } else {
      document.body.classList.remove('filter--open');
    }
  }, [filterOpen]);



  return (
    <Router>
      <div className='App'>
        <Nav openMenu={() => setFilterOpen(true)} />
        {filterOpen && (
          <div className="filter__backdrop">
            <button className="filter__menu--close" onClick={() => setFilterOpen(false)}>
              <IoMdClose className="fas fa-times" />
            </button>
            <div className="filter__choices">
              <h1 className="filter__choice--text">
                Filter your recently searched by:
              </h1>
              <Link to="/Movies">
                <button className="filter__choice--button" onClick={() => setFilterOpen(false)}>
                Movie
              </button>
              </Link>
              <Link to="/TvShows">
                <button className="filter__choice--button" onClick={() => setFilterOpen(false)}> 
                TV Show
              </button>
              </Link>
              
            </div>
          </div>
        )}
       
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/Movies" element={<Movies/>}></Route>
          <Route path="/TvShows" element={<TvShows  />}></Route>
          <Route path="/MovieDetails/:id" element={<MovieDetails />}></Route>
          <Route path="/ShowDetails/:id" element={<ShowDetails />}></Route>
        </Routes>
        <Footer />
      </div>

    </Router>
  );
}

export default App;
