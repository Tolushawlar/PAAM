import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import MemberManagement from './pages/MemberManagement'
import MemberProfile from './pages/MemberProfile'
import CoordinatorManagement from './pages/CoordinatorManagement'
import Reports from './pages/Reports'
import Content from './pages/Content'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/MemberManagement" element={<MemberManagement/>} />
          <Route path="/admin/MemberManagement/MemberProfile" element={<MemberProfile/>} />
          <Route path="/admin/CoordinatorManagement" element={<CoordinatorManagement/>} />
          <Route path="/admin/reports" element={<Reports/>} />
          <Route path="/admin/content" element={<Content/>} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
