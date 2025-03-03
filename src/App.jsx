// // App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Inputbar from "./components/Inputbar"; // Assuming this is your main page
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Latest from "./components/Latest";
import Categories from "./components/Categories";
import CategoryDetail from "./components/CategoryDetail";
import Trending from "./components/Trending";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#1A1A2E] ">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Inputbar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
          <Route path="/trending" element={<Trending />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
