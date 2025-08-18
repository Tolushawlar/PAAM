import React from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import InfoCard from './InfoCard'

export default function Layout({ children }) {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')
  const userType = isAdmin ? 'PAAM Admin' : 'PAAM User'
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar userType={userType} />
      <div className="flex-1 overflow-auto">
        <Navbar username={isAdmin ? 'Admin User' : 'Regular User'} />
        {children}
      </div>
    </div>
  )
}