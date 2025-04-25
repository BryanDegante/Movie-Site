import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './pages/Movies';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path ="/Movies" element={<Movies />}></Route>
        </Routes>
      </div>

    </Router>
  );
}

export default App;
