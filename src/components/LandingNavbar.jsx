import paamLogo from "../assets/paam-logo.svg";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";


function LandingNavbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 text-black dark:text-white shadow-sm transition-colors duration-300">
      <div className="container-responsive">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Left section (logo) */}
          <div className="flex items-center">
            <img src={paamLogo} alt="PAAM Logo" className="h-8 sm:h-10 mr-2 sm:mr-3" />
            <span className="text-sm sm:text-xl font-bold text-black dark:text-white hidden sm:block">
              PAAM Global Digital Hub
            </span>
            <span className="text-sm font-bold text-black dark:text-white sm:hidden">
              PAAM
            </span>
          </div>

          {/* Center section - Desktop Nav links */}
          <nav className="hidden lg:flex space-x-6 text-black dark:text-white">
            <Link to="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">About Us</Link>
            <Link to="/events" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Events</Link>
            <Link to="/blog" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Blog</Link>
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700" />
            
            {/* Desktop button */}
            <div className="hidden sm:block">
              <Button title="Join Now" onClick={() => navigate("/signup")} />
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <HiX size={20} /> : <HiMenu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-4 animate-slide-up">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 py-2 hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 py-2 hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/events" 
                className="hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 py-2 hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                to="/blog" 
                className="hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 py-2 hover:translate-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="pt-2">
                <Button 
                  title="Join Now" 
                  onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                  }} 
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default LandingNavbar;
