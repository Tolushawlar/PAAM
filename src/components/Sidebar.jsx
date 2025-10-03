/* eslint-disable no-unused-vars */
import { MdLogout } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import Button from "../UI/Button";
import { useTheme } from "../contexts/ThemeContext";

// Import sidebar icons
import dashboardIcon from "../assets/sidebar-icons/home.svg";
import dashboardIconB from "../assets/sidebar-icons/home-b.svg";
import memberIcon from "../assets/sidebar-icons/member.svg";
import memberIconB from "../assets/sidebar-icons/member-b.svg";
import coordinatorIcon from "../assets/sidebar-icons/coordinator.svg";
import coordinatorIconB from "../assets/sidebar-icons/coordinator-b.svg";
import contentIcon from "../assets/sidebar-icons/content.svg";
import contentIconB from "../assets/sidebar-icons/content-b.svg";
import reportsIcon from "../assets/sidebar-icons/reports.svg";
import reportsIconB from "../assets/sidebar-icons/reports-b.svg";
import eventIcon from "../assets/sidebar-icons/event.svg";
import eventIconB from "../assets/sidebar-icons/event-b.svg";
import examinationIcon from "../assets/sidebar-icons/examination.svg";
import examinationIconB from "../assets/sidebar-icons/examination-b.svg";
import donorsIcon from "../assets/sidebar-icons/donors.svg"
import donorsIconB from "../assets/sidebar-icons/donors-b.svg"
import downloadIcon from "../assets/sidebar-icons/download.svg"
import downloadIconB from "../assets/sidebar-icons/download-b.svg"

