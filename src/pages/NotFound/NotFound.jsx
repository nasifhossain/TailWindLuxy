import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-7xl font-extrabold text-yellow-400 drop-shadow-sm">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-800">
          Oops! Page not found.
        </h2>
        <p className="text-gray-500 mt-2 mb-6 max-w-md">
          The page you're looking for doesn't exist or has been moved. But don’t worry, let’s get you back on track.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-md shadow transition"
        >
          Back to Home
        </Link>
      </div>

      <footer className="text-center py-4 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} LuxuryX. All rights reserved.
      </footer>
    </div>
  );
};

export default NotFound;
