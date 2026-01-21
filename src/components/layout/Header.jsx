/* NavBar*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import { Button } from "../common/Button";

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
    <>
      {/* Backdrop - Mobile only */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}
      
      <nav className={`w-full bg-brown-100 border-b border-brown-300 lg:h-[80px] lg:flex lg:items-center ${isMenuOpen ? 'fixed top-0 left-0 right-0 z-50 lg:relative lg:z-auto' : ''}`}>
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
          <Button
            onClick={toggleMenu}
            variant="hamburger"
            className="lg:hidden"
            aria-label="Open menu"
          >
            <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
            <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
            <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
          </Button>
        </div>

        {/* Mobile: login and signup Buttons - Show when menu is open */}
        {isMenuOpen && (
          <div className="w-full flex flex-col gap-4 py-4 border-t border-brown-300 lg:hidden">
            <Button onClick={handleLoginClick} variant="outline" size="full">
              Log in
            </Button>
            <Button onClick={handleSignUpClick} variant="secondary" size="full">
              Sign up
            </Button>
          </div>
        )}

        {/* Desktop: login and signup Buttons */}
        <div className="hidden lg:w-[290px] lg:h-[48px] lg:flex items-center gap-2">
          <Button
            onClick={handleLoginClick}
            variant="outline"
            size="lg"
            width="141"
          >
            Log in
          </Button>
          <Button
            onClick={handleSignUpClick}
            variant="secondary"
            size="lg"
            width="141"
          >
            Sign up
          </Button>
        </div>
      </div>
    </nav>
    </>
  );
}

export default NavBar;
