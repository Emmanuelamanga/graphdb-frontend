/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ConnectDatabaseModal from "../Components/ConnectDatabaseModal";
import CreateDatabaseModal from "../Components/CreateDatabaseModal";
import NewRepositoryModal from "../Components/NewRepositoryModal";
import NoData from "../Components/NoData";
import { DatabaseContext } from "../Contexts/DatabaseContext";
const baseUrl = process.env.REACT_APP_BASE_URL;

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRepositoryModalOpen, setIsRepositoryModalOpen] = useState(false);
  const [namespaces, setNamespaces] = useState([]);
  const { databaseConnectionDetails } = useContext(DatabaseContext);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openRepositoryModal = () => setIsRepositoryModalOpen(true);
  const closeRepositoryModal = () => setIsRepositoryModalOpen(false);

  const fetchNamespaces = () => {
    if (databaseConnectionDetails) {
      setLoading(true);
      axios
        .post(`${baseUrl}list-namespaces/`, {
          url: databaseConnectionDetails.endpoint_url,
        })
        .then((response) => {
          setNamespaces(response.data.namespaces || []);
          // setError("");
        })
        .catch((err) => {
          // setError(err.response?.data?.error || "Failed to retrieve connection namespace");
          setNamespaces([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchNamespaces();
  }, [databaseConnectionDetails]);

  return (
    <div className="p-8 bg-gray-100 flex-1">
      {/* {error && (
        <span className="text-red-400">
          {typeof error === "object" ? JSON.stringify(error) : error}
        </span>
      )} */}

      <div className="bg-white p-6 rounded shadow-md mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Active Database Information</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={openCreateModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>

        {databaseConnectionDetails?.port ? (
          <div className="mt-4">
            {["ip_address", "port"].map((detail) => (
              <p key={detail}>
                <strong>{detail.replace("_", " ").toUpperCase()}:</strong>{" "}
                {databaseConnectionDetails[detail]}
              </p>
            ))}
            <p>
              <strong>SPARQL Endpoint:</strong>{" "}
              <a
                href={databaseConnectionDetails.endpoint_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 cursor-pointer"
              >
                {databaseConnectionDetails.endpoint_url}
              </a>
            </p>
          </div>
        ) : (
          <NoData
            title="No Active Database"
            description="Please connect to a database"
            onButtonClick={openCreateModal}
          />
        )}

        {/* {databaseConnectionDetails && (
          <div className="mt-4 flex items-center justify-center">
            <p>OR</p>
            <button
              onClick={openCreateModal}
              className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Connect Existing Database
            </button>
          </div>
        )} */}
      </div>

      {/* Add Database Modal */}
      <CreateDatabaseModal isOpen={isModalOpen} onClose={closeModal} />
      <ConnectDatabaseModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
      />

      {/* Repository Section */}
      <div className="bg-white p-6 rounded shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Repositories</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={openRepositoryModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>

        {loading ? (
          <p>Loading repositories...</p>
        ) : namespaces.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200 mt-4">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Namespace
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SPARQL Endpoint
                </th>
                <th className="px-6 py-3 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {namespaces.map((namespace, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {namespace?.name || "Unknown Namespace"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <a
                      href={namespace?.sparqlEndpoint}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-blue-400"
                    >
                      {namespace?.sparqlEndpoint}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData
            title="No Repositories"
            description="Please add a repository"
            onButtonClick={openRepositoryModal}
          />
        )}
      </div>

      {/* New Repository Modal */}
      <NewRepositoryModal
        isOpen={isRepositoryModalOpen}
        onClose={closeRepositoryModal}
      />
    </div>
  );
}
