import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './pages/Movies';
import Nav from './components/Nav';
import MovieDetails from './pages/MovieDetails';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Router>
      <div className='App'>
        <Nav />
        <SearchBar />
        <Routes>
          <Route path ="/Movies" element={<Movies />}></Route>
          <Route path ="/MovieDetails/:id" element={<MovieDetails />}></Route>
        </Routes>
        <Footer />
      </div>

    </Router>
  );
}

export default App;
