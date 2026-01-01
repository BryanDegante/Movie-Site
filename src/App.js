import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Movies from './pages/Movies';
import Nav from './components/Nav';
import MovieDetails from './pages/MovieDetails';
import Footer from './components/Footer';
import { useState } from 'react';
import Home from './pages/Home';
import TvShows from './pages/TvShows';
import ShowDetails from './pages/ShowDetails';
import { IoMdClose } from 'react-icons/io';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function App() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterClose, setFilterClose] = useState(false);
  const windowLength = window.innerWidth;
  const windowHeight = window.innerHeight;
  const cols = Math.ceil(windowLength / 50);
  const rows = Math.ceil(windowHeight / 50);
  let boxArray = new Array(cols * rows).fill(0);
  const boxStyles = {
    gridTemplateColumns: `repeat(${cols}, 50px)`,
    gridTemplateRows: `repeat(${rows}, 50px)`,
  };
  const timeLine = gsap.timeline();

  useGSAP(() => {
    if (filterOpen && !filterClose) {
      document.body.classList.add('filter--open');
      timeLine.clear();
      timeLine
        .set('.box', { scale: 0, rotation: 0, opacity: 0 })
        .fromTo(
          '.box',
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            rotate: 180,
            duration: 1,
            stagger: {
              amount: 0.4,
              ease: 'power2.inOut',
              grid: [rows, cols],
              from: 'edges',
            },
          }
        );
    } else if (filterClose && !filterOpen) {
      timeLine.clear();
      timeLine.fromTo(
        '.box',
        {
          scale: 1,
          opacity: 1,
        },
        {
          scale: 0,
          opacity: 0,
          rotate: -180,
          duration: 0.5,
          stagger: {
            amount: 0.2,
            ease: 'power2.out',
            grid: [rows, cols],
            from: 'center',
          },

        }
      ).then(() => {
        document.body.classList.remove('filter--open');
        setFilterOpen(false);
        setFilterClose(false);
      });
    }
  }, [filterOpen, filterClose])


  return (
    <Router>
      <div className='App'>
        <Nav openMenu={() => setFilterOpen(true)} />
        {(filterOpen || filterClose) && (
          <div className="filter__backdrop">
            <div className="grid_container" style={boxStyles}>
              {boxArray.map((e, index) => (
                <div className="box" key={index}></div>
              ))}
            </div>
            <div className='menu__inner'>
              <button className="filter__menu--close" onClick={() => { setFilterClose(true); setFilterOpen(false) }}>
                <IoMdClose className="fas fa-times" />
              </button>
              <div className="filter__choices">
                <h1 className="filter__choice--text">
                  Filter your recently searched by:
                </h1>
                <Link to="/Movies">
                  <button className="filter__choice--button" onClick={() => { setFilterClose(true); setFilterOpen(false) }}>
                    Movie
                  </button>
                </Link>
                <Link to="/TvShows">
                  <button className="filter__choice--button" onClick={() => { setFilterClose(true); setFilterOpen(false) }}>
                    TV Show
                  </button>
                </Link>
              </div>

            </div>
          </div>
        )}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/Movies" element={<Movies />}></Route>
          <Route path="/TvShows" element={<TvShows />}></Route>
          <Route path="/MovieDetails/:id" element={<MovieDetails />}></Route>
          <Route path="/ShowDetails/:id" element={<ShowDetails />}></Route>
        </Routes>
        <Footer />
      </div>

    </Router>
  );
}

export default App;
