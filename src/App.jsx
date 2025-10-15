import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { DataProvider } from './contexts/DataContext'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import './i18n'
import Layout from './components/Layout'
import LandingPage from './pages/landing/LandingPage'
import About from './pages/landing/About'
import Events from './pages/landing/Events'
import Blog from './pages/landing/Blog'
import BlogPost from './pages/landing/BlogPost'
import Signup from './pages/landing/Signup'
import OTP from './pages/landing/OTP' 
import Login from './pages/landing/Login' 
import AdminDashboard from './pages/admin/AdminDashboard'
import MemberManagement from './pages/admin/MemberManagement'
import MemberProfile from './pages/admin/MemberProfile'
import AddMember from './pages/admin/AddMember'
import CoordinatorManagement from './pages/admin/CoordinatorManagement'
import CoordinatorProfile from './pages/admin/CoordinatorProfile'
import Reports from './pages/admin/Reports'
import Content from './pages/admin/Content'
import AddCourse from './pages/admin/AddCourse'
import AddModule from './pages/admin/AddModule'
import EditModule from './pages/admin/EditModule'
import EditCourse from './pages/admin/EditCourse'
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
import AssignLeader from './pages/admin/AssignLeader'
import AddCoordinator from './pages/admin/AddCoordinator'
import UserCertificateVerification from './pages/user/CertificateVerification'
import CoordinatorCertificateVerification from './pages/coordinator/CertificateVerification'
import AdminCertificateVerification from './pages/admin/CertificateVerification'
import EventManagement from './pages/admin/EventManagement'
import UserAIChat from './pages/user/UserAIChat'
import UserCFNGroupTracker from './pages/user/UserCFNGroupTracker'
import UserMemberOrientation from './pages/user/UserMemberOrientation'
import UserLeadershipTraining from './pages/user/UserLeadershipTraining'
import AdminCFNGroupTracker from './pages/admin/AdminCFNGroupTracker'
import CoordinatorCFNGroupTracker from './pages/coordinator/CoordinatorCFNGroupTracker'
import AdminAIChat from './pages/admin/AdminAIChat'
import CoordinatorAIChat from './pages/coordinator/CoordinatorAIChat'
import CourseContent from './pages/admin/CourseContent'



function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <DataProvider>
          <Router>
      <Routes>
        {/* Landing page without Layout */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogpost" element={<BlogPost />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard routes with Layout */}
        <Route path="/admin" element={<ProtectedRoute><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
        <Route path="/admin/MemberManagement" element={<ProtectedRoute><Layout><MemberManagement/></Layout></ProtectedRoute>} />
        <Route path="/admin/MemberManagement/AddMember" element={<ProtectedRoute><Layout><AddMember/></Layout></ProtectedRoute>} />
        <Route path="/admin/MemberManagement/MemberProfile" element={<ProtectedRoute><Layout><MemberProfile/></Layout></ProtectedRoute>} />
        <Route path="/admin/CoordinatorManagement" element={<ProtectedRoute><Layout><CoordinatorManagement/></Layout></ProtectedRoute>} />
        <Route path="/admin/CoordinatorManagement/AddCoordinator" element={<ProtectedRoute><Layout><AddCoordinator/></Layout></ProtectedRoute>} />
        <Route path="/admin/CoordinatorManagement/CoordinatorProfile" element={<ProtectedRoute><Layout><CoordinatorProfile/></Layout></ProtectedRoute>} />
        <Route path="/admin/CoordinatorManagement/CoordinatorProfile/AssignLeader" element={<ProtectedRoute><Layout><AssignLeader/></Layout></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute><Layout><Reports/></Layout></ProtectedRoute>} />
        <Route path="/admin/content" element={<ProtectedRoute><Layout><Content/></Layout></ProtectedRoute>} />
        <Route path="/admin/content/course-materials" element={<ProtectedRoute><Layout><CourseContent/></Layout></ProtectedRoute>} />
        <Route path="/admin/content/add-course" element={<ProtectedRoute><Layout><AddCourse/></Layout></ProtectedRoute>} />
        <Route path="/admin/content/add-module" element={<ProtectedRoute><Layout><AddModule/></Layout></ProtectedRoute>} />
        <Route path="/admin/content/edit-module" element={<ProtectedRoute><Layout><EditModule/></Layout></ProtectedRoute>} />
        <Route path="/admin/content/edit-course" element={<ProtectedRoute><Layout><EditCourse/></Layout></ProtectedRoute>} />
        <Route path="/admin/ExaminationManagement" element={<ProtectedRoute><Layout><ExaminationManagement/></Layout></ProtectedRoute>} />
        <Route path="/admin/ExaminationManagement/CreateQuiz" element={<ProtectedRoute><Layout><CreateQuiz/></Layout></ProtectedRoute>} />
        <Route path="/admin/EventManagement" element={<ProtectedRoute><Layout><EventManagement/></Layout></ProtectedRoute>} />
        <Route path="/coordinator" element={<ProtectedRoute><Layout><CoordinatorDashboard /></Layout></ProtectedRoute>} />
        <Route path="/coordinator/MemberManagement" element={<ProtectedRoute><Layout><CoordinatorMemberManagement /></Layout></ProtectedRoute>} />
        <Route path="/coordinator/MeetingManagement" element={<ProtectedRoute><Layout><CoordinatorMeetingManagement /></Layout></ProtectedRoute>} />
        <Route path="/coordinator/LiveStreaming" element={<ProtectedRoute><Layout><CoordinatorLiveStreaming /></Layout></ProtectedRoute>} />
        <Route path="/coordinator/MembersDirectory" element={<ProtectedRoute><Layout><CoordinatorMembersDirectory /></Layout></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute><Layout><UserDashboard /></Layout></ProtectedRoute>} />
        <Route path="/user/Profile" element={<ProtectedRoute><Layout><UserProfile /></Layout></ProtectedRoute>} />
        <Route path="/user/MandateTraining" element={<ProtectedRoute><Layout><UserMandateTraining /></Layout></ProtectedRoute>} />
        <Route path="/user/MandateTraining/CourseModules" element={<ProtectedRoute><Layout><UserCourseModules /></Layout></ProtectedRoute>} />
        <Route path="/user/MandateTraining/LessonContent" element={<ProtectedRoute><Layout><UserLessonContent /></Layout></ProtectedRoute>} />
        <Route path="/user/MandateTraining/Quiz" element={<ProtectedRoute><Layout><UserQuiz /></Layout></ProtectedRoute>} />
        <Route path="/user/MandateTraining/QuizResults" element={<ProtectedRoute><Layout><UserQuizResults /></Layout></ProtectedRoute>} />
        <Route path="/user/DownloadCertificate" element={<ProtectedRoute><Layout><UserDownloadCertificate /></Layout></ProtectedRoute>} />
        <Route path="/user/LiveStreaming" element={<ProtectedRoute><Layout><UserLiveStreaming /></Layout></ProtectedRoute>} />
        <Route path="/user/MembersDirectory" element={<ProtectedRoute><Layout><UserMembersDirectory /></Layout></ProtectedRoute>} />
        <Route path="/user/DonorsHub" element={<ProtectedRoute><Layout><UserDonorsHub /></Layout></ProtectedRoute>} />
        <Route path="/user/Events" element={<ProtectedRoute><Layout><UserEvents /></Layout></ProtectedRoute>} />
        <Route path="/user/Resources" element={<ProtectedRoute><Layout><UserResources /></Layout></ProtectedRoute>} />
        <Route path="/user/CertificateVerification" element={<ProtectedRoute><Layout><UserCertificateVerification /></Layout></ProtectedRoute>} />
        <Route path="/user/AIChat" element={<ProtectedRoute><Layout><UserAIChat /></Layout></ProtectedRoute>} />
        <Route path="/user/CFNGroupTracker" element={<ProtectedRoute><Layout><UserCFNGroupTracker /></Layout></ProtectedRoute>} />
        <Route path="/user/MemberOrientation" element={<ProtectedRoute><Layout><UserMemberOrientation /></Layout></ProtectedRoute>} />
        <Route path="/user/LeadershipTraining" element={<ProtectedRoute><Layout><UserLeadershipTraining /></Layout></ProtectedRoute>} />
        <Route path="/coordinator/CertificateVerification" element={<ProtectedRoute><Layout><CoordinatorCertificateVerification /></Layout></ProtectedRoute>} />
        <Route path="/coordinator/CFNGroupTracker" element={<ProtectedRoute><Layout><CoordinatorCFNGroupTracker /></Layout></ProtectedRoute>} />
        <Route path="/coordinator/AIChat" element={<ProtectedRoute><Layout><CoordinatorAIChat /></Layout></ProtectedRoute>} />
        <Route path="/admin/CertificateVerification" element={<ProtectedRoute><Layout><AdminCertificateVerification /></Layout></ProtectedRoute>} />
        <Route path="/admin/CFNGroupTracker" element={<ProtectedRoute><Layout><AdminCFNGroupTracker /></Layout></ProtectedRoute>} />
        <Route path="/admin/AIChat" element={<ProtectedRoute><Layout><AdminAIChat /></Layout></ProtectedRoute>} />
          </Routes>
          </Router>
        </DataProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