const Sidebar = ({ userType, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const isAdmin = location.pathname.startsWith("/admin");
  const isCoordinator= location.pathname.startsWith("/coordinator");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onToggle) onToggle(newCollapsedState);
  };

  const adminMenuItems = [
    { icon: dashboardIcon, iconB: dashboardIconB, label: t('dashboard'), path: "/admin" },
    { icon: memberIcon, iconB: memberIconB, label: "Member Management", path: "/admin/MemberManagement" },
    { icon: coordinatorIcon, iconB: coordinatorIconB, label: "Coordinator Management", path: "/admin/CoordinatorManagement" },
    { icon: reportsIcon, iconB: reportsIconB, label: "Reports", path: "/admin/Reports" },
    { icon: contentIcon, iconB: contentIconB, label: "Content Management", path: "/admin/content" },
    { icon: examinationIcon, iconB: examinationIconB, label: "Examination Management", path: "/admin/ExaminationManagement" },
    { icon: eventIcon, iconB: eventIconB, label: "Event Management", path: "/admin/EventManagement" },
    { icon: downloadIcon, iconB: downloadIconB, label: t('certificateVerification'), path: "/admin/CertificateVerification" },
    { icon: coordinatorIcon, iconB: coordinatorIconB, label: t('cfnGroupTracker'), path: "/admin/CFNGroupTracker" },
    { icon: contentIcon, iconB: contentIconB, label: t('aiChat'), path: "/admin/AIChat" },
  ];
  const coordinatorMenuItems = [
    { icon: dashboardIcon, iconB: dashboardIconB, label: t('dashboard'), path: "/coordinator" },
    { icon: memberIcon, iconB: memberIconB, label: "Member Management", path: "/coordinator/MemberManagement" },
    { icon: eventIcon, iconB: eventIconB, label: "Meeting Management", path: "/coordinator/MeetingManagement" },
    { icon: reportsIcon, iconB: reportsIconB, label: t('liveStreaming'), path: "/coordinator/LiveStreaming" },
    { icon: coordinatorIcon, iconB: coordinatorIconB, label: t('membersDirectory'), path: "/coordinator/MembersDirectory" },
    { icon: downloadIcon, iconB: downloadIconB, label: t('certificateVerification'), path: "/coordinator/CertificateVerification" },
    { icon: coordinatorIcon, iconB: coordinatorIconB, label: t('cfnGroupTracker'), path: "/coordinator/CFNGroupTracker" },
    { icon: contentIcon, iconB: contentIconB, label: t('aiChat'), path: "/coordinator/AIChat" },
  ];

  const userMenuItems = [
    { icon: dashboardIcon, iconB: dashboardIconB, label: t('dashboard'), path: "/user" },
    { icon: memberIcon, iconB: memberIconB, label: t('profile'), path: "/user/Profile" },
    { icon: examinationIcon, iconB: examinationIconB, label: t('memberOrientation'), path: "/user/MemberOrientation" },
    { icon: examinationIcon, iconB: examinationIconB, label: t('mandateTraining'), path: "/user/MandateTraining" },
    { icon: memberIcon, iconB: memberIconB, label: t('leadershipTraining'), path: "/user/LeadershipTraining" },
    { icon: downloadIcon, iconB: downloadIconB, label: t('downloadCertificates'), path: "/user/DownloadCertificate" },
    { icon: downloadIcon, iconB: downloadIconB, label: t('certificateVerification'), path: "/user/CertificateVerification" },
    { icon: reportsIcon, iconB: reportsIconB, label: t('liveStreaming'), path: "/user/LiveStreaming" },
    // { icon: coordinatorIcon, iconB: coordinatorIconB, label: t('membersDirectory'), path: "/user/MembersDirectory" },
    { icon: donorsIcon, iconB: donorsIconB, label: t('donorsHub'), path: "/user/DonorsHub" },
    { icon: eventIcon, iconB:  eventIconB, label: t('events'), path: "/user/Events" },
    { icon: contentIcon, iconB: contentIconB, label: t('resources'), path: "/user/Resources" },
    { icon: coordinatorIcon, iconB: coordinatorIconB, label: t('cfnGroupTracker'), path: "/user/CFNGroupTracker" },
    { icon: contentIcon, iconB: contentIconB, label: t('aiChat'), path: "/user/AIChat" },
  ];

  let menuItems; // Declare with `let` as its value will change

  if (isAdmin) {
    menuItems = adminMenuItems;
  } else if (isCoordinator) {
    menuItems = coordinatorMenuItems;
  } else {
    menuItems = userMenuItems; // Default case if neither of the above is true
  }

  return (
    <div className={`flex fixed h-screen flex-col ${isCollapsed ? 'w-12 sm:w-16' : 'w-64 sm:w-80'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40`}>
      <div className="flex h-full flex-col justify-between p-2 sm:p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            {isCollapsed ? (
              <button
                onClick={handleToggle}
                className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <HiMenuAlt2 size={16} className="sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
              </button>
            ) : (
              <div className="flex items-center justify-between w-full">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{userType}</p>
                <button
                  onClick={handleToggle}
                  className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <HiMenuAlt2 size={16} className="sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto flex-1 max-h-[calc(100vh-200px)]">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/admin' && item.path !== '/coordinator' && item.path !== '/user' && location.pathname.startsWith(item.path + '/')) ||
                (item.path === '/admin' && location.pathname === '/admin') ||
                (item.path === '/coordinator' && location.pathname === '/coordinator') ||
                (item.path === '/user' && location.pathname === '/user');
              return (
                <div
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center ${isCollapsed ? 'justify-center w-8 sm:w-10' : 'gap-2 sm:gap-3'} px-2 sm:px-3 py-2 rounded-lg cursor-pointer h-8 sm:h-10 transition-colors ${isActive
                      ? "text-black dark:text-white font-bold bg-paam-primary/20 dark:bg-paam-primary/30"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
                    }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <img
                    src={isActive ? item.iconB : (isDark ? item.iconB : item.icon)}
                    alt={item.label}
                    className={`${isCollapsed ? 'w-6 h-6 sm:w-8 sm:h-8' : 'w-4 h-4 sm:w-5 sm:h-5'} z-10`}
                  />
                  {!isCollapsed && <p className="text-xs sm:text-sm font-medium">{item.label}</p>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-1 flex-shrink-0">
          {isCollapsed ? (
            <button
              onClick={() => {
                console.log("Logging out...");
                navigate("/login");
              }}
              className="flex items-center justify-center p-2 sm:p-3 bg-paam-primary hover:bg-paam-primary/90 rounded-lg transition-colors"
              title="Logout"
            >
              <MdLogout size={14} className="sm:w-4 sm:h-4 text-white" />
            </button>
          ) : (
            <Button
              title="Logout"
              icon={<MdLogout size={14} className="sm:w-4 sm:h-4" />}
              textColor="white"
              width="100%"
              onClick={() => {
                console.log("Logging out...");
                navigate("/login");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;