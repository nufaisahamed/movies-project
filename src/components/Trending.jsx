// Trending.jsx
import React, { useState, useEffect } from 'react';
import Cards from './Cards/'; // Assuming your Cards.jsx is in the same directory

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const fetchTrendingMovies = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=en-US`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch trending movies');
      }

      const data = await response.json();
      setMovies(data.results.slice(0, 12)); // Limit to 12 movies
    } catch (err) {
      setError(err.message || 'Failed to load trending movies');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!apiKey) {
      setError('API key is missing. Please configure it in your environment.');
      return;
    }
    fetchTrendingMovies();
  }, [apiKey]);

  return (
    <div className="min-h-screen bg-[#1E2525] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-5xl font-semibold  text-[#E94560] text-center mb-16 tracking-wide animate-fadeIn">
          Trending Movies
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-10 p-4 bg-[#A68B5D]/20 border border-[#A68B5D] text-[#F5F5F5] rounded-md text-center animate-fadeIn">
            {error}
          </div>
        )}

        {/* Movies Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array(12).fill().map((_, index) => (
              <div
                key={index}
                className="h-96 bg-[#2A3232] rounded-md animate-pulse shadow-md"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <Cards key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;