/* eslint-disable no-unused-vars */
import { MdLogout } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";

// Import sidebar icons
import dashboardIcon from "../assets/sidebar-icons/home-b.svg";
import usersIcon from "../assets/sidebar-icons/member.svg";
import organizationsIcon from "../assets/sidebar-icons/coordinator.svg";
import contentIcon from "../assets/sidebar-icons/content.svg";
import reportsIcon from "../assets/sidebar-icons/reports.svg";
import eventsIcon from "../assets/sidebar-icons/event.svg";
import examinationIcon from "../assets/sidebar-icons/examination.svg";

const Sidebar = ({ userType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const adminMenuItems = [
    { icon: dashboardIcon, label: "Dashboard", path: "/admin" },
    { icon: usersIcon, label: "Users", path: "/admin/users" },
    { icon: organizationsIcon, label: "Organizations", path: "/admin/organizations" },
    { icon: contentIcon, label: "Content", path: "/admin/content" },
    { icon: reportsIcon, label: "Reports", path: "/admin/reports" },
    { icon: examinationIcon, label: "Settings", path: "/admin/settings" },
  ];

  const userMenuItems = [
    { icon: dashboardIcon, label: "Dashboard", path: "/user" },
    { icon: eventsIcon, label: "Events", path: "/user/events" },
    { icon: contentIcon, label: "Messages", path: "/user/messages" },
    { icon: usersIcon, label: "Profile", path: "/user/profile" },
    { icon: examinationIcon, label: "Settings", path: "/user/settings" },
    { icon: reportsIcon, label: "Help", path: "/user/help" },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <div className="flex fixed h-screen flex-col w-80 bg-white border-r border-gray-200">
      <div className="flex min-h-[90vh] flex-col justify-between p-4">
        <div className="flex flex-col gap-4">
          {/* <div className="flex items-center justify-between">
            <h1 className="text-gray-900 text-lg font-semibold">
              {userType || "PAAM"}
            </h1>
            <button
              onClick={() => navigate(isAdmin ? "/user" : "/admin")}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 transition-colors"
            >
              {isAdmin ? "User View" : "Admin View"}
            </button>
          </div> */}
          <p>{userType}</p>
          <div className="flex flex-col gap-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <div
                  key={index}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50 text-gray-900"
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-5 h-5"
                  />
                  <p className="text-sm font-medium">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Button
            title="Logout"
            icon={<MdLogout size={16} />}
            textColor="white"
            width="100%"
            onClick={() => {
              // Add logout logic here
              console.log("Logging out...");
              navigate("/login");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
