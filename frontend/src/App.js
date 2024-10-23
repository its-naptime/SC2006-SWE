import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/home';  // Updated path to Home.js
import About from './pages/about';  // Updated path to About.js
import Search from './pages/search';
import 'bootstrap/dist/css/bootstrap.min.css'; // Add this import

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
