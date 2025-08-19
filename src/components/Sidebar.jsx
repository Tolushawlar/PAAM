/* eslint-disable no-unused-vars */
import { MdLogout } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Button from "./Button";

// Import sidebar icons
import dashboardIcon from "../assets/sidebar-icons/home-b.svg";
import memberIcon from "../assets/sidebar-icons/member.svg";
import coordinatorIcon from "../assets/sidebar-icons/coordinator.svg";
import contentIcon from "../assets/sidebar-icons/content.svg";
import reportsIcon from "../assets/sidebar-icons/reports.svg";
import eventIcon from "../assets/sidebar-icons/event.svg";
import examinationIcon from "../assets/sidebar-icons/examination.svg";

const Sidebar = ({ userType, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onToggle) onToggle(newCollapsedState);
  };

  const adminMenuItems = [
    { icon: dashboardIcon, label: "Dashboard", path: "/admin" },
    { icon: memberIcon, label: "Member Management", path: "/admin/MemberManagement" },
    { icon: coordinatorIcon, label: "Coordinator Management", path: "/admin/CoordinatorManagement" },
    { icon: reportsIcon, label: "Reports", path: "/admin/Reports" },
    { icon: contentIcon, label: "Content Management", path: "/admin/ContentManagement" },
    { icon: examinationIcon, label: "Examination Management", path: "/admin/ExaminationManagement" },
    { icon: eventIcon, label: "Event Management", path: "/admin/EventManagement" },
  ];

  const userMenuItems = [
    { icon: dashboardIcon, label: "Dashboard", path: "/user" },
    { icon: eventIcon, label: "Events", path: "/user/events" },
    { icon: contentIcon, label: "Messages", path: "/user/messages" },
    { icon: memberIcon, label: "Profile", path: "/user/profile" },
    { icon: examinationIcon, label: "Settings", path: "/user/settings" },
    { icon: reportsIcon, label: "Help", path: "/user/help" },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <div className={`flex fixed h-screen flex-col ${isCollapsed ? 'w-16' : 'w-80'} bg-white border-r border-gray-200 transition-all duration-300`}>
      <div className="flex min-h-[90vh] flex-col justify-between p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleToggle}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HiMenuAlt2 size={20} className="text-gray-600" />
            </button>
          </div>
          {!isCollapsed && <p className="text-sm text-gray-600">{userType}</p>}
          <div className="flex flex-col gap-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <div
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center ${isCollapsed ? 'justify-center w-[40px]' : 'gap-3'} px-3 py-2 rounded-lg cursor-pointer h-[40px] transition-colors ${
                    isActive
                      ? "text-black font-bold bg-[#B8144A]/20"
                      : "hover:bg-gray-50 text-gray-900"
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <img
                    src={item.icon}
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
