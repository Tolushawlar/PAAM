import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { DataProvider } from './contexts/DataContext'
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
        <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
        <Route path="/admin/MemberManagement" element={<Layout><MemberManagement/></Layout>} />
        <Route path="/admin/MemberManagement/AddMember" element={<Layout><AddMember/></Layout>} />
        <Route path="/admin/MemberManagement/MemberProfile" element={<Layout><MemberProfile/></Layout>} />
        <Route path="/admin/CoordinatorManagement" element={<Layout><CoordinatorManagement/></Layout>} />
        <Route path="/admin/CoordinatorManagement/AddCoordinator" element={<Layout><AddCoordinator/></Layout>} />
        <Route path="/admin/CoordinatorManagement/CoordinatorProfile" element={<Layout><CoordinatorProfile/></Layout>} />
        <Route path="/admin/CoordinatorManagement/CoordinatorProfile/AssignLeader" element={<Layout><AssignLeader/></Layout>} />
        <Route path="/admin/reports" element={<Layout><Reports/></Layout>} />
        <Route path="/admin/content" element={<Layout><Content/></Layout>} />
        <Route path="/admin/content/course-materials" element={<Layout><CourseContent/></Layout>} />
        <Route path="/admin/content/add-course" element={<Layout><AddCourse/></Layout>} />
        <Route path="/admin/content/add-module" element={<Layout><AddModule/></Layout>} />
        <Route path="/admin/content/edit-module" element={<Layout><EditModule/></Layout>} />
        <Route path="/admin/content/edit-course" element={<Layout><EditCourse/></Layout>} />
        <Route path="/admin/ExaminationManagement" element={<Layout><ExaminationManagement/></Layout>} />
        <Route path="/admin/ExaminationManagement/CreateQuiz" element={<Layout><CreateQuiz/></Layout>} />
        <Route path="/admin/EventManagement" element={<Layout><EventManagement/></Layout>} />
        <Route path="/coordinator" element={<Layout><CoordinatorDashboard /></Layout>} />
        <Route path="/coordinator/MemberManagement" element={<Layout><CoordinatorMemberManagement /></Layout>} />
        <Route path="/coordinator/MeetingManagement" element={<Layout><CoordinatorMeetingManagement /></Layout>} />
        <Route path="/coordinator/LiveStreaming" element={<Layout><CoordinatorLiveStreaming /></Layout>} />
        <Route path="/coordinator/MembersDirectory" element={<Layout><CoordinatorMembersDirectory /></Layout>} />
        <Route path="/user" element={<Layout><UserDashboard /></Layout>} />
        <Route path="/user/Profile" element={<Layout><UserProfile /></Layout>} />
        <Route path="/user/MandateTraining" element={<Layout><UserMandateTraining /></Layout>} />
        <Route path="/user/MandateTraining/CourseModules" element={<Layout><UserCourseModules /></Layout>} />
        <Route path="/user/MandateTraining/LessonContent" element={<Layout><UserLessonContent /></Layout>} />
        <Route path="/user/MandateTraining/Quiz" element={<Layout><UserQuiz /></Layout>} />
        <Route path="/user/MandateTraining/QuizResults" element={<Layout><UserQuizResults /></Layout>} />
        <Route path="/user/DownloadCertificate" element={<Layout><UserDownloadCertificate /></Layout>} />
        <Route path="/user/LiveStreaming" element={<Layout><UserLiveStreaming /></Layout>} />
        <Route path="/user/MembersDirectory" element={<Layout><UserMembersDirectory /></Layout>} />
        <Route path="/user/DonorsHub" element={<Layout><UserDonorsHub /></Layout>} />
        <Route path="/user/Events" element={<Layout><UserEvents /></Layout>} />
        <Route path="/user/Resources" element={<Layout><UserResources /></Layout>} />
        <Route path="/user/CertificateVerification" element={<Layout><UserCertificateVerification /></Layout>} />
        <Route path="/user/AIChat" element={<Layout><UserAIChat /></Layout>} />
        <Route path="/user/CFNGroupTracker" element={<Layout><UserCFNGroupTracker /></Layout>} />
        <Route path="/user/MemberOrientation" element={<Layout><UserMemberOrientation /></Layout>} />
        <Route path="/user/LeadershipTraining" element={<Layout><UserLeadershipTraining /></Layout>} />
        <Route path="/coordinator/CertificateVerification" element={<Layout><CoordinatorCertificateVerification /></Layout>} />
        <Route path="/coordinator/CFNGroupTracker" element={<Layout><CoordinatorCFNGroupTracker /></Layout>} />
        <Route path="/coordinator/AIChat" element={<Layout><CoordinatorAIChat /></Layout>} />
        <Route path="/admin/CertificateVerification" element={<Layout><AdminCertificateVerification /></Layout>} />
        <Route path="/admin/CFNGroupTracker" element={<Layout><AdminCFNGroupTracker /></Layout>} />
        <Route path="/admin/AIChat" element={<Layout><AdminAIChat /></Layout>} />
        </Routes>
        </Router>
      </DataProvider>
    </ThemeProvider>
  )
}

export default App
