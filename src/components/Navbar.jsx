/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown, MdAdminPanelSettings, MdPerson } from "react-icons/md";
import paamLogo from "../assets/paam-logo.svg";
import profilePic from "../assets/profile-picture-sm.svg";

function Navbar({ username, src }) {
  const [imgSrc, setImgSrc] = useState(src || profilePic);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const handleName = username || "Sarah Miller"
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowRoleDropdown(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])


  return (
    <header className="flex fixed w-full justify-between items-center p-4 bg-white shadow-sm border-b z-50">
      <div className="flex items-center gap-4">
        <img src={paamLogo} alt="PAAM logo" className="h-8 w-auto" />
        <h1 className="text-lg font-semibold text-gray-800">
          PAAM Global Digital Hub
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {/* <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isAdmin ? <MdAdminPanelSettings size={16} /> : <MdPerson size={16} />}
            <span className="text-sm font-medium text-gray-700">
              {isAdmin ? 'Admin' : 'User'}
            </span>
            <MdKeyboardArrowDown size={16} className="text-gray-500" />
          </button>
          
          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="py-1">
                <button
                  onClick={() => {
                    navigate('/admin')
                    setShowRoleDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 ${
                    isAdmin ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <MdAdminPanelSettings size={16} />
                  Admin Dashboard
                </button>
                <button
                  onClick={() => {
                    navigate('/user')
                    setShowRoleDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 ${
                    !isAdmin ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <MdPerson size={16} />
                  User Dashboard
                </button>
              </div>
            </div>
          )}
        </div> */}
        
        <div className="flex items-center gap-3">
          <span className="text-[20px] font-medium text-gray-700">{handleName}</span>
          <img
            src={imgSrc}
            alt={`${username}'s profile picture`}
            className="h-8 w-8 rounded-full object-cover border border-gray-200"
            onError={() => setImgSrc(profilePic)}
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
