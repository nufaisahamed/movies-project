// CategoryDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';



const CategoryDetail = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const fetchMoviesByCategory = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Fetch movies for the genre
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}&language=en-US&page=1`
      );
      if (!movieResponse.ok) {
        throw new Error('Failed to fetch movies');
      }
      const movieData = await movieResponse.json();
      setMovies(movieData.results.slice(0, 12)); // Limit to 12 movies

      // Fetch category name (optional, could store in state from Categories)
      const genreResponse = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      );
      if (!genreResponse.ok) {
        throw new Error('Failed to fetch genre name');
      }
      const genreData = await genreResponse.json();
      const genre = genreData.genres.find(g => g.id === parseInt(id));
      setCategoryName(genre ? genre.name : 'Category');
    } catch (err) {
      setError(err.message || 'Failed to load movies');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!apiKey) {
      setError('API key is missing. Please configure it in your environment.');
      return;
    }
    fetchMoviesByCategory();
  }, [id, apiKey]);

  return (
    <div className="min-h-screen bg-[#1A1A2E]  py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-5xl font-semibold text-[#F5F5F5] text-center mb-16 tracking-wide animate-fadeIn">
          {categoryName} Movies
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

export default CategoryDetail;