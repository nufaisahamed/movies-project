// Categories.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const fetchCategories = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Fetch genre list
      const genreResponse = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      );
      if (!genreResponse.ok) {
        throw new Error('Failed to fetch categories');
      }
      const genreData = await genreResponse.json();

      // Fetch a popular movie poster for each genre as a representative image
      const tmdbCategories = await Promise.all(
        genreData.genres.map(async (genre) => {
          const movieResponse = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre.id}&sort_by=popularity.desc&language=en-US&page=1`
          );
          const movieData = await movieResponse.json();
          const posterPath = movieData.results[0]?.poster_path || null;

          return {
            id: genre.id,
            name: genre.name,
            description: `Discover the best in ${genre.name.toLowerCase()}.`,
            image: posterPath
              ? `https://image.tmdb.org/t/p/w500${posterPath}`
              : `https://via.placeholder.com/400x250/A68B5D/1E2525?text=${encodeURIComponent(genre.name)}`,
          };
        })
      );

      setCategories(tmdbCategories);
    } catch (err) {
      setError(err.message || 'Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!apiKey) {
      setError('API key is missing. Please configure it in your environment.');
      return;
    }
    fetchCategories();
  }, [apiKey]);

  return (
    <div className="min-h-screen bg-[#1A1A2E]  py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-5xl font-semibold text-[#E94560] text-center mb-16 tracking-wide animate-fadeIn">
          Browse by Genre
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-10 p-4 bg-[#A68B5D]/20 border border-[#A68B5D] text-[#F5F5F5] rounded-md text-center animate-fadeIn">
            {error}
          </div>
        )}

        {/* Categories Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array(6).fill().map((_, index) => (
              <div
                key={index}
                className="h-72 bg-[#2A3232] rounded-md animate-pulse shadow-md"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {categories.map((category) => (
              <Link
                to={`/category/${category.id}`}
                key={category.id}
                className="bg-[#2A3232] rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl group relative"
              >
                {/* Category Image */}
                <div className="relative h-52">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-75"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/400x250/A68B5D/1E2525?text=No+Image')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E2525]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-6 left-6 text-[#F5F5F5] text-2xl font-semibold tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                    {category.name}
                  </div>
                </div>

                {/* Category Content */}
                <div className="p-6">
                  <h2 className="text-xl font-medium text-[#F5F5F5] tracking-wide group-hover:text-[#A68B5D] transition-colors duration-300">
                    {category.name}
                  </h2>
                  <p className="text-sm text-gray-300 mt-2 line-clamp-2">{category.description}</p>
                  <button
                    className="mt-4 w-full bg-[#A68B5D] text-[#F5F5F5] py-2 rounded-md font-medium uppercase tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#8D7449] focus:outline-none focus:ring-2 focus:ring-[#A68B5D]"
                  >
                    Explore
                  </button>
                </div>

                <div className="absolute inset-0 border-2 border-transparent rounded-lg group-hover:border-[#A68B5D] transition-all duration-500 pointer-events-none"></div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;