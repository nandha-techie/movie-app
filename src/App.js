import { useState, useEffect } from 'react';
import SearchIcon from './search.svg';
import './App.css';
import MovieCard from './MovieCard';

const API_URL = 'http://omdbapi.com/?apikey=451bb355';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    searchMovies('batsman');
  }, []);
  
  const searchMovies = async (title)=> {
    const header = {"Access-Control-Allow-Origin" : "*", "Access-Control-Allow-Credentials" : true };
      const response = await fetch(`${API_URL}&s=${title}`, header);
      const data = await response.json();
      setMovies(data.Search);
  }

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input type="text" value={searchTerm} placeholder="Search for movies" onChange={(e) => setSearchTerm(e.target.value) }/>
        <img src={SearchIcon} alt="search" onClick={()=> searchMovies(searchTerm)} />
      </div>
    {
      movies.length > 0 ? (
        <div className="conatiner">
        { movies.map((movie) => (
            <MovieCard  movie={movie} />
          ))
        }
        </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )
    }
    </div>
  );
}

export default App;