import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import InfoCard from './InfoCard'

export default function Layout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const userType = isAdmin ? "PAAM Admin" : "PAAM User";
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar username={isAdmin ? "Admin User" : "Regular User"} />
      <div className="flex flex-1 pt-12 sm:pt-16">
        <Sidebar 
          userType={userType} 
          onToggle={setSidebarCollapsed}
        />
        <div className={`flex-1 ${sidebarCollapsed ? 'ml-12 sm:ml-16' : 'ml-64 sm:ml-80'} overflow-auto transition-all duration-300 p-4 sm:p-6`}>
          <div className="max-w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}