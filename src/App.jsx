import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Components/Layout'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserDashboard from './pages/user/UserDashboard'
import UserProfile from './pages/user/UserProfile'
import MemberManagement from './pages/admin/MemberManagement'
import MemberProfile from './pages/admin/MemberProfile'
import CoordinatorManagement from './pages/admin/CoordinatorManagement'
import CoordinatorProfile from './pages/admin/CoordinatorProfile'
import Reports from './pages/admin/Reports'
import Content from './pages/admin/Content'
import AddCourse from './pages/admin/AddCourse'
import AddModule from './pages/admin/AddModule'
import ExaminationManagement from './pages/admin/ExaminationManagement'
import CreateQuiz from './pages/admin/CreateQuiz'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/MemberManagement" element={<MemberManagement/>} />
          <Route path="/admin/MemberManagement/MemberProfile" element={<MemberProfile/>} />
          <Route path="/admin/CoordinatorManagement" element={<CoordinatorManagement/>} />
          <Route path="/admin/CoordinatorManagement/CoordinatorProfile" element={<CoordinatorProfile/>} />
          <Route path="/admin/reports" element={<Reports/>} />
          <Route path="/admin/content" element={<Content/>} />
          <Route path="/admin/content/add-course" element={<AddCourse/>} />
          <Route path="/admin/content/add-module" element={<AddModule/>} />
          <Route path="/admin/ExaminationManagement" element={<ExaminationManagement/>} />
          <Route path="/admin/ExaminationManagement/CreateQuiz" element={<CreateQuiz/>} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
