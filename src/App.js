import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import FileUpload from './Pages/FileUpload';
import { DatabaseProvider } from './Contexts/DatabaseContext';

function App() {
  return (
    <Router>
      <DatabaseProvider>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
             <Route path="/upload" element={<FileUpload />} />
          </Routes>
        </div>
      </div>
      </DatabaseProvider>
    </Router>
  );
}

export default App;
