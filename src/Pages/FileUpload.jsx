/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DatabaseContext } from "../Contexts/DatabaseContext";
const baseUrl = process.env.REACT_APP_BASE_URL;

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { databaseConnectionDetails } = useContext(DatabaseContext);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const [namespaces, setNamespaces] = useState([]);

  useEffect(() => {
    if (databaseConnectionDetails && databaseConnectionDetails.endpoint_url) {
      fetchUploadedFiles();
      fetchNamespaces();
    }
  }, [databaseConnectionDetails]);

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}list-ttl-files/`
      );
      setUploadedFiles(response.data);
    } catch (error) {
      console.error("Error fetching uploaded files", error);
    }
  };
// eslint-disable-next-line 
  const fetchNamespaces = () => {
    if (databaseConnectionDetails && databaseConnectionDetails.endpoint_url) {
      // setLoading(true);
      axios
        .post(`${baseUrl}list-namespaces/`, {
          url: databaseConnectionDetails.endpoint_url,
        })
        .then((response) => {
          setNamespaces(response.data.namespaces || []);
          // setError("");
        })
        .catch((err) => {
          // setError(
          //   err.response?.data?.error ||
          //     "Failed to retrieve connection namespace"
          // );
          setNamespaces([]);
        })
        .finally(() => {
          // setLoading(false);
        });
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files).map((file) => ({
      name: file.name,
      size: file.size,
      namedGraph: namespaces.length > 0 ? namespaces[0].name : "None",
    }));
    setFiles([...files, ...newFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileUpload = async (event) => {
    // const acceptedFormats = [
      // "text/csv",
      // "application/x-turtle",
      // "application/rdf+xml",
    // ];

    const newFiles = Array.from(event.target.files)
      .map((file) => {
        // if (!acceptedFormats.includes(file.type)) {
        //   alert(`Unsupported file format: ${file.name}`);
        //   return null;
        // }
        if (file.size > 5000000) {
          // 5MB
          alert(`File is too large: ${file.name}`);
          return null;
        }
        return {
          name: file.name,
          size: file.size,
          namedGraph: namespaces.length > 0 ? namespaces[0].name : "None", 
          fileData: file,
        };
      })
      .filter((file) => file !== null);

    setFiles([...files, ...newFiles]);

    const formData = new FormData();
    newFiles.forEach((fileObj) => {
      formData.append("files", fileObj.fileData);
    });

    try {
      const response = await axios.post(
        `${baseUrl}upload-ttl/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully", response.data);
      fetchUploadedFiles();
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  const handleNamedGraphChange = (index, namedGraph) => {
    const updatedFiles = [...files];
    updatedFiles[index].namedGraph = namedGraph;
    setFiles(updatedFiles);
  };

  const handleDeleteFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleImport = async (index) => {
    const file = files[index];
  
    const formData = new FormData();
    formData.append("url_endpoint", databaseConnectionDetails.endpoint_url+'/namespace/'+file.namedGraph+'/sparql');
    formData.append("file", file.fileData);
  
    try {
      await axios.post(
        "${baseUrl}import-ttl/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert('File imported successfully')
      fetchUploadedFiles();
      handleDeleteFile(index)
    } catch (error) {
      console.error("Error importing file", error);
    }
  };
  
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">데이터 업로드</h2>
        <div
          className="border border-dashed border-gray-300 p-6 rounded-md text-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 15a4 4 0 108 0M7 3v12M12 8l-4-4-4 4M12 12h6"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-500">
            CSV, TTL, or RDF/XML files only. Drag and drop files here to upload.
          </p>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="mt-4"
          />
        </div>
      </div>

      {files.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="" />
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Named Graph
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Size
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delete
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Import
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {files.map((file, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <input type="checkbox" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {file.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <select
                      value={file.namedGraph}
                      onChange={(e) =>
                        handleNamedGraphChange(index, e.target.value)
                      }
                      className="border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      {namespaces.length > 0 ? (
                        namespaces.map((namespace) => (
                          <option key={namespace.name} value={namespace.name}>
                            {namespace.name}
                          </option>
                        ))
                      ) : (
                        <option value="None">None</option>
                      )}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {file.size} bytes
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteFile(index)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleImport(index)}
                      className="text-gray-600 hover:bg-gray-100 rounded p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mt-8">
            Previously Uploaded Files
          </h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Size
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {uploadedFiles.map((file, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {file.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {file.size} bytes
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
