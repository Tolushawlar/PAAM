import paamLogo from "../assets/paam-logo.svg";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";
import linkedin from "../assets/linkedin.svg";

function LandingFooter() {
  return (
   <footer className="bg-gray-900 text-white py-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between">
      {/* Logo + Info */}
      <div>
        <div className="flex items-center mb-3">
          <img
            src={paamLogo}
            alt="PAAM Logo"
            className="h-8 w-auto filter invert"
          />
          <span className="ml-2 text-lg font-bold">
            PAAM Global Digital Hub
          </span>
        </div>
        <p className="text-gray-400">&copy; 2024 PAAM. All rights reserved.</p>
        <p className="text-gray-400">(480) 555-0103</p>
        <p className="text-gray-400">4517 Washington Ave.</p>
        <p className="text-gray-400">finsweet@example.com</p>
      </div>

      {/* Quicklinks */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Quicklinks</h4>
        <ul className="space-y-1.5 text-gray-400">
          <li>
            <Link to="/about" className="hover:text-white">
              About us
            </Link>
          </li>
          <li>
            <Link to="/mission" className="hover:text-white">
              The Mission
            </Link>
          </li>
          <li>
            <Link to="/vision" className="hover:text-white">
              The Vision
            </Link>
          </li>
          <li>
            <Link to="/events" className="hover:text-white">
              Events
            </Link>
          </li>
        </ul>
      </div>

      {/* Connect */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Connect</h4>
        <div className="flex space-x-3">
          <a href="#" className="hover:opacity-80">
            <img src={facebook} alt="Facebook" className="h-6 w-6" />
          </a>
          <a href="#" className="hover:opacity-80">
            <img src={twitter} alt="Twitter" className="h-6 w-6" />
          </a>
          <a href="#" className="hover:opacity-80">
            <img src={linkedin} alt="LinkedIn" className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* Subscribe */}
      <div>
        <h4 className="text-lg font-semibold mb-3 max-w-[250px]">
          SUBSCRIBE TO GET LATEST NEWS AND UPDATES
        </h4>
        <form className="flex border border-gray-500/30 rounded-lg overflow-hidden">
          <input
            type="email"
            placeholder="Yourmail@gmail.com"
            className="flex-1 px-3 py-2 bg-transparent text-white placeholder-gray-400 outline-none"
          />
          <Button title="Subscribe" />
        </form>
      </div>
    </div>
  </div>
</footer>

  );
}

export default LandingFooter;
