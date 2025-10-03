import paamLogo from "../assets/paam-logo.svg";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";
import linkedin from "../assets/linkedin.svg";

function LandingFooter() {
  return (
   <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8 sm:py-10 transition-colors duration-300">
  <div className="container-responsive">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {/* Logo + Info */}
      <div className="sm:col-span-2 lg:col-span-1">
        <div className="flex items-center mb-3">
          <img
            src={paamLogo}
            alt="PAAM Logo"
            className="h-6 sm:h-8 w-auto filter invert"
          />
          <span className="ml-2 text-sm sm:text-lg font-bold">
            PAAM Global Digital Hub
          </span>
        </div>
        <div className="space-y-1 text-sm text-gray-400">
          <p>&copy; 2024 PAAM. All rights reserved.</p>
          <p>(480) 555-0103</p>
          <p>4517 Washington Ave.</p>
          <p>finsweet@example.com</p>
        </div>
      </div>

      {/* Quicklinks */}
      <div>
        <h4 className="text-base sm:text-lg font-semibold mb-3">Quicklinks</h4>
        <ul className="space-y-1.5 text-sm text-gray-400">
          <li>
            <Link to="/about" className="hover:text-white transition-colors">
              About us
            </Link>
          </li>
          <li>
            <Link to="/mission" className="hover:text-white transition-colors">
              The Mission
            </Link>
          </li>
          <li>
            <Link to="/vision" className="hover:text-white transition-colors">
              The Vision
            </Link>
          </li>
          <li>
            <Link to="/events" className="hover:text-white transition-colors">
              Events
            </Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
          </li>
        </ul>
      </div>

      {/* Connect */}
      <div>
        <h4 className="text-base sm:text-lg font-semibold mb-3">Connect</h4>
        <div className="flex space-x-3">
          <a href="#" className="hover:opacity-80 transition-opacity">
            <img src={facebook} alt="Facebook" className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
          <a href="#" className="hover:opacity-80 transition-opacity">
            <img src={twitter} alt="Twitter" className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
          <a href="#" className="hover:opacity-80 transition-opacity">
            <img src={linkedin} alt="LinkedIn" className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
        </div>
      </div>

      {/* Subscribe */}
      <div className="sm:col-span-2 lg:col-span-1">
        <h4 className="text-base sm:text-lg font-semibold mb-3">
          SUBSCRIBE TO GET LATEST NEWS AND UPDATES
        </h4>
        <form className="flex flex-col sm:flex-row border border-gray-500/30 rounded-lg overflow-hidden">
          <input
            type="email"
            placeholder="Yourmail@gmail.com"
            className="flex-1 px-3 py-2 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
          />
          <div className="sm:border-l border-gray-500/30">
            <Button title="Subscribe" className="left-5 w-full sm:w-auto rounded-none" />
          </div>
        </form>
      </div>
    </div>
  </div>
</footer>

  );
}

export default LandingFooter;
