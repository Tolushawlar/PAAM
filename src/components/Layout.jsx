import React from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import InfoCard from './InfoCard'

export default function Layout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const userType = isAdmin ? "PAAM Admin" : "PAAM User";

  return (
    <div className="h-screen flex flex-col">
      <Navbar username={isAdmin ? "Admin User" : "Regular User"} />
      <div className="flex flex-1 pt-16">
        <Sidebar userType={userType} />
        <div className="flex-1 ml-80 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
