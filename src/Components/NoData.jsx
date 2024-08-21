import React from "react";

export default function NoData({ 
  title = "No Data Available", 
  description = "Please add new data to get started", 
  buttonLabel = "Add New", 
  onButtonClick 
}) {
  return (
    <div>
      <div className="mx-auto max-w-lg rounded-md bg-white py-6 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
          className="mx-auto h-12 w-12 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          ></path>
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
        <div className="mt-6">
          <button
            onClick={onButtonClick}
            className="inline-flex items-center font-medium transition border shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 px-4 py-2 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 border-gray-300 capitalize"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="mr-2 -ml-1 h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>{" "}
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
