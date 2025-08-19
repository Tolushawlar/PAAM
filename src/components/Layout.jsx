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
    <div className="h-screen flex flex-col">
      <Navbar username={isAdmin ? "Admin User" : "Regular User"} />
      <div className="flex flex-1 pt-16">
        <Sidebar 
          userType={userType} 
          onToggle={setSidebarCollapsed}
        />
        <div className={`flex-1 ${sidebarCollapsed ? 'ml-16' : 'ml-80'} overflow-auto transition-all duration-300`}>
          {children}
        </div>
      </div>
    </div>
  );
}
