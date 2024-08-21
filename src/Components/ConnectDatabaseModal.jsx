import React, { useContext, useState } from "react";
import axios from "axios";
import { DatabaseContext } from "../Contexts/DatabaseContext";
const baseUrl = process.env.REACT_APP_BASE_URL;

const ConnectDatabaseModal = ({ isOpen, onClose }) => {
  const [databaseType, setDatabaseType] = useState("bigdata");
  const [ipAddress, setIpAddress] = useState("");
  const [port, setPort] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { connectDatabase } = useContext(DatabaseContext);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${baseUrl}connect-blazegraph/`,
        {
          database_type: databaseType,
          ip_address: ipAddress,
          port: port,
        }
      );
      connectDatabase(response.data);
      setMessage(response.data.message);
      setError("");
    } catch (err) {  
      connectDatabase([])
      setError("Failed to connect to database check your connection and try again");
      setMessage("");
    } finally {
    }
  };

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
        <h2 className="text-2xl font-bold mb-4">
          Connect with the existing database
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter the IP and port to connect to an existing database. Required
          fields are marked with *
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Database Type */}
          <div className="flex items-center mb-4">
            <label className="block text-sm font-medium text-gray-700 w-1/3">
              Database Type *
            </label>
            <select
              className="mt-1 p-2  block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setDatabaseType(e.target.value)}
            >
              <option value="bigdata">Bigdata</option>
              <option value="blazegraph">Blazegraph</option>
              <option>Other</option>
            </select>
          </div>

          {/* IP Address */}
          <div className="flex items-center mb-4">
            <label className="block text-sm font-medium text-gray-700 w-1/3">
              IP Address *
            </label>
            <input
              type="text"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="111.222.333.45"
              className="mt-1 p-2  block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Port */}
          <div className="flex items-center mb-6">
            <label className="block text-sm font-medium text-gray-700 w-1/3">
              Port *
            </label>
            <input
              type="number"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="9999"
              className="mt-1 p-2  block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Connect Database
            </button>
          </div>
        </form>

        {/* Display Message */}
        {message && <p className="mt-4 text-green-500">{message}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default ConnectDatabaseModal;
