
import React, { useState } from "react";
import axiosInstance from "../config/axiosConfig";
import Cards from "./Cards";

const Inputbar = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const apikey = import.meta.env.VITE_MOVIE_API_KEY;

  const fetchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a search term");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await axiosInstance.get(`?apikey=${apikey}&s=${query}`);
      if (res.data.Response === "True") {
        setMovies(res.data.Search);
        setError("");
      } else {
        setError(res.data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-b-4xl pb-6   ">
      <form 
        onSubmit={fetchMovies}
        className="flex flex-col sm:flex-row justify-center items-center gap-3 px-4   "
      >
        <div className="relative w-full max-w-[400px] py-8   ">
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className={`
              w-full p-3 rounded-lg bg-white border-2 
              ${isLoading ? 'border-gray-300' : 'border-amber-200'}
              focus:outline-none focus:border-amber-400 
              transition-all duration-300  
            `}
            type="text"
            placeholder="Search Movies"
            disabled={isLoading}
          />
          {/* Clear button */}
          {query && !isLoading && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 "
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`
            bg-amber-50 px-6 py-2 rounded-2xl border-2 border-amber-200
            hover:bg-amber-100 active:bg-amber-200
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            w-full sm:w-auto
          `}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Searching...
            </span>
          ) : (
            "Search"
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="text-center mt-3">
          <p className="text-red-500 font-medium bg-red-50 py-2 px-4 rounded-lg inline-block animate-fadeIn">
            {error}
          </p>
        </div>
      )}

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-6 min-h-screen  ">
        {isLoading ? (
          // Loading skeleton
          Array(4).fill().map((_, index) => (
            <div 
              key={index}
              className="h-64 bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <div 
              key={movie.imdbID}
              className="transform transition-all duration-300 hover:scale-105 "
            >
              <Cards movie={movie} />
            </div>
          ))
        ) : !error && (
          <p className="col-span-full text-center text-gray-500 mt-4">
            Search for movies to see results
          </p>
        )}
      </div>
      
    </div>
  );
};

export default Inputbar;