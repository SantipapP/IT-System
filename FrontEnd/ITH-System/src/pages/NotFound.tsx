import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="mt-4 text-xl text-gray-700">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="mt-2 text-gray-600">It might have been removed or the URL is incorrect.</p>
        <Link
          to="/"
          className="inline-block px-6 py-2 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;