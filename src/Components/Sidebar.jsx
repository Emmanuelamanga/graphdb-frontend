import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-60 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-xl font-semibold">Hike Lab.</div>
      <nav className="mt-4 flex-1">
        <ul>
          <li className="py-2 px-4 hover:bg-gray-700">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) =>  isActive ? "text-blue-500 font-bold " : "text-white"
              }
            >
              설정
            </NavLink>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <NavLink 
              to="/upload" 
              className={({ isActive }) => 
                isActive 
                  ? "text-blue-500 font-bold" 
                  : "text-white"
              }
            >
              데이터 입력로드
            </NavLink>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <NavLink 
              to="/namespace" 
              className={({ isActive }) => 
                isActive 
                  ? "text-blue-500 font-bold" 
                  : "text-white"
              }
            >
              Namespace
            </NavLink>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <NavLink 
              to="/sparql" 
              className={({ isActive }) => 
                isActive 
                  ? "text-blue-500 font-bold" 
                  : "text-white"
              }
            >
              SPARQL
            </NavLink>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <NavLink 
              to="/stats" 
              className={({ isActive }) => 
                isActive 
                  ? "text-blue-500 font-bold" 
                  : "text-white"
              }
            >
              통계
            </NavLink>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <NavLink 
              to="/graph-exploration" 
              className={({ isActive }) => 
                isActive 
                  ? "text-blue-500 font-bold" 
                  : "text-white"
              }
            >
              그래프 탐색
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
