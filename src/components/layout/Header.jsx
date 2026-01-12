/* NavBar*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLandingPage = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignUpClick = () => {
    navigate("/signup");
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full bg-brown-100 border-b border-brown-300 lg:h-[80px] lg:flex lg:items-center">
      <div className="w-full bg-brown-100 rounded-lg px-6 flex flex-col lg:flex-row lg:items-center lg:justify-between lg:h-[80px] lg:px-30 lg:py-4">
        {/* Header Section */}
        <div className="w-full h-[48px] flex items-center justify-between lg:w-auto lg:h-auto">
          {/* Logo Section */}
          <div className="w-[24px] h-[24px] flex items-center gap-1 lg:w-[44px] lg:h-[44px]">
            <img
              onClick={handleLandingPage}
              src={logo}
              alt="Logo"
              className="w-full h-full cursor-pointer"
            />
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="w-[18px] h-[12px] flex flex-col items-center justify-between cursor-pointer lg:hidden"
            aria-label="Open menu"
          >
            <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
            <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
            <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
          </button>
        </div>

        {/* Mobile: login and signup Buttons - Show when menu is open */}
        {isMenuOpen && (
          <div className="w-full flex flex-col gap-4 py-4 border-t border-brown-300 lg:hidden">
            <button onClick={handleLoginClick} className="w-full h-[48px] px-6 py-3 border border-brown-400 rounded-[999px] body-1-brown-600 hover:bg-brown-600 transition-colors hover:text-white cursor-pointer">
              Log in
            </button>
            <button
              onClick={handleSignUpClick}
              className="w-full h-[48px] px-10 py-3 bg-brown-600 rounded-[999px] body-1-white hover:bg-brown-200 transition-colors hover:text-brown-600 cursor-pointer"
            >
              Sign up
            </button>
          </div>
        )}

        {/* Desktop: login and signup Buttons */}
        <div className="hidden lg:w-[276px] lg:h-[48px] lg:flex items-center gap-2">
          <button
            onClick={handleLoginClick}
            className="w-[127px] h-[48px] px-6 py-3 border border-brown-400 rounded-[999px] body-1-brown-600 hover:bg-brown-600 transition-colors hover:text-white cursor-pointer"
          >
            Log in
          </button>
          <button
            onClick={handleSignUpClick}
            className="w-[141px] h-[48px] px-10 py-3 bg-brown-600 rounded-[999px] body-1-white hover:bg-brown-200 transition-colors hover:text-brown-600 cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
