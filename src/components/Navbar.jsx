import { useState } from "react";
import paamLogo from "../assets/paam-logo.svg";
import profilePic from "../assets/profile-picture-sm.svg";

function Navbar({ username, src }) {
  const [imgSrc, setImgSrc] = useState(src || profilePic);
  const handleName = username || "Sarah Miller"


  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-sm border-b">
      <div className="flex items-center gap-4">
        <img src={paamLogo} alt="PAAM logo" className="h-8 w-auto" />
        <h1 className="text-lg font-semibold text-gray-800">
          PAAM Global Digital Hub
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[20px] font-medium text-gray-700">{handleName}</span>
        <img
          src={imgSrc}
          alt={`${username}'s profile picture`}
          className="h-8 w-8 rounded-full object-cover border border-gray-200"
          onError={() => setImgSrc(profilePic)}
        />
      </div>
    </header>
  );
}

export default Navbar;
