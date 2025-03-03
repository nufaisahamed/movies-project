// Latest.jsx
import React, { useState, useEffect } from 'react';

const Latest = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_TMDB_API_KEY; // For Vite

  const fetchLatestMovies = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch latest movies');
      }

      const data = await response.json();
      setMovies(data.results.slice(0, 8));
    } catch (err) {
      setError(err.message || 'Failed to load latest movies');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!apiKey) {
      setError('API key is missing. Please configure it in your environment.');
      return;
    }
    fetchLatestMovies();
  }, [apiKey]);

  return (
    <div className="min-h-screen bg-[#1A1A2E] py-12 px-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <h1 className="text-5xl font-extrabold text-[#E94560] text-center mb-12 tracking-tight animate-fadeIn">
          Latest Releases
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-[#D43A52]/20 border border-[#D43A52] text-[#F8EDED] rounded-lg text-center animate-fadeIn">
            {error}
          </div>
        )}

        {/* Movies Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array(8).fill().map((_, index) => (
              <div
                key={index}
                className="h-96 bg-[#16213E] rounded-lg animate-pulse shadow-md"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-[#16213E] rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group relative"
              >
                {/* Poster */}
                <div className="relative h-72">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/200x300?text=No+Image')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F3460] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-[#F8EDED] line-clamp-1 group-hover:text-[#E94560] transition-colors duration-300">
                    {movie.title}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(movie.release_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-300 mt-2 line-clamp-2">{movie.overview}</p>

                  {/* Button */}
                  <button
                    className="mt-4 w-full bg-[#E94560] text-[#F8EDED] py-2 rounded-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#D43A52] focus:outline-none focus:ring-2 focus:ring-[#E94560] font-medium"
                  >
                    View Details
                  </button>
                </div>

                {/* Border Animation */}
                <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-[#E94560] transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Latest;