import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
const API_BASE_URL = "https://itunes.apple.com/search";

const API_OPTIONS = {
  method: 'GET',
  headers:{
    accept: 'application/json',
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [movies, setMovies] = useState([]);   
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    const term = searchTerm.trim();
    if (!term) {
      setMovies([]);
      setErrorMessage(null);
      return;
    }
    setLoading(true);
    setErrorMessage(null);
    try {
      setErrorMessage(null);

      const params = new URLSearchParams({
        term: searchTerm.trim(),
        limit: "20",
      });

      const endpoint = `${API_BASE_URL}?${params.toString()}`;
      console.log("Request:", endpoint);  

      const res = await fetch(endpoint, API_OPTIONS);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if(data.res === 'False') {
        setMovies([]);
        setErrorMessage(data.error || "No movies found.");
        return;
      }
      console.log("Result count:", data.resultCount); 
      setMovies(data.results || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setMovies([]);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    }finally{
      setLoading(false);
    }
  };
  

    
    
   
  

  useEffect(() => {

  },[]);

  return (
    <main>

      <div className = "pattern" />
      
      <div className = "wrapper">
        <header>
          <img src = "./paint.png" alt = "paint" />


          <h1>
            Find <span className="text-gradient">Movies
</span> You Love
          </h1>


          <Search searchTerm = {searchTerm} setSearchTerm={setSearchTerm}/>
          <button onClick={fetchMovies} className="mt-3 px-4 py-2 border rounded">
            Search
          </button>
        </header>

        <section className = "all-movies">
          <h2>All Movies</h2>
          {loading ? (<p>Loading...</p>):errorMessage ? (<p className="text-red-500">{errorMessage}</p>) :
          (<ul className="mt-3 grid gap-2">
            {movies.map((m) => (
              <li key={m.trackId} className="border rounded p-2">
                {m.trackName}
              </li>
            ))}
          </ul>)}
        </section>

        
      </div>

    </main>
  )
}

export default App