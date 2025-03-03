// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// const Header = () => {
    
//   return (
//     <div> 
//         <div >
//         <nav className='h-20 bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364] flex flex-row justify-between items-center rounded-b-3xl '>
//             <h1 className='text-[#7AA1D2] text-5xl font-bold p-3'>CineSphere</h1>
      
//         <div className='flex gap-6 '>
//        <a className=' text-[#7AA1D2] hover:text-[#DBD4B4]' href="#"> Home </a>
//        <a className=' text-[#7AA1D2] hover:text-[#DBD4B4]' href="#"> Latest </a>
//        <a className=' text-[#7AA1D2] hover:text-[#DBD4B4]' href="#"> Categories </a>
//        <a className=' text-[#7AA1D2] hover:text-[#DBD4B4]' href="#"> Trending </a>
//         </div>
//         <div className='flex p-4 gap-4'>
//             <button className='border rounded bg-[#9a8478] text p-2 hover:bg-black hover:text-white'>Login</button>
//             <button className='border rounded bg-[#9a8478] text p-2 hover:bg-black hover:text-white'>Sign Up</button>
//         </div>
//         </nav>
      
//         </div>
//     </div>
//   )
// }

// export default Header
// Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <div>
      <nav className="h-20 bg-gradient-to-r from-[#1A1A2E] via-[#16213E] to-[#0F3460] flex flex-row justify-between items-center rounded-b-1xl px-6 shadow-lg">
        {/* Logo */}
        <h1 className="text-[#E94560] text-3xl md:text-5xl font-extrabold tracking-tight transform transition-all duration-300 hover:scale-105">
          <Link to="/">CineSphere</Link>
        </h1>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-[#E94560] text-3xl z-20 focus:outline-none transform transition-transform duration-300 hover:rotate-90"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            to="/"
            className="text-[#F8EDED] text-lg font-medium relative overflow-hidden group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E94560] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link
            to="/latest"
            className="text-[#F8EDED] text-lg font-medium relative overflow-hidden group"
          >
            Latest
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E94560] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link
            to="/categories"
            className="text-[#F8EDED] text-lg font-medium relative overflow-hidden group"
          >
            Categories
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E94560] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link
            to="/trending"
            className="text-[#F8EDED] text-lg font-medium relative overflow-hidden group"
          >
            Trending
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E94560] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex p-4 gap-4">
          <Link
            to="/login"
            className="bg-[#E94560] text-white px-4 py-2 rounded-full font-medium shadow-md transform transition-all duration-300 hover:bg-[#D43A52] hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#E94560]"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-transparent border-2 border-[#E94560] text-[#E94560] px-4 py-2 rounded-full font-medium transform transition-all duration-300 hover:bg-[#E94560] hover:text-white hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#E94560]"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            fixed top-0 right-0 h-full w-72 bg-[#16213E] shadow-2xl
            transform transition-transform duration-500 ease-in-out md:hidden
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          style={{ zIndex: 10 }}
        >
          <div className="flex flex-col p-6 mt-20 gap-6">
            <Link
              to="/"
              className="text-[#F8EDED] text-xl font-medium relative group"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E94560] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              to="/latest"
              className="text-[#F8EDED] text-xl font-medium relative group"
              onClick={() => setIsMenuOpen(false)}
            >
              Latest
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E94560] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              to="/categories"
              className="text-[#F8EDED] text-xl font-medium relative group"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E94560] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              to="/trending"
              className="text-[#F8EDED] text-xl font-medium relative group"
              onClick={() => setIsMenuOpen(false)}
            >
              Trending
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E94560] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              to="/login"
              className="bg-[#E94560] text-white px-4 py-2 rounded-full font-medium text-center transform transition-all duration-300 hover:bg-[#D43A52] hover:shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-transparent border-2 border-[#E94560] text-[#E94560] px-4 py-2 rounded-full font-medium text-center transform transition-all duration-300 hover:bg-[#E94560] hover:text-white hover:shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 md:hidden transition-opacity duration-300"
          onClick={toggleMenu}
          style={{ zIndex: 5 }}
        />
      )}
    </div>
  );
};

export default Header;