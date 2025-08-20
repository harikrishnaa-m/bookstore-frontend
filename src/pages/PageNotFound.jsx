import React from "react";

function PageNotFound() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center text-center p-6 ">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-2xl text-gray-600 mb-4">Page Not Found</p>
          <p className="text-gray-500 mb-6">
            Oops! It seems the page you're looking for doesn't exist or has been
            moved.
          </p>
          <a
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
