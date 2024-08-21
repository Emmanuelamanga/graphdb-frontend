import React, { useState } from "react";
import axios from "axios";

const NewRepositoryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    namespace: "",
    endpointUrl: "",
    timeout: "",
    maxResults: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/create-namespace/",
        {
          ...formData,
        }
      );
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create namespace");
      setMessage("");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 relative">
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

        <h2 className="text-2xl font-bold flex items-center mb-4">
          Create New Repository
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            <label className="block w-1/3 text-sm font-medium text-gray-700">
              Namespace *
            </label>
            <input
              type="text"
              name="namespace"
              value={formData.namespace}
              onChange={handleChange}
              required
              placeholder="Enter namespace"
              className="mt-1 p-2  block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Endpoint URL */}
          <div className="flex items-center mb-4">
            <label className="block w-1/3 text-sm font-medium text-gray-700">
              Endpoint URL *
            </label>
            <input
              type="url"
              name="endpointUrl"
              value={formData.endpointUrl}
              onChange={handleChange}
              required
              placeholder="http://localhost:9999/bigdata"
              className="mt-1 p-2  block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Optional: Timeout */}
          <div className="flex items-center mb-4">
            <label className="block w-1/3 text-sm font-medium text-gray-700">
              Timeout (ms)
            </label>
            <input
              type="number"
              name="timeout"
              value={formData.timeout}
              onChange={handleChange}
              placeholder="30000"
              className="mt-1 p-2  block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Optional: Max Results */}
          <div className="flex items-center mb-4">
            <label className="block w-1/3 text-sm font-medium text-gray-700">
              Max Results
            </label>
            <input
              type="number"
              name="maxResults"
              value={formData.maxResults}
              onChange={handleChange}
              placeholder="1000"
              className="mt-1 p-2  block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Create Repository
            </button>
          </div>
        </form>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default NewRepositoryModal;
