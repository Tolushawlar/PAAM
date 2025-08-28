import paamLogo from "../assets/paam-logo.svg";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


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
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <Link to="/about" className="hover:text-gray-300">About Us</Link>
              <Link to="/events" className="hover:text-gray-300">Events</Link>
              <Link to="/blog" className="hover:text-gray-300">Blog</Link>
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
