
import React from 'react';



const Cards = ({ movie }) => {
  return (
    <div className="max-w-sm w-full rounded-2xl overflow-hidden shadow-lg bg-[#16213E] transform transition-all duration-500 hover:scale-105 hover:shadow-2xl relative group">
      <div className="relative h-64">
        <img
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
          src={movie.Poster || `https://image.tmdb.org/t/p/w500${movie.poster_path}` || 'https://via.placeholder.com/200x300?text=No+Image'}
          alt={movie.Title || movie.title}
          onError={(e) => (e.target.src = 'https://via.placeholder.com/200x300?text=No+Image')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F3460] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-4 relative z-10">
        <h2 className="text-xl font-semibold text-[#F8EDED] line-clamp-1 group-hover:text-[#E94560] transition-colors duration-300">
          {movie.Title || movie.title}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {movie.Year || (movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'N/A')}
        </p>

        <button
          className="absolute bottom-4 left-4 right-4 bg-[#E94560] text-[#F8EDED] py-2 rounded-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#D43A52] focus:outline-none focus:ring-2 focus:ring-[#E94560]"
        >
          View Details
        </button>
      </div>

      <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-[#E94560] transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};

export default Cards;