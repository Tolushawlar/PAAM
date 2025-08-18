import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
