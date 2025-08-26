import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Components/Layout'
import AdminDashboard from './pages/admin/AdminDashboard'
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
import CoordinatorDashboard from './pages/coordinator/CoordinatorDashboard'
import CoordinatorMemberManagement from './pages/coordinator/CoordinatorMemberManagement'
import CoordinatorMeetingManagement from './pages/coordinator/CoordinatorMeetingManagement'
import CoordinatorLiveStreaming from './pages/coordinator/CoordinatorLiveStreaming'
import CoordinatorMembersDirectory from './pages/coordinator/CoordinatorMembersDirectory'
import UserDashboard from './pages/user/UserDashboard'
import UserProfile from './pages/user/UserProfile'
import UserMandateTraining from './pages/user/UserMandateTraining'
import UserCourseModules from './pages/user/UserCourseModules'
import UserLessonContent from './pages/user/UserLessonContent'
import UserQuiz from './pages/user/UserQuiz'
import UserQuizResults from './pages/user/UserQuizResults'
import UserDownloadCertificate from './pages/user/UserDownloadCertificate'
import UserLiveStreaming from './pages/user/UserLiveStreaming'
import UserMembersDirectory from './pages/user/UserMembersDirectory'
import UserDonorsHub from './pages/user/UserDonorsHub'
import UserEvents from './pages/user/UserEvents'
import UserResources from './pages/user/UserResources'
import AddCoordinator from './pages/admin/AddCoordinator'

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
          <Route path="/admin/CoordinatorManagement/AddCoordinator" element={<AddCoordinator/>} />
          <Route path="/admin/reports" element={<Reports/>} />
          <Route path="/admin/content" element={<Content/>} />
          <Route path="/admin/content/add-course" element={<AddCourse/>} />
          <Route path="/admin/content/add-module" element={<AddModule/>} />
          <Route path="/admin/ExaminationManagement" element={<ExaminationManagement/>} />
          <Route path="/admin/ExaminationManagement/CreateQuiz" element={<CreateQuiz/>} />
          <Route path="/coordinator" element={<CoordinatorDashboard />} />
          <Route path="/coordinator/MemberManagement" element={<CoordinatorMemberManagement />} />
          <Route path="/coordinator/MeetingManagement" element={<CoordinatorMeetingManagement />} />
          <Route path="/coordinator/LiveStreaming" element={<CoordinatorLiveStreaming />} />
          <Route path="/coordinator/MembersDirectory" element={<CoordinatorMembersDirectory />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/Profile" element={<UserProfile />} />
          <Route path="/user/MandateTraining" element={<UserMandateTraining />} />
          <Route path="/user/MandateTraining/CourseModules" element={<UserCourseModules />} />
          <Route path="/user/MandateTraining/LessonContent" element={<UserLessonContent />} />
          <Route path="/user/MandateTraining/Quiz" element={<UserQuiz />} />
          <Route path="/user/MandateTraining/QuizResults" element={<UserQuizResults />} />
          <Route path="/user/DownloadCertificate" element={<UserDownloadCertificate />} />
          <Route path="/user/LiveStreaming" element={<UserLiveStreaming />} />
          <Route path="/user/MembersDirectory" element={<UserMembersDirectory />} />
          <Route path="/user/DonorsHub" element={<UserDonorsHub />} />
          <Route path="/user/Events" element={<UserEvents />} />
          <Route path="/user/Resources" element={<UserResources />} />
          <Route path="/" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
