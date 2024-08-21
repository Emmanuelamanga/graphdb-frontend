import React, { createContext, useState } from "react";

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [databaseConnectionDetails, setConnection] = useState([]);

  const connectDatabase = (dbDetails) => {
    setConnection(dbDetails);
  };

  return (
    <DatabaseContext.Provider value={{ databaseConnectionDetails, connectDatabase }}>
      {children}
    </DatabaseContext.Provider>
  );
};
