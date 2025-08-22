/* eslint-disable no-unused-vars */
import { MdLogout } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Button from "../UI/Button";

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
  const isAdmin = location.pathname.startsWith("/admin");
  const isCoordinator= location.pathname.startsWith("/coordinator");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onToggle) onToggle(newCollapsedState);
  };

  const adminMenuItems = [
    { icon: dashboardIcon, iconB: dashboardIconB, label: "Dashboard", path: "/admin" },
    { icon: memberIcon, iconB: memberIconB, label: "Member Management", path: "/admin/MemberManagement" },
    { icon: coordinatorIcon, iconB: coordinatorIconB, label: "Coordinator Management", path: "/admin/CoordinatorManagement" },
    { icon: reportsIcon, iconB: reportsIconB, label: "Reports", path: "/admin/Reports" },
    { icon: contentIcon, iconB: contentIconB, label: "Content Management", path: "/admin/content" },
    { icon: examinationIcon, iconB: examinationIconB, label: "Examination Management", path: "/admin/ExaminationManagement" },
    { icon: eventIcon, iconB: eventIconB, label: "Event Management", path: "/admin/EventManagement" },
  ];
  const coordinatorMenuItems = [
    { icon: dashboardIcon, iconB: dashboardIconB, label: "Home", path: "/coordinator" },
    { icon: memberIcon, iconB: memberIconB, label: "Member Management", path: "/coordinator/MemberManagement" },
    { icon: eventIcon, iconB: eventIconB, label: "Meeting Management", path: "/coordinator/MeetingManagement" },
    { icon: reportsIcon, iconB: reportsIconB, label: "Live Streaming", path: "/coordinator/LiveStreaming" },
    { icon: coordinatorIcon, iconB: coordinatorIconB, label: "Members Directory", path: "/coordinator/MembersDirectory" },
  ];

  const userMenuItems = [
    { icon: dashboardIcon, iconB: dashboardIconB, label: "Home", path: "/user" },
    { icon: memberIcon, iconB: memberIconB, label: "Profile", path: "/user/Profile" },
    { icon: examinationIcon, iconB: examinationIconB, label: "Mandate Training", path: "/user/MandateTraining" },
    { icon: memberIcon, iconB: memberIconB, label: "Leadership Training", path: "/user/LeadershipTraining" },
    { icon: downloadIcon, iconB: downloadIconB, label: "Download Certificates", path: "/user/DownloadCertificate" },
    { icon: reportsIcon, iconB: reportsIconB, label: "Live Streaming", path: "/user/LiveStreaming" },
    { icon: coordinatorIcon, iconB: coordinatorIconB, label: "Members Directory", path: "/user/MembersDirectory" },
    { icon: donorsIcon, iconB: donorsIconB, label: "Donors Hub", path: "/user/DonorsHub" },
    { icon: eventIcon, iconB:  eventIconB, label: "Events", path: "/user/Events" },
    { icon: contentIcon, iconB: contentIconB, label: "Resources & Publications", path: "/user/Resources" },
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
    <div className={`flex fixed h-screen flex-col ${isCollapsed ? 'w-16' : 'w-80'} bg-white border-r border-gray-200 transition-all duration-300`}>
      <div className="flex min-h-[90vh] flex-col justify-between p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            {isCollapsed ? (
              <button
                onClick={handleToggle}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <HiMenuAlt2 size={20} className="text-gray-600" />
              </button>
            ) : (
              <div className="flex items-center justify-between w-full">
                <p className="text-sm text-gray-600">{userType}</p>
                <button
                  onClick={handleToggle}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <HiMenuAlt2 size={20} className="text-gray-600" />
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {menuItems.map((item, index) => {
              const isActive = item.path === '/admin'
                ? location.pathname === '/admin'
                : location.pathname === item.path || location.pathname.startsWith(item.path + '/');
              return (
                <div
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center ${isCollapsed ? 'justify-center w-[40px]' : 'gap-3'} px-3 py-2 rounded-lg cursor-pointer h-[40px] transition-colors ${isActive
                      ? "text-black font-bold bg-[#B8144A]/20"
                      : "hover:bg-gray-50 text-gray-900"
                    }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <img
                    src={isActive ? item.iconB : item.icon}
                    alt={item.label}
                    className={`${isCollapsed ? 'w-10 h-10' : 'w-5 h-5'} z-10`}
                  />
                  {!isCollapsed && <p className="text-sm font-medium">{item.label}</p>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {isCollapsed ? (
            <button
              onClick={() => {
                console.log("Logging out...");
                navigate("/login");
              }}
              className="flex items-center justify-center p-3 bg-[#B8144A] hover:bg-[#9a1139] rounded-lg transition-colors"
              title="Logout"
            >
              <MdLogout size={16} className="text-white" />
            </button>
          ) : (
            <Button
              title="Logout"
              icon={<MdLogout size={16} />}
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