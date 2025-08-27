import paamLogo from "../assets/paam-logo.svg";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

function LandingNavbar() {
  const navigate = useNavigate();

  return (
    <header className="bg-[#0d0d0d] text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left section (logo + nav links) */}
          <div className="flex items-center">
            <img src={paamLogo} alt="PAAM Logo" className="h-10 mr-3" />
            <span className="mr-6 text-xl font-bold text-white">
              PAAM Global Digital Hub
            </span>

            {/* Nav links */}
            <nav className="hidden ml-4 md:flex space-x-8 text-white">
              <a href="#home" className="hover:text-gray-300">
                Home
              </a>
              <a href="#about" className="hover:text-gray-300">
                About Us
              </a>
              <a href="#mission" className="hover:text-gray-300">
                The Mission
              </a>
              <a href="#vision" className="hover:text-gray-300">
                The Vision
              </a>
            </nav>
          </div>

          {/* Right section (button) */}
          <Button title="Join Now" onClick={() => navigate("/signup")} />
        </div>
      </div>
    </header>
  );
}

export default LandingNavbar;
