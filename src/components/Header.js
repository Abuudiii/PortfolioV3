import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b-2 border-green-500">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          .hacker-text {
            font-family: 'Press Start 2P', cursive;
            text-shadow: 0 0 10px #00ff00;
            line-height: 1.8;
          }
          .hacker-border {
            border: 2px solid #00ff00;
            box-shadow: 0 0 10px #00ff00;
          }
          .nav-link {
            font-size: clamp(0.5rem, 1vw, 0.8rem);
            line-height: 1.4;
            padding: 0.5rem 1rem;
            transition: all 0.3s ease;
          }
          .nav-link:hover {
            background-color: rgba(0, 255, 0, 0.1);
            text-shadow: 0 0 15px #00ff00;
          }
          .nav-link.active {
            background-color: rgba(0, 255, 0, 0.2);
            text-shadow: 0 0 20px #00ff00;
          }
        `}
      </style>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-green-500 hover:text-green-400 hacker-text text-lg">
            Portfolio
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`hacker-text nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/projects"
              className={`hacker-text nav-link ${isActive('/projects') ? 'active' : ''}`}
            >
              Projects
            </Link>
            <Link
              to="/contact"
              className={`hacker-text nav-link ${isActive('/contact') ? 'active' : ''}`}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
