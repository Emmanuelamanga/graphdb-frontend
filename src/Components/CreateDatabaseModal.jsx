import React from "react";

const CreateDatabaseModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <h2 className="text-2xl font-bold mb-4">Create a new database</h2>
        <p className="text-sm text-gray-500 mb-6">
          Please provide the necessary information to create a new database.
          Required fields are marked with *
        </p>

        {/* Form */}
        <form>
          {/* Database Type */}
          <div className="flex items-center mb-4">
            <label className="block text-sm font-medium text-gray-700 w-1/3">
              Database Type *
            </label>
            <select className="mt-1 p-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <option>Blazegraph</option>
            </select>
          </div>

          {/* Installation Path */}
          <div className="flex items-center mb-4">
            <label className="block text-sm font-medium text-gray-700 w-1/3">
              Installation Path *
            </label>
            <input
              type="text"
              placeholder="/home/user/dbinstall/new"
              className="mt-1 p-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Port */}
          <div className="flex items-center mb-4">
            <label className="block text-sm font-medium text-gray-700 w-1/3">
              Port *
            </label>
            <input
              type="number"
              placeholder="9999"
              className="mt-1 p-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Minimum Memory Usage */}
          <div className="flex items-center mb-4">
            <label className="block text-sm font-medium text-gray-700 w-1/3">
              Minimum Memory Usage (MB)
            </label>
            <input
              type="number"
              placeholder="999"
              className="mt-1 p-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Maximum Memory Usage */}
          <div className="flex items-center mb-6">
            <label className="block text-sm font-medium text-gray-700 w-1/3">
              Maximum Memory Usage (MB)
            </label>
            <input
              type="number"
              placeholder="9999"
              className="mt-1 p-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Create Database
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDatabaseModal;
